const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId : {
        type : String, 
        required: true
    }, 
    deliveryDate: {
        type : String, 
        required: true
    }, 
    shippedBy : {
        type : String, 
        required: true
    }, 
    status : {
        type : String, 
        required: true
    }, 
    trackingId : {
        type : String, 
        required: true
    }, 
    from : {
        type : String, 
        required: true
    }, 
    currentLocation: {
        type : String, 
        required: true
    }, 
    to : {
        type : String, 
        required: true
    },
    createdOn: {
        type : Date, 
        required: true
    },
    receiverName: {
        type : String, 
        required: true
    }, 
    receiverAddress: {
        type : String, 
        required: true
    }, 
    receiverPhone: {
        type : String, 
        required: true
    }, 
    receiverEmail : {
        type : String, 
        required: true
    },
    items : [
        {type: Schema.Types.ObjectId, ref: 'Item' }
    ]
})

module.exports = mongoose.model('Order', orderSchema)