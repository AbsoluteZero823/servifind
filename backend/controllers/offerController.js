const { reset } = require('nodemon');
const Offer = require('../models/offer');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newOffer = async (req, res, next) => {
    req.body.offered_by = req.user._id;
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


    if (!offer) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        offer
    })
}


exports.getRequestOffers = async (req, res, next) => {
    const requestoffers = await Offer.find({ request_id: req.params.request_id })
        .populate(['offered_by', 'request_id','service_id'])


    if (!requestoffers) {
        return next(new ErrorHandler('Request not found', 404));
    }
    res.status(200).json({
        success: true,
        requestoffers
    })
}


exports.getmyOffers = async (req, res, next) => {
    const myoffers = await Offer.find({ offered_by: req.user._id }).populate(['offered_by', { path: 'request_id', populate: 'requested_by' },{ path: 'service_id', populate: 'category' }]);

    if (!myoffers) {
        return next(new ErrorHandler('Offers not found', 404));
    }

    console.log(myoffers[0])

    res.status(200).json({
        success: true,
        myoffers
    })

}

