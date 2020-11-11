import app from './app';
import mongoose from 'mongoose';
import { get } from 'config';

const port = get('app.port');

mongoose
	.connect(get('app.DB_URI'), {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('connected to db');
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	});
