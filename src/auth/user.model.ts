import { model, Types, Schema } from 'mongoose';
import { UserBase } from './user.interface';

const userSchema = new Schema<UserBase>({
	name: String,
	email: String,
	password: String,
	userImage: String,
	posts: [{ type: Types.ObjectId, ref: 'Post' }],
	votes: [{ type: Types.ObjectId, ref: 'Article' }],
});
userSchema.methods.vote = function (id) {
	if (this.votes!.indexOf(id) === -1) {
		this.votes!.push(id);
	}
	return this.save();
};

userSchema.methods.isVoted = function (id: string | Types.ObjectId) {
	return this.votes!.some(function (pollId: string | Types.ObjectId) {
		return pollId.toString() === id.toString();
	});
};

const User = model<UserBase>('user', userSchema);

export default User;
