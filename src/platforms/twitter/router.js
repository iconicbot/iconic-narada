import { Router } from 'express';
import TwitterController from './controller';

const router = Router();

router.get('/', TwitterController.handleTwitterGet);
router.post('/', TwitterController.handleTwitterPost);

export default router;
