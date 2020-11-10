import axios from 'axios';
import { get } from 'config';

const POSTS_CLIENT = axios.create({
	baseURL: get('services.postsService'),
});

export const POSTS_API = {
	async getPostById(postId: string, authorization: string) {
		const data = await POSTS_CLIENT.get(`/posts/${postId}`, {
			headers: {
				authorization,
			},
		});
		return data;
	},
};
