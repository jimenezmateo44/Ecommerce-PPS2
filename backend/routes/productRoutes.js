import express from "express";
import productos from '../data/productos.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(productos);
});

router.get('/:id', (req, res) => {
    const product = productos.find((p) => p._id === req.params.id);
    res.json(product);
});


export default router;