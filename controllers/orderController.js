const Order = require('../model/Order')
const Item = require('../model/Item')
const validator = require('../config/validator')
const helper = require('../config/helpers')
const { v4: uuid } = require('uuid')
const { format } = require('date-fns')
const { Schema } = require('mongoose')

const addOrder = async (req, res) => {
    const { error, value } = validator.validateOrder(req.body)

    if (error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({ 'Validation Errors': validationErrors })
    }

    try {
        //add items
        const createdItems = await Item.create(value.items)

        //create a new order 
        const newOrder = new Order({
            ...value,
            trackingId: `TR-${helper.randomNumber(15)}`,
            orderId: uuid(),
            items: createdItems.map(item => item._id),
            createdOn: new Date()
            // createdOn: `${format(new Date(), 'yy-MM-dd HH:mm')}` 
        })

        await newOrder.save();
        res.status(201).json({ 'message': 'Order successfully created' })
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid format' });
        }
        console.log(error)
        return res.status(400).json({ 'message': 'Error creating order' })
    }
}

const getOrder = async (req, res) => {
    const orders = await Order.find().populate('items').sort({ createdOn: -1 }).exec();
    if (!orders) return res.sendStatus(204)
    res.status(200).json(orders)
}

const updateOrderStatus = async (req, res) => {
    const { error, value } = validator.validateStatus(req.body)

    if (error) {
        const validationErrors = error.details.map((err) => err.message)
        return res.status(400).json({ 'Validation Errors': validationErrors })
    }

    var orderId = req?.query?.orderId
    if (!orderId) return res.status(400).json({ 'message': 'orderId parameter is required' })

    try {
        //check if order exist in database 
        const order = await Order.findOne({ orderId: orderId }).exec()
        if (!order) return res.status(400).json({ 'message': 'Order not found' })

        //change the state of the order 
        order.status = value.status
        order.currentLocation = value.currentLocation
        const result = await order.save()

        res.status(200).json({ 'message': 'Order sucessfully updated' })

    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid order format' });
        }
        console.log(error)
        return res.status(400).json({ 'message': 'Order not found' })
    }
}

const getOrderByTrackingId = async (req, res) => {
    var trackingId = req?.query?.trackingId
    if (!trackingId) return res.status(400).json({ 'message': 'trackingId parameter is required' })

    try {
        //check if order exist in database 
        const order = await Order.findOne({ trackingId: trackingId }).populate('items').exec()
        if (!order) return res.status(400).json({ 'message': 'Order not found' })
        res.status(200).json(order)

    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid order format' });
        }
        console.log(error)
        return res.status(400).json({ 'message': 'Order not found' })
    }
}

const deleteOrderByTrackingId = async (req, res) => {
    var trackingId = req?.query?.trackingId
    if (!trackingId) return res.status(400).json({ 'message': 'trackingId parameter is required' })

    try {
        const result = await Order.findOneAndDelete({ trackingId: trackingId });
        if (result) {
            // Delete associated items
            const itemIds = result.items;
            await Item.deleteMany({ _id: { $in: itemIds } });
            res.status(200).json({'message' : 'Order successfully deleted'})
        } else {
            return res.status(400).json({ 'message': 'Order not found' })
        }
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle the invalid ID format error
            return res.status(400).json({ 'message': 'Invalid order format' });
        }
        console.log(error)
        return res.status(400).json({ 'message': 'Order not found' })
    }
}

module.exports = {
    addOrder,
    getOrder,
    updateOrderStatus,
    getOrderByTrackingId,
    deleteOrderByTrackingId
}