import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/me', auth, userController.getMe);
router.get('/ping-auth', auth, userController.pingAuth);

export default router;
