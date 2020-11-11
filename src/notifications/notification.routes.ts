import { Router } from 'express';
import Notifications from './notification.model';
import { NotificationService } from './notification.service';

const router = Router();

router
	.route('/')
	.get(NotificationService.getAll)
	.post(NotificationService.create);

router.route('/:id').patch(NotificationService.flag);

router.route('/hasretrievedall').get(NotificationService.hasRetrievedAll);

export default router;
