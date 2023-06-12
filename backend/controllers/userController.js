import asyncHandler from '../middleware/asyncHandler.js';
import User from "../models/userModel.js";


const loginUser = asyncHandler (async (req, res) => {
    res.send('auth user');
});


const registerUser = asyncHandler (async (req, res) => {
    res.send('register user');
});


const logoutUser = asyncHandler (async (req, res) => {
    res.send('logout user');
});


const getUserProfile = asyncHandler (async (req, res) => {
    res.send('get user profile');
});


const updateUserProfile = asyncHandler (async (req, res) => {
    res.send('update user profile');
});


const getUser = asyncHandler (async (req, res) => {
    res.send('get users');
});


const getUserById = asyncHandler (async (req, res) => {
    res.send('get user by id');
});


const deleteUser = asyncHandler (async (req, res) => {
    res.send('delete user');
});


const updateUser = asyncHandler (async (req, res) => {
    res.send('update user');
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser,
};