const { reset } = require('nodemon');
const Rating = require('../models/rating');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newRating = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const rating = await Rating.create(req.body);

    res.status(201).json({
        success: true,
        rating
    })
}

//all Ratings
exports.getRatings = async (req, res, next) => {


    const ratings = await Rating.find().populate([{
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
    },
    {
        path: 'inquiry_id',
        model: 'Inquiry',
        populate: {
            path: 'service_id'
        }
    }
    ]);
    res.status(200).json({
        success: true,
        ratings
    })
}

exports.getSingleRating = async (req, res, next) => {
    const rating = await Rating.findById(req.params.id)
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
    if (!rating) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        rating
    })
}

exports.PaymentSent = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentSent: req.body.paymentSent,

    }



    const rating = await Rating.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}
exports.PaymentReceived = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentReceived: req.body.paymentReceived,

    }



    const rating = await Rating.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.ratingDone = async (req, res, next) => {
    console.log(req.body);


    if (req.body.freelancer === 'true' && req.body.client === 'true') {
        formData = {

            status: 'completed'

        }
        formData.rating_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: req.body.workCompleted,
            ratingCompleted: now()
        }
    } else if (req.body.freelancer === 'true' && req.body.client === 'false') {
        formData = {



        }
        formData.rating_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: now()

        }
    } else {
        formData = {



        }

        formData.rating_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,

        }
    }




    const rating = await Rating.findByIdAndUpdate(req.params.id, formData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}



