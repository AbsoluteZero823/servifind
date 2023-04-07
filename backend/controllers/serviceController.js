const { reset } = require('nodemon');
const Rating = require('../models/rating');
const Service = require('../models/service');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Category = require('../models/category');
//create new service
exports.newService = async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'servifind/avatar',
        width: 150,
        crop: "scale"
    })

    req.body.images = {public_id: result.public_id, url: result.secure_url};
    // req.body.user = req.user.id;
    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        service
    })
}


exports.getServices = async (req, res, next) => {
    const servicesCount = await Service.countDocuments();
    const apiFeatures = new APIFeatures(Service.find().populate(['category', 'user', 'freelancer_id']), req.query).search().filter();


    const services = await apiFeatures.query;
    let filteredServicesCount = services.length;
    // Fetch ratings for each service
    const serviceIds = services.map(service => service._id);
    const ratings = await Rating.find({ service_id: { $in: serviceIds } }).populate('user');

    // Merge ratings with services
    const servicesWithRatings = services.map(service => {
        const serviceRatings = ratings.filter(rating => rating.service_id.toString() === service._id.toString());
        const avgRating = serviceRatings.reduce((acc, rating) => acc + rating.rating, 0) / serviceRatings.length;
        return {
            ...service.toJSON(),
            ratings: serviceRatings,
            avgRating
        };
    });

    res.status(200).json({
        success: true,
        servicesCount,
        filteredServicesCount,
        services: servicesWithRatings
    });

}


exports.getSingleService = async (req, res, next) => {
    const service = await Service.findById(req.params.id).populate('user');

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

    if (!service) {
        return next(new ErrorHandler('Service not found', 404));
    }
    await service.remove();
    res.status(200).json({
        success: true,
        message: 'Service deleted'
    })
}

exports.getmyServices=async(req,res,next)=>{
    const services=await Service.find({user:req.user.id}).populate(['category', 'user', 'freelancer_id']);
    res.status(200).json({
        success:true,
        services
    })
}

