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