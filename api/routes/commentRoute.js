import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/create' , verifyUser, createComment )
router.post('/getComments', getComments)

export default router;