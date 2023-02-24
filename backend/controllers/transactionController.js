const { reset } = require('nodemon');
const Transaction = require('../models/transaction');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const  Category  = require('../models/category');

exports.newTransaction = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
        success: true,
        transaction
    })
}

