import asyncHandler from '../middleware/asyncHandler.js';
import Producto from "../models/productModel.js";


const getProducts = asyncHandler (async (req, res) => {
    const productos = await Producto.find({});
    res.json(productos);
});

const getProductById = asyncHandler (async (req, res) => {
    const product = await Producto.findById(req.params.id); 

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error(`Recurso no encontrado`);
    }
});

export { getProducts, getProductById };