const { reset } = require('nodemon');
const Category = require('../models/category');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
// const  Category  = require('../models/category');

exports.newCategory = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    })
}

//all Categories
exports.getCategories = async (req, res, next) => {


    const categories = await Category.find();
    res.status(200).json({
        success: true,
        categories
    })
}

exports.getSingleCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id)
        ;


    if (!category) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        category
    })
}






