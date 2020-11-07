import { Types, Document } from 'mongoose';

interface User {
	name: string;
	email: string;
	password?: string;
	userImage?: string;
	posts?: Array<Types.ObjectId>;
	votes?: Array<Types.ObjectId>;
}

export interface UserBase extends User, Document {
	vote(id: Types.ObjectId): Promise<UserBase>;
	isVoted(id: Types.ObjectId): boolean;
}
