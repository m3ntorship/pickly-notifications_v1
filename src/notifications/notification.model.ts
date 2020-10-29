import { Types, Schema, model } from 'mongoose';
import { Notification } from './notification.interface';

const notificationSchema = new Schema<Notification>(
	{
		receiver: {
			type: Types.ObjectId,
			ref: 'user',
		},
		sender: {
			type: Types.ObjectId,
			ref: 'user',
		},
		post: {
			type: Types.ObjectId,
			ref: 'post',
		},
		flagged: {
			type: Boolean,
			default: false,
		},
		retrieved: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Notifications = model<Notification>('notification', notificationSchema);

export default Notifications;
