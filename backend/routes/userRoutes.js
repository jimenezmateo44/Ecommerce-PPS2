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

const router = express.Router();

router.route('/').post(registerUser).get(getUser);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);


export default router;