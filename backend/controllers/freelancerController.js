const { reset } = require('nodemon');
const Freelancer = require('../models/freelancer');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const  Category  = require('../models/category');

// exports.newTransaction = async (req, res, next) => {
//     console.log(req.body);
//     // req.body.user = req.user.id;
//     const transaction = await Transaction.create(req.body);

//     res.status(201).json({
//         success: true,
//         transaction
//     })
// }

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
    const freelancer = await Freelancer.findById(req.params.id)
        .populate('user_id');


    if (!freelancer) {
        return next(new ErrorHandler('Freelancer not found', 404));
    }
    res.status(200).json({
        success: true,
        freelancer
    })
}
