const { reset } = require('nodemon');
const Request = require('../models/request');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newRequest = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const request = await Request.create(req.body);

    res.status(201).json({
        success: true,
        request
    })
}

//all Requests
exports.getRequests = async (req, res, next) => {


    const requests = await Request.find().populate('requested_by');
    res.status(200).json({
        success: true,
        requests
    })
}

exports.getSingleRequest = async (req, res, next) => {
    const request = await Request.findById(req.params.id)
        .populate([{
            path: 'inquiry_id',

            populate: { path: 'customer' }
        },
        {
            path: 'inquiry_id',
            model: 'Inquiry',
            populate: {
                path: 'freelancer',
                model: 'Freelancer',
                populate: {
                    path: 'user_id',
                    model: 'user'
                }
            }
        }
        ]);

    // if(!injury_disease) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Injury_disease not found'
    //     })
    // }
    if (!request) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        request
    })
}


