import express from 'express';
import * as memberController from '../controllers/member.controller';

const router = express.Router();

router.get('/', memberController.getAll);
router.get('/:id', memberController.getById);
router.post('/', memberController.create);
router.put('/:id', memberController.update);
router.delete('/:id', memberController.remove);

export default router;
