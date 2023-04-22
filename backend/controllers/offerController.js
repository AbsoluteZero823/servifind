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


    // const offers = await Offer.find().populate('offered_by');



    const offers = await Offer.aggregate([
        // {
        //     $match: { status: 'applying' }
        // },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "offer_id",
                as: "transaction"
            }
        },
        {
            $sort: {
                "transaction": 1
            }
        }
    ])

    await Offer.populate(offers, { path: "offered_by" });

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
        .populate(['offered_by', 'request_id']);


    if (!requestoffers) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        requestoffers
    })
}

exports.cancelOtherOffer = async (req, res, next) => {
    // console.log(req.params);
    // if(request._id ===){

    // }
    // const offerData = {
    //     offer_status: 'accepted',

    // }
    const requestId = req.params.id;

    const offer = await Offer.updateMany({ $and: [{ "request_id": requestId }, { "_id": { $ne: req.params.offer_id } }] }, { $set: { offer_status: 'cancelled' } })

    // const offer = await Offer.findByIdAndUpdate(req.params.id, offerData, {
    //     new: true,
    //     runValidators: true,
    //     // useFindandModify:false
    // })
    res.status(200).json({
        success: true,

    })


}


exports.acceptOffer = async (req, res, next) => {
    console.log(req.params);


    const offer = await Offer.findByIdAndUpdate(req.params.id, { offer_status: 'granted' }, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}
