import express from 'express';
import {signup, login, logout} from '../controllers/authController.js';
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', authMiddleware, (req, res) => {
  console.log("User in auth route",req.user);
  res.send(req.user);
});


export default router;