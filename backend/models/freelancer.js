const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    approved_date: {
        type: Date,
        required: true
    },
    isPremium: {
        type: String,
        required: true,
        default: 'false'
    },
    availability: {
        type: String,
        required: true,
        default: 'true'
    },
    gcash_name: {
       type: String,
       required: false,

    },
    gcash_num: {
        type: String,
        required: false
    },
    qrCode: {
        public_id: {
            type: String,
            required: true,
            default: 'servifind/qrcode/default_profile'
        },
        url: {
            type: String,
            required: true,
            default: 'https://res.cloudinary.com/dawhmjhu1/image/upload/v1674014501/servifind/avatar/default_profile.jpg'
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },


 

})

module.exports= mongoose.model('Freelancer', freelancerSchema);