const { reset } = require('nodemon');
const Request = require('../models/request');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newRequest = async (req, res, next) => {
    req.body.requested_by = req.user._id;
    const request = await Request.create(req.body);
    if(request){
        const addeddata = await Request.find({_id: request._id}).populate('requested_by category');
        res.status(201).json({
            success: true,
            addeddata
        })
    }else{
        return next(new ErrorHandler('Server Error',400));
    }
    
}

//all Requests
exports.getRequests = async (req, res, next) => {
    const requests = await Request.find().populate('requested_by');
    res.status(200).json({
        success: true,
        requests
    })
}

exports.getMyRequests = async (req, res, next) => {
    const requests = await Request.find({requested_by: req.user.id}).populate('requested_by category');
    if (requests){
        res.status(200).json({
            success: true,
            requests
        })
    }else{
        return next(new ErrorHandler('Server Error',400));
    }
    
}

exports.editMyRequest = async (req, res, next) => {
    const requests = await Request.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if(requests){
        res.status(200).json({
            success: true,
            requests
        })
    }else{
        return next(new ErrorHandler('Server Error',400));
    }
}

exports.deleteMyRequest = async (req, res, next) => {
    const deleterequests = await Request.findByIdAndUpdate(req.params.id, {request_status: 'cancelled'});
    if(deleterequests){
        res.status(200).json({
            success: true,
            deleterequests
        })
    }else{
        return next(new ErrorHandler('Server Error',400));
    }
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


