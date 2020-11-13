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
		entity: {
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
	{
		toJSON: {
			transform: function (doc, ret) {
				ret.retrieved = undefined;
				return ret;
			},
		},
		timestamps: true,
	}
);

const Notifications = model<Notification>('notification', notificationSchema);

export default Notifications;
