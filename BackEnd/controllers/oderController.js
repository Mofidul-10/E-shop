import e from 'express';
import asyncHandler from 'express-async-handler';

import Order from "../model/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice } = req.body;


    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }

})


const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now()

        const updatedOrder = await order.save();

        res.json(updatedOrder)

    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };