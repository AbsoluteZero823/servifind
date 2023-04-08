const { reset } = require('nodemon');
const Offer = require('../models/offer');
const Request = require('../models/request');
const Category = require('../models/category')
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newRequest = async (req, res, next) => {
    // Check if a request already exists for the user in the same category
    const existingRequest = await Request.findOne({
        requested_by: req.user._id,
        category: req.body.category
    });
    if (existingRequest) {
        return next(new ErrorHandler('You have already created a request in this category', 400));
    }

    req.body.requested_by = req.user._id;
    const request = await Request.create(req.body);
    if(request){
        const addeddata = await Request.findById(request._id).populate('requested_by category');
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

exports.getAllexceptMyRequest = async (req,res,next) => {
    try {
        const requests = await Request.find({
          requested_by: { $ne: req.user.id }
        }).populate('category').populate('requested_by');
        res.status(200).json({requests: requests, success: true});
      } catch (error) {
        next(error);
      }
}

exports.getMyRequest = async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('category')
            .populate('requested_by');
        
        res.status(200).json({
            success: true,
            request
        });
    } catch (err) {
        next(err);
    }
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
    try {
      // Update the request status to cancelled
      const deletedRequest = await Request.findByIdAndUpdate(req.params.id, {
        request_status: 'cancelled'
      });
  
      if (!deletedRequest) {
        return next(new ErrorHandler('Request not found', 404));
      }
  
      // Update all offers associated with the request to cancelled
      const deletedOffers = await Offer.updateMany(
        { request_id: req.params.id },
        { offer_status: 'cancelled' }
      );
  
      res.status(200).json({
        success: true,
        message: 'Request and all offers associated with it have been cancelled'
      });
    } catch (error) {
      return next(new ErrorHandler('Server Error', 500));
    }
  };

exports.refuseanOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findById(req.body._id);
        if (!offer) {
        return res.status(404).json({ success: false, message: 'Offer not found' });
        }
        offer.offer_status = 'cancelled';
        await offer.save();
        res.status(200).json({ success: true, message: 'Offer refused successfully' });
    } catch (error) {
        return next(error);
    }
};

exports.acceptanOffer = async (req, res, next) => {
  const offerId = req.body.id;
  try {
    // Accept the selected offer
    const acceptedOffer = await Offer.findOneAndUpdate(
      { _id: offerId },
      { offer_status: 'granted' },
      { new: true }
    );

    await Request.findOneAndUpdate(
        { _id: acceptedOffer.request_id },
        { request_status: 'granted' },
    );

    res.status(200).json({
      success: true,
      message: 'Offer accepted successfully.',
    });
  } catch (err) {
    next(err);
  }
};




exports.getSingleRequest = async (req, res, next) => {
    const singlerequest = await Request.findById(req.params.id);
        // .populate([{
        //     path: 'inquiry_id',

        //     populate: { path: 'customer' }
        // },
        // {
        //     path: 'inquiry_id',
        //     model: 'Inquiry',
        //     populate: {
        //         path: 'freelancer',
        //         model: 'Freelancer',
        //         populate: {
        //             path: 'user_id',
        //             model: 'user'
        //         }
        //     }
        // }
        // ]);


    if (!singlerequest) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        singlerequest
    })
}


