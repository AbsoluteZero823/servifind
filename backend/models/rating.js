const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_At: {
        type: Date,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
})

module.exports = mongoose.model('Rating', ratingSchema);