const express = require ('express')
const router = express.Router()
const orderController = require('../../controllers/orderController')

router.route('/addorder')
    .post(orderController.addOrder)

router.route('/getorders')
    .get(orderController.getOrder)

router.route('/updateorderstatus')
    .post(orderController.updateOrderStatus)

router.route('/getorderbytrackingid')
    .get(orderController.getOrderByTrackingId)

module.exports = router