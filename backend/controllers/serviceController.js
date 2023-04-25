const { reset } = require('nodemon');
const Service = require('../models/service');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Category = require('../models/category');
const cloudinary = require('cloudinary')
//create new service
exports.newService = async (req, res, next) => {
    // console.log(req.body);
    user = req.user._id
    freelancer_id = req.user.freelancer_id._id
    const { name, priceStarts_At, category } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: 'servifind/service',
        width: 150,
        crop: "scale"
    })


    service = await Service.create({
        name,
        priceStarts_At,
        category,
        freelancer_id,
        user,

        images: {
            public_id: result.public_id,
            url: result.secure_url
        },

    })



    // const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        service
    })
}


exports.getServices = async (req, res, next) => {
    const servicesCount = await Service.countDocuments();
    const apiFeatures = new APIFeatures(Service.find().populate(['category', 'user']), req.query).search().filter();


    const services = await apiFeatures.query;
    let filteredServicesCount = services.length;
    // const services = await Service.find().populate(['category', 'user']);
    res.status(200).json({
        success: true,
        // count: services.length,
        servicesCount,

        // resPerPage,
        filteredServicesCount,
        services
    })

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

exports.getFreelancerServices = async (req, res, next) => {


    const services = await Service.find({ freelancer_id: req.params.id }).populate(['category', 'freelancer_id']);

    res.status(200).json({
        success: true,
        services
    })

}

