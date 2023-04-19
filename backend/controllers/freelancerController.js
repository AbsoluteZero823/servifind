const { reset } = require('nodemon');
const Freelancer = require('../models/freelancer');
const Service = require('../models/service');
const cloudinary = require('cloudinary')
const fs = require('fs');
const path = require('path');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const  Category  = require('../models/category');

exports.newFreelancer = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;



}

//all Transactions
// exports.getTransactions = async (req, res, next) => {


//     const transactions = await Transaction.find().populate([{
//         path: 'inquiry_id',

//         populate: { path: 'customer' }
//     },
//     {
//         path: 'inquiry_id',

//         populate: { path: 'freelancer' }
//     }
//     ]);
//     res.status(200).json({
//         success: true,
//         transactions
//     })
// }

// const inquiries = await Inquiry.find({ freelancer: user._id }).populate(['customer', {
//     path: 'service_id',

//     populate: { path: 'user' }
// }, {
//         path: 'service_id',
//         populate: { path: 'category' }
//     }]);


exports.getSingleFreelancer = async (req, res, next) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id).populate('user_id');

    if (!freelancer) {
      return next(new ErrorHandler('Freelancer not found', 404));
    }

    // Fetch all services related to the freelancer using the freelancer's _id
    const services = await Service.find({ freelancer_id: freelancer._id }).populate('category');

    res.status(200).json({
      success: true,
      freelancer,
      services
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.makemeaFreelancer = async (req, res, next) => {
  try {
    const existingFreelancer = await Freelancer.findOne({ user_id: req.user.id });
    if (existingFreelancer) {
      return next(new ErrorHandler('You already have a freelancer document registered, Wait for Administrator Verification', 400));
    }
    const qrResult = await cloudinary.v2.uploader.upload(req.body.qrCode, {
      folder: 'servifind/freelancer/documents',
      width: 300,
      crop: "scale"
    });
    const schoolIdResult = await cloudinary.v2.uploader.upload(req.body.schoolID, {
      folder: 'servifind/freelancer/documents',
      width: 300,
      crop: "scale"
    });
    const resumeFile = req.files.resume;
    const resumePath = path.join(__dirname,'..','resumes', resumeFile.name);
    // Write the file to disk
    await fs.promises.writeFile(resumePath, resumeFile.data);
    // Create a new freelancer document with the file URLs
    const freelancer = new Freelancer({
      user_id: req.user.id,
      gcash_name: req.body.gcash_name,
      gcash_number: req.body.gcash_number,
      qrCode: {
        public_id: qrResult.public_id,
        url: qrResult.secure_url
      },
      schoolId: {
        public_id: schoolIdResult.public_id,
        url: schoolIdResult.secure_url
      },
      resume: {
        path: resumePath
      }
    });
    const result = await freelancer.save();
    res.status(201).json({
      message: 'Application Sent, Wait for Confirmation',
      freelancer: result,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
  };

exports.getmyFreelancers = async (req, res, next) => {
  try {
    const freelancer = await Freelancer.find({ user_id: req.user.id });
    res.status(200).json({
      success: true,
      freelancer
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

exports.updatemyFreelancers = async (req, res, next) => {
  try{
    const freelancer = await Freelancer.findOneAndUpdate({ user_id: req.user.id }, req.body, { new: true });
    res.status(200).json({
      message: "Freelancer Updated Successfully",
      freelancer: freelancer,
      success: true
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

exports.upgrademyFreelancer = async (req, res, next) => {
  try{
    const receiptresult = await cloudinary.v2.uploader.upload(req.body.receipt, {
      folder: 'servifind/freelancer/documents',
      width: 300,
      crop: "scale"
    });
    req.body.premiumreceipt = {
      public_id: receiptresult.public_id,
      url: receiptresult.secure_url
    };
    const freelancer = await Freelancer.findOneAndUpdate({ user_id: req.user.id }, req.body, { new: true });
    console.log(freelancer);
    res.status(200).json({
      message: "Applied for Premium",
      freelancer: freelancer,
      success: true
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}
