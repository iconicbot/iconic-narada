import { Router } from 'express';
import InstagramController from './controller';

const router = Router();

router.get('/', InstagramController.handleInstagramGet);
router.post('/', InstagramController.handleInstagramPost);

export default router;
