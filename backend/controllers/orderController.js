import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'

//crear una orden
const addOrderItems = asyncHandler(async (req, res) => {
  const { 
    orderItems,
    shippingAddress,
    paymentMethod, 
    itemsPrice, 
    shippingPrice, 
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No hay productos');
  } else {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined, 
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
  }
});

//obtener ordenes de usuarios logueados
const getMyOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  });

//obtener ordenes por id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params._id).populate('user', 'name email');

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error('Orden no encontrada');
    }
  });

//actualizar orden a pagado
const updateOrderToPaid = asyncHandler (async (req, res) => {
    res.send('update order to paid');
  });

//actualizar a enviado  
const updateOrderToDelivered = asyncHandler (async (req, res) => {
    res.send('update order to delivered');
  });


//obtener todas las ordenes 
const getOrders = asyncHandler (async (req, res) => {
    res.send('get all orders');
  });


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};