import { Router } from 'express';
import UserController from '../controllers/Users.controller';
import validateLogin from '../middlewares/validateLogin';
import auth from '../middlewares/auth';

const router = Router();
const userController = new UserController();

router.post('/', validateLogin, userController.login);
router.get('/role', auth, userController.getUserRole);

export default router;
