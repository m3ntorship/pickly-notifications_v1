import express from 'express';
import * as auth from './auth/auth.controller';
import router from './notifications/notification.routes';

const { protector, serviceAccount, userEnricher } = auth;
const app: express.Application = express();
app.use(express.json());
app.use(protector(serviceAccount, userEnricher));
app.use('/notifications', router);

export default app;
