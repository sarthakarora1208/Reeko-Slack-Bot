import { Router } from 'express';
import { createImage } from '../controllers/image';

const router = Router();
router.post('/create-image', createImage);
export = router;
