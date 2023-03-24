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

// NOT USABLE AT THE MOMENT
exports.makemeaFreelancer = async (req, res, next) => {
    // Check if the school ID image and resume document were uploaded
  if (!req.files || !req.files.schoolID || !req.files.resume) {
    return res.status(400).json({
      error: 'Please upload a school ID image and resume document'
    });
  }

  // Upload the school ID image to Cloudinary
  cloudinary.uploader.upload(req.files.schoolID.tempFilePath, {folder: '<YOUR_CLOUDINARY_FOLDER>'}, function(error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: error
      });
    }
    const schoolIDUrl = result.secure_url;

    // Upload the resume document to Cloudinary
    cloudinary.uploader.upload(req.files.resume.tempFilePath, {folder: '<YOUR_CLOUDINARY_FOLDER>'}, function(error, result) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: error
        });
      }
      const resumeUrl = result.secure_url;

      // Create a new student document with the file URLs
      const student = new Student({
        schoolID: schoolIDUrl,
        resume: resumeUrl
      });
      student.save()
        .then(result => {
          res.status(201).json({
            message: 'Student created successfully',
            student: result
          });
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
        });
    });
  });
}