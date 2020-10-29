const { resolve } = require('path');
import User from './user.model';
export const { protector } = require('@m3ntorship/pickly-protector');
export const serviceAccount = resolve('config', 'service-account.json');

export const userEnricher = async (user: any) => {
	let mongoUser = await User.findOne({ email: user.tokeninfo.email });
	if (!mongoUser)
		mongoUser = await User.create({
			name: user.tokeninfo.name,
			email: user.tokeninfo.email,
		});
	return mongoUser;
};

// module.exports = { protector, serviceAccount, userEnricher };
