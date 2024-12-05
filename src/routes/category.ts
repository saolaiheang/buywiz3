import { Router } from 'express';
import { addCategory } from '../controllers/category.controller';
import protectRoute from '../middleware/auth';
import { RoleEnum } from '../utils/enum';
const router = Router();


router.post('/create', protectRoute(), addCategory);

export default router