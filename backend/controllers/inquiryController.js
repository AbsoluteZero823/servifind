const { reset } = require('nodemon');
const Inquiry = require('../models/inquiry');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const  Category  = require('../models/category');
//create new service

exports.newInquiry = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
        success: true,
        inquiry
    })
}

//get all inquiries
exports.getInquiries = async (req, res, next) => {
    const inquiries = await Inquiry.find().populate(['customer', {path:'service_id',
    populate : {path: 'user'}}]);
    res.status(200).json({
        success: true,
       inquiries
    })
}