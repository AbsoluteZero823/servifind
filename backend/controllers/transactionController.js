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

// //all Transactions
// exports.getTransactions = async (req, res, next) => {


//     const transactions = await Inquiry.find().populate(['customer', {
//         path: 'service_id',
//         populate: { path: 'user' }
//     }, {
//             path: 'service_id',
//             populate: { path: 'category' }
//         }]);
//     res.status(200).json({
//         success: true,
//         transactions
//     })
// }

// get Freelancer Transaction
exports.getMyFTransactions = async (req, res, next) => {


    const transactions = await Inquiry.find().populate(['customer', {
        path: 'service_id',
        populate: { path: 'user' }
    }, {
            path: 'service_id',
            populate: { path: 'category' }
        }]);
    res.status(200).json({
        success: true,
        transactions
    })
}

// get Client Transaction
exports.getMyCTransactions = async (req, res, next) => {


    const transactions = await Inquiry.find().populate(['customer', {
        path: 'service_id',
        populate: { path: 'user' }
    }, {
            path: 'service_id',
            populate: { path: 'category' }
        }]);
    res.status(200).json({
        success: true,
        transactions
    })
}

