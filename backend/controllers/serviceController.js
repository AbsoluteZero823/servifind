const { reset } = require('nodemon');
const Service = require('../models/service');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new service
exports.newService = async (req, res, next) => {
    console.log(req.body);
    // req.body.user = req.user.id;
    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        service
    })
}

exports.getServices = async (req, res, next) => {


    const services = await Service.find();
    res.status(200).json({
        success: true,
        services
    })

}


exports.getSingleService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    // if(!injury_disease) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Injury_disease not found'
    //     })
    // }
    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    res.status(200).json({
        success: true,
        service
    })
}

exports.updateService = async (req, res, next) => {
    let service = await Service.findById(req.params.id);
    // if(!injury_disease) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Injury_disease not found'
    //     })
    // }
    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        service
    })
}

exports.deleteService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    // if(!injury_disease) {
    //     return res.status(404).json({
    //         success:false,
    //         message: 'Injury_disease not found'
    //     })
    // }
    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    await service.remove();
    res.status(200).json({
        success: true,
        message: 'Service deleted'
    })
}



///NEW
// exports.createDiseaseReview = catchAsyncErrors(async (req, res, next) => {
//     const { rating, comment, diseaseId } = req.body;
//     const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment
//     }
//     const disease = await Disease.findById(diseaseId);
//     const isReviewed = disease.reviews.find(
//         r => r.user.toString() === req.user._id.toString()
//     )
//     if (isReviewed) {
//         disease.reviews.forEach(review => {
//             if (review.user.toString() === req.user._id.toString()) {
//                 review.comment = comment;
//                 review.rating = rating;
//             }
//         })
//     } else {
//         disease.reviews.push(review);
//         disease.numOfReviews = disease.reviews.length
//     }
//     disease.ratings = disease.reviews.reduce((acc, item) => item.rating + acc, 0) / disease.reviews.length
//     await disease.save({ validateBeforeSave: false });
//     res.status(200).json({
//         success: true
//     })
// })
// // Get Injury_disease Reviews   =>   /api/v1/reviews
// exports.getDiseaseReviews = catchAsyncErrors(async (req, res, next) => {
//     const disease = await Disease.findById(req.query.id);
//     res.status(200).json({
//         success: true,
//         reviews: disease.reviews
//     })
// })
// // Delete Injury_disease Review   =>   /api/v1/reviews
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//     const disease = await Disease.findById(req.query.diseaseId);
//     console.log(disease);
//     const reviews = disease.reviews.filter(review => review._id.toString() !== req.query.id.toString());
//     const numOfReviews = reviews.length;
//     const ratings = disease.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
//     await Disease.findByIdAndUpdate(req.query.diseaseId, {
//         reviews,
//         ratings,
//         numOfReviews
//     }, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     })
//     res.status(200).json({
//         success: true
//     })
// })