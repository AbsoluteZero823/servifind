const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    
    price: {
        type: String,
        required: false
    },
    isPaid: {
        type: String,
        default: 'false',
        required: true
    },
    created_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    expected_Date: {
        type: Date,
        required: false
    },
    finished_At: {
        type: Date,
        required: false
    },
    inquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inquiry',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'processing'
    }

 

})

module.exports= mongoose.model('Transaction', transactionSchema);