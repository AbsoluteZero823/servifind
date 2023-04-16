const { reset } = require('nodemon');
const Freelancer = require('../models/freelancer');
const Service = require('../models/service');
// const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// const  Category  = require('../models/category');

exports.newFreelancer = async (req, res, next) => {
    // console.log(req.body.resume);
    req.body.user = req.user._id;


    const resultResume = await cloudinary.v2.uploader.upload(req.body.resume, {
        folder: 'servifind/freelancer/resume',
        width: 150,
        crop: "scale"
    })
    const resultSchoolID = await cloudinary.v2.uploader.upload(req.body.schoolID, {
        folder: 'servifind/freelancer/resume',
        width: 150,
        crop: "scale"
    })


    // req.body.user = req.user.id;
    // const freelancer = await Freelancer.create(req.body);
    const freelancer = await Freelancer.create({
        user_id: req.body.user,
        resume: {
            public_id: resultResume.public_id,
            url: resultResume.secure_url
        },
        schoolID: {
            public_id: resultSchoolID.public_id,
            url: resultSchoolID.secure_url
        },

    })

    res.status(201).json({
        success: true,
        freelancer

    })






}

// all Freelancers
exports.getFreelancers = async (req, res, next) => {


    const freelancers = await Freelancer.find()

    res.status(200).json({
        success: true,
        freelancers
    })
}

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

exports.getApplicationEntries = async (req, res, next) => {

    // const freelancers = await Freelancer.find();


    // const applyingfreelancer = await Freelancer.find({ status: 'applying', _id: { $in: Services.freelancer_id } }).populate('user_id');


    // const applyingfreelancer = await Service.find({ freelancer_id: { $in: Freelancer._id } })
    const applyingfreelancer = await Freelancer.aggregate([
        {
            $match: { status: 'applying' }
        },
        {
            $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "freelancer_id",
                as: "firstService"
            }
        },
        {
            $sort: {
                "firstService": 1
            }
        }
    ])


    await Freelancer.populate(applyingfreelancer, { path: "user_id" });
    // const applyingfreelancer = freelancers.filter(function (o) {
    //     return o.status === 'applying';

    // });


    // const applyingfreelancer = await Service.aggregate([
    //     {
    //         $lookup: {
    //             from: "freelancers",
    //             localField: "freelancer_id",
    //             foreignField: "_id",
    //             as: "table2_data"
    //         }
    //     },
    //     {
    //         $sort: {
    //             "table2_data.column1": 1
    //         }
    //     }
    // ])

    res.status(200).json({
        success: true,
        applyingfreelancer
    })

    // Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    //     .populate("users", "-password")
    //     //   .populate("groupAdmin", "-password")
    //     .populate("latestMessage")
    //     .sort({ updatedAt: -1 })
    //     .then(async (chats) => {
    //         chats = await User.populate(chats, {
    //             path: "latestMessage.sender",
    //             select: "name avatar email",
    //         });
    //         res.status(200).json({
    //             success: true,
    //             chats
    //         })




    //         // .send(results);
    //     });

}
