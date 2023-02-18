const User = require('../models/user');
// const Animal = require('../models/animal');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
// const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.registerUser = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'servifind/avatar',
        width: 150,
        crop: "scale"
    })

    const { name, age, gender, contact, email, password, role } = req.body;
    const user = await User.create({
        name,
        age,
        gender,
        contact,
        email,
        password,
        status: 'deactivated',
        // role,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    const token = user.getJwtToken();

    //  res.status(201).json({
    //  	success:true,
    //  	user,
    //  	token
    //  })
    sendToken(user, 200, res)
};

exports.application = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const UserData = {
        status: "activated"
    }
    if (!user) {
        return next(new ErrorHandler('Injury disease not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, UserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}

exports.createUser = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'servifind/avatar',
        width: 150,
        crop: "scale"
    })

    const { name, age, gender, contact, email, role, password } = req.body;
    const user = await User.create({
        name,
        age,
        gender,
        contact,
        email,
        role,
        password,

        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    // const token = user.getJwtToken();

    //  res.status(201).json({
    //  	success:true,
    //  	user,
    //  	token
    //  })
    res.status(201).json({
        success: true,
        user
    })
};


exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))

    }
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    if (user.status !== 'activated') {
        return next(new ErrorHandler('Your account must be active, Please contact support!', 401));
    }

      

  
    else {
        sendToken(user, 200, res, {success:true})
    //     const token = user.getJwtToken();
  	//  res.status(201).json({
    // 	 	success:true,
    // 	 	token
    // 	 });
    }

}




// exports.logout = async (req, res, next) => {
//     res.cookie('token', null, {
//         expires: new Date(Date.now()),
//         httpOnly: true
//     })

//     res.status(200).json({
//         success: true,
//         message: 'Logged out'
//     })
// }

// Get all users   =>   /api/v1/users
exports.allUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}
exports.allFreelancers = async (req, res, next) => {
    const users = await User.find({ role: 'freelancer' });

    res.status(200).json({
        success: true,
        users
    })

}
// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
}


exports.updateUser = async (req, res, next) => {
    console.log(req.body);
    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        // email: req.body.email,
        // role: req.body.role

    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.params.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: '/servifind/avatar',
            width: 150,
            crop: "scale"
        })




        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        
    })
}







exports.newAdopter = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { name, age, gender, contact, email, password } = req.body;
    const user = await User.create({
        name,
        age,
        gender,
        contact,
        email,
        password,

        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    // const token = user.getJwtToken();

    //  res.status(201).json({
    //  	success:true,
    //  	user,
    //  	token
    //  })
    res.status(201).json({
        success: true,
        user
    })
};


exports.updateAdopter = async (req, res, next) => {
    // console.log(req.animal);
    const newAdopterData = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        email: req.body.email,
        role: req.body.role

    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.params.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })




        newAdopterData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }


    const user = await User.findByIdAndUpdate(req.params.id, newAdopterData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}




exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Shelter Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
}

exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    // const animal = await Animal.find({ adoption: { adopter: req.user.id, adoptername: req.user.name } })
    // if (req.user.role ==="admin"){

    res.status(200).json({
        success: true,
        user

    })
}

// Update / Change password   =>  /api/v1/password/update
// exports.updatePassword = async (req, res, next) => {
//     const user = await User.findById(req.user.id).select('password');
//     // Check previous user password
//     const isMatched = await user.comparePassword(req.body.oldPassword)
//     if (!isMatched) {
//         return next(new ErrorHandler('Old password is incorrect'));
//     }
//     user.password = req.body.password;
//     await user.save();
//     sendToken(user, 200, res)
// }

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})
// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact
    }
    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'servifind/avatar',
            width: 150,
            crop: "scale"
        })




        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})


exports.resetPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }
    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
    // {
    // "password": "password2",
    // "confirmPassword":password2
    // }
}


// exports.getPersonnels = async (req, res, next) => {
//     const personnel = await User.find({role:''});

//     res.status(200).json({
//         success: true,
//         personnel
//     })

// }

exports.getAdopters = async (req, res, next) => {
    const users = await User.find({ role: 'adopter' });

    res.status(200).json({
        success: true,
        users
    })

}
exports.getPersonnels = async (req, res, next) => {
    const users = await User.find({ role: ['veterenarian', 'rescuer', 'employee', 'volunteer'] });

    res.status(200).json({
        success: true,
        users
    })

}



exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    // if(!animal) {
    //     return res.status(404).json({
    //         success:false,
    //         message: 'Animal not found'
    //     })
    // }
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: 'User deleted'
    })
}

// exports.activateUser = async(req,res,next) =>{
//     const users = await User.findById(req.params.id);

// const newUserData = {
//     status:"inactive"
//   }
// if(users.status === active){
//     newUserData = {
//       status:"inactive"
//     }
// }
// else{
//     newUserData = {
//         status:"active"
//       }

// }

//     if(!users) {
//         return next(new ErrorHandler('User Not Found',404));
//     }
//     const user = await User.findByIdAndUpdate(req.users.id, newUserData, {
//         new: true,
//         runValidators: true,
//         // useFindAndModify: false
//     })
//     res.status(200).json({
//         success: true,
//         message: 'User Updated'
//     })
// }
exports.activateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const UserData = {
        status: "activated"
    }
    if (!user) {
        return next(new ErrorHandler('Injury disease not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, UserData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}
exports.deactivateUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    const serData = {
        status: "deactivated"
    }



    if (!user) {
        return next(new ErrorHandler('Injury disease not found', 404));
    }
    user = await User.findByIdAndUpdate(req.params.id, serData, {
        new: true,
        runValidators: true,
        // useFindandModify:false
    })
    res.status(200).json({
        success: true,
        user
    })
}



