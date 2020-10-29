import express from 'express';
import axios from 'axios';
import { Types } from 'mongoose';
import Notifications from './notification.model';
import { Notification } from './notification.interface';
import User from '../auth/user.model';
import { POSTS_API } from '../clients/posts';

const retrieved = async (notifications: Array<Notification>) => {
	try {
		notifications.forEach(async (notif) => {
			notif.retrieved = true;
			await notif.save();
		});
	} catch (err) {
		console.log(err);
	}
};

const populatePosts = (notifications: Notification[], authorization: string) =>
	Promise.all(
		notifications.map(async (notification) => {
			const {
				data: { data },
			} = await POSTS_API.getPostById(
				notification.post.toString(),
				authorization!
			);
			notification = { ...notification.toJSON(), post: data };
			return notification;
		})
	);

export const NotificationService = {
	async getAll(req: express.Request, res: express.Response) {
		try {
			const notifications = await Notifications.find({
				receiver: req.user.mongouser._id,
			})
				.populate({
					path: 'sender',
					select: 'name email userImage',
				})
				.select('-__v')
				.sort('-createdAt');

			const notificationsPopPosts = await populatePosts(
				notifications,
				req.headers.authorization!
			);
			res.status(200).json({
				status: 'success',
				notificationsPopPosts,
			});
			retrieved(notifications);
		} catch (err) {
			console.log(err);
		}
	},
	async create(req: express.Request, res: express.Response) {
		try {
			const sender: Types.ObjectId = req.user.mongouser.id;
			const post: Types.ObjectId = req.body.postId;
			const user = await User.findOne({ posts: { $in: [post] } });

			if (!user)
				return res.status(500).json({
					status: 'error',
					messege: 'cannot find user',
				});
			if (user.id === sender)
				return res.status(400).json({
					status: 'fail',
					messege: 'you cannot upvote your own image',
				});

			const notification = await Notifications.create({
				sender,
				receiver: user.id,
				post,
				flagged: false,
				retrieved: false,
			});

			res.status(201).json({
				status: 'success',
				notification,
			});
		} catch (err) {
			console.log(err);
		}
	},
	async flag(req: express.Request, res: express.Response) {
		try {
			const notification = await Notifications.findById(req.params.id);
			if (!notification)
				return res.status(500).json({
					status: 'error',
					messege: 'cannot find notification',
				});
			if (
				notification.receiver.toString() !==
				req.user.mongouser.id.toString()
			)
				return res.status(401).json({
					status: 'fail',
					messege: 'you cannot flag other people notification',
				});
			notification.flagged = true;
			notification.save();
			res.status(200).json({
				status: 'succes',
				notification: notification.toJSON(),
			});
		} catch (err) {
			console.log(err);
		}
	},
};
