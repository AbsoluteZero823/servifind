const { reset } = require('nodemon');
const Request = require('../models/request');
const Category = require('../models/category')
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
    // const servicesCount = await Service.countDocuments();
    const sort = { _id: -1 };
    const apiFeatures = new APIFeatures(Request.find().sort(sort).populate(['requested_by', 'category']), req.query).filter();

    const requests = await apiFeatures.query;
    // const requests = await Request.find().populate(['requested_by', 'category']);
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


    if (!request) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        request
    })
}


