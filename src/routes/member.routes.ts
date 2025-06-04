import { Router } from 'express';
import * as memberController from '../controllers/member.controller';

const router = Router();

router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMember);
router.post('/', memberController.create);
router.put('/:id', memberController.update);
router.delete('/:id', memberController.remove);

export default router;
