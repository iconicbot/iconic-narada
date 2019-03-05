import { Router } from 'express';
import YoutubeController from './controller';

const router = Router();

router.get('/', YoutubeController.handleYoutubeGet);
router.post('/', YoutubeController.handleYoutubePost);

export default router;
