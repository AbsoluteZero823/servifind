const { reset } = require('nodemon');
const Offer = require('../models/offer');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newOffer = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const offer = await Offer.create(req.body);

    res.status(201).json({
        success: true,
        offer
    })
}

//all Offers
exports.getOffers = async (req, res, next) => {


    const offers = await Offer.find().populate('offered_by');
    res.status(200).json({
        success: true,
        offers
    })
}

exports.getSingleOffer = async (req, res, next) => {
    const offer = await Offer.findById(req.params.id)
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
    if (!offer) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        offer
    })
}


