import { Document, Types } from 'mongoose';

export interface Notification extends Document {
	receiver: Types.ObjectId | string;
	sender: Types.ObjectId | string;
	post: Types.ObjectId | string;
	flagged: boolean;
	retrieved: boolean;
}
