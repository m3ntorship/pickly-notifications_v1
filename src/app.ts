import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as auth from './auth/auth.controller';
import router from './notifications/notification.routes';
import swaggerDocument from './swagger.json';

const { protector, serviceAccount, userEnricher } = auth;
const app: express.Application = express();

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

app.use(cors(), express.json());
app.use(protector(serviceAccount, userEnricher));

app.use('/notifications', router);
export default app;
