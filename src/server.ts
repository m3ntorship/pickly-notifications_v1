import app from './app';
import mongoose from 'mongoose';
import { get } from 'config';

mongoose
	.connect(get('app.DB_URI'), {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	})
	.then(() => console.log('connected to db'));

const port = get('app.port');

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
