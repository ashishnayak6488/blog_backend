import express from 'express';
import {signupUser , loginUser} from '../controller/user-controller.js'
import { uploadImage, getImage } from '../controller/image-controller.js';
import multer from 'multer';

// import upload from '../utils/upload.js'
import { createPost , getAllPosts , getPost ,updatePost , deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment , getComments , deleteComment } from '../controller/comment-controller.js';


const storage = multer.memoryStorage();
const upload = multer({ storage });

// const upload = multer({ dest: "uploads/" }); // or use memoryStorage/gridfs

const router = express.Router();
router.post('/signup' , signupUser)
router.post('/login' , loginUser)

router.post('/file/upload' , upload.single('file') , uploadImage)
router.get('/file/:filename' , getImage)

router.get('/create' , authenticateToken ,  createPost)

router.get('/posts' , authenticateToken ,  getAllPosts)
router.get('/post/:id' , authenticateToken ,  getPost)
router.put('/update/:id' , authenticateToken ,  updatePost)
router.delete('/delete/:id' , authenticateToken ,  deletePost)

router.post('/comment/new' , authenticateToken ,  newComment)
router.get('/comments/:id' , authenticateToken ,  getComments)
router.delete('/comment/delete/:id' , authenticateToken ,  deleteComment)

export default router;