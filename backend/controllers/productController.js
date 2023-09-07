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

const createProduct = asyncHandler(async (req, res) => {
    const product = new Producto({
      name: 'Producto nombre',
      price: 0,
      user: req.user._id,
      image: '/images/ejemplo.png',
      brand: 'Marca',
      category: 'Categoria',
      countInStock: 0,
      numReviews: 0,
      description: 'Descripcion',
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });


  const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category,
    countInStock } = req.body;

    const producto = await Producto.findById(req.params.id);

    if (producto) {
        producto.name = name;
        producto.price = price;
        producto.description = description;
        producto.image = image;
        producto.brand = brand;
        producto.category = category;
        producto.countInStock = countInStock;

        const updatedProduct = await producto.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('No encontrado');
    }
  });

export { getProducts, getProductById, createProduct, updateProduct};