const { reset } = require('nodemon');
const Service = require('../models/service');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Category = require('../models/category');
//create new service
exports.newService = async (req, res, next) => {
    console.log(req.body);
    req.body.user = req.user.id;
    const service = await Service.create(req.body);

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


