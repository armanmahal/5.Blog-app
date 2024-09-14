import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createComment, getComments, likeComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/create' , verifyUser, createComment )
router.post('/getComments', getComments)
router.put('/likeComment/:commentId', verifyUser, likeComment)

export default router;