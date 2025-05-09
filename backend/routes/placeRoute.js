import express from 'express';
import { createPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace, getUserPlaces } from '../controllers/placeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/create', authMiddleware, createPlace);

router.get('/', getAllPlaces);

router.get('/user', authMiddleware, getUserPlaces); 

router.get('/:id', getPlaceById);

router.put('/:id', authMiddleware, updatePlace);

router.delete('/:id', authMiddleware, deletePlace);   



export default router;