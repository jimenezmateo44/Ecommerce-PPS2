import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productos from './data/productos.js';
import { connect } from 'mongoose';

const port = process.env.PORT || 5000;

connectDB(); //CONEXION A MONGODB
const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/productos', (req, res) => {
    res.json(productos);
});

app.get('/api/productos/:id', (req, res) => {
    const product = productos.find((p) => p._id === req.params.id);
    res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`));