// orderRouter.js
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log('Order creation route is called'); // Debug log

      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = req.body;

      console.log('Request Body:', req.body); // Debug log

      const newOrder = new Order({
        orderItems: orderItems.map((item) => ({
          slug: item.slug,
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.product, // Assuming 'product' is an ObjectId
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
      });

      const order = await newOrder.save();

      console.log('Order created successfully:', order); // Debug log

      res.status(201).send({ message: 'New Order Created', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res
        .status(500)
        .send({ message: 'Error creating order', error: error.message });
    }
  })
);

export default orderRouter;
