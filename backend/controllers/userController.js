import asyncHandler from '../middleware/asyncHandler.js';
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';

//autenticacion de login 

const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    /* se invoca al metodo matchPassword creado en userModel que hace 
        una comparacion con la libreria bcrypt (encripta la contrasena 
        de la base de datos) y la contrasena insertada */

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id); //Se genera el token de autorizacion 

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Correo o contraseña incorrrectos');
    }
});


//Registrar usuario

const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    const userExistente = await User.findOne({ email });

    if (userExistente) {
        res.status(400);
        throw new Error('Usuario existente');
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario invalidos');
    }
});


//Logout 

const logoutUser = asyncHandler (async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Sesion terminada con exito'});
});

//Obtener informacion del usuario 
const getUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
     res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
});

//Actualizar perfil de usuario 
const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });

    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
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