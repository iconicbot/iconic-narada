import { Router } from 'express';
import FacebookController from './controller';

const router = Router();

router.get('/', FacebookController.handleFacebookGet);
router.post('/', FacebookController.handleFacebookPost);

export default router;
