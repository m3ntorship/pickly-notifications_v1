import { UserModel } from '../../user.model';
import { UserBase } from '../../user.interface';
declare global {
	namespace Express {
		interface Request {
			user: {
				mongouser: UserBase;
			};
		}
	}
}
