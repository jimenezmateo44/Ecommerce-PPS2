import express from "express";
import {
        loginUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getUser,
        deleteUser,
        getUserById, 
        updateUser,
        } from "../controllers/userController.js";
import { protect, admin } from '../middleware/authMiddelware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUser);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);


export default router;