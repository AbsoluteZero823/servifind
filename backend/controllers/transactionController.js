const { reset } = require('nodemon');
const Transaction = require('../models/transaction');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { now } = require('mongoose');
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

//all Transactions
exports.getTransactions = async (req, res, next) => {


    const transactions = await Transaction.find().populate([{
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
    },
    {
        path: 'inquiry_id',
        model: 'Inquiry',
        populate: {
            path: 'service_id'
        }
    }
    ]);
    res.status(200).json({
        success: true,
        transactions
    })
}

exports.getSingleTransaction = async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id)
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
        },
        {
            path: 'inquiry_id',
            model: 'Inquiry',
            populate: {
                path: 'service_id'
            }
        }
        ]);

    // if(!injury_disease) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Injury_disease not found'
    //     })
    // }
    if (!transaction) {
        return next(new ErrorHandler('Inquiry not found', 404));
    }
    res.status(200).json({
        success: true,
        transaction
    })
}

exports.PaymentSent = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentSent: req.body.paymentSent,

    }



    const transaction = await Transaction.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}
exports.PaymentReceived = async (req, res, next) => {
    console.log(req.body);
    const statusData = {
        paymentReceived: req.body.paymentReceived,

    }



    const transaction = await Transaction.findByIdAndUpdate(req.params.id, statusData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}

exports.transactionDone = async (req, res, next) => {
    console.log(req.body);


    if (req.body.freelancer === 'true' && req.body.client === 'true') {
        formData = {

            status: 'completed'

        }
        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: req.body.workCompleted,
            transactionCompleted: now()
        }
    } else if (req.body.freelancer === 'true' && req.body.client === 'false') {
        formData = {



        }
        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,
            workCompleted: now()

        }
    } else {
        formData = {



        }

        formData.transaction_done = {
            client: req.body.client,
            freelancer: req.body.freelancer,

        }
    }




    const transaction = await Transaction.findByIdAndUpdate(req.params.id, formData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,

    })
}



