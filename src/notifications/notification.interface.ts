import { Document, Types } from 'mongoose';

export interface Notification extends Document {
	receiver: Types.ObjectId | string;
	sender: Types.ObjectId | string;
	entity: Types.ObjectId | string;
	flagged: boolean;
	retrieved: boolean;
}
