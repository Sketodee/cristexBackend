const Joi = require('joi')

const validateOrder = (order) => {
    const orderDtoSchema = Joi.object({
        deliveryDate: Joi.string().required().messages({
            'any.required': 'Delivery date is required',
            'string.empty': 'Delivery date cannot be empty'
        }),
        shippedBy: Joi.string().required().messages({
            'any.required': 'Shipping details is required',
            'string.empty': 'Shipping details cannot be empty'
        }),
        status: Joi.string().required().valid('Order Confirmed', 'Picked By Courier', 'On The Way', 'Ready For Pickup', 'On Hold').messages({
            'any.required': 'status is required',
            'string.empty': 'status cannot be empty',
        }), 
        from: Joi.string().required().messages({
            'any.required': 'Location is required',
            'string.empty': 'Location cannot be empty'
        }),
        currentLocation: Joi.string().required().messages({
            'any.required': 'Location is required',
            'string.empty': 'Location cannot be empty'
        }),
        to: Joi.string().required().messages({
            'any.required': 'Location is required',
            'string.empty': 'Location cannot be empty'
        }),
        receiverName: Joi.string().required().messages({
            'any.required': 'Receiver name is required',
            'string.empty': 'Receiver name cannot be empty'
        }),
        receiverAddress: Joi.string().required().messages({
            'any.required': 'Receiver address is required',
            'string.empty': 'Receiver address cannot be empty'
        }),
        receiverEmail: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        }), 
        receiverPhone: Joi.string().pattern(/^[0-9]+$/).required().messages({
            'any.required': 'Phone number is required',
            'string.empty': 'Phone number cannot be empty',
            'string.pattern.base': 'Phone number must contain only digits'
        }), 
        items : Joi.array()
        .items(
             Joi.object({
                name: Joi.string().required().messages({
                    'any.required': 'Name is required',
                    'string.empty': 'Name cannot be empty'
                }),
                price: Joi.number().required().messages({
                    'number.base': 'numberOfGuests must be a number',
                    'any.required': 'numberOfGuests is required'
                }),  
           })
        )
        .min(1)
        .required()
        .messages({
          'array.base': 'item must be an array',
          'array.empty': 'item cannot be empty',
          'any.required': 'item are required',
          'array.min': 'At least one item is required',
         //  'any.only': 'Each tag must be a non-empty string'
        })
    })

    return orderDtoSchema.validate(order, {abortEarly: false})
}

const validateStatus = (status) => {
    const changeStatusSchema = Joi.object({
        status: Joi.string().required().valid('Order Confirmed', 'Picked By Courier', 'On The Way', 'Ready For Pickup').messages({
            'any.required': 'status is required',
            'string.empty': 'status cannot be empty',
        }), 
        currentLocation: Joi.string().required().messages({
            'any.required': 'Location is required',
            'string.empty': 'Location cannot be empty'
        }),
    })

    return changeStatusSchema.validate(status, {abortEarly: false})
}

module.exports = {
    validateOrder, 
    validateStatus
}