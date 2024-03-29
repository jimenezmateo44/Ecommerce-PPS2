import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;

connectDB(); //CONEXION A MONGODB
const app = express();

//BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//COOKIE PARSER MIDDLEWARE
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/productos', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
 
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
