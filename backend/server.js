import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import productos from './data/productos.js';

const port = process.env.PORT || 5000;


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