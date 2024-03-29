import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import productos from "./data/productos.js";
import User from "./models/userModel.js";
import Producto from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Producto.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = productos.map((productos) => {
            return { ...productos, user: adminUser};
        });

        await Producto.insertMany(sampleProducts);

        console.log('Data importada!'.green.inverse);
        process.exit();
    
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Producto.deleteMany();
        await User.deleteMany();

        console.log('Data destruida'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}