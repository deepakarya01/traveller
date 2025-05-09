import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { bookingController, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', authMiddleware, bookingController);

router.get('/my-bookings', authMiddleware, getMyBookings)

export default router;