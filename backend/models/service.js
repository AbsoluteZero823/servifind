const mongoose = require('mongoose')

const Serviceschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Service'],
        trim: true,
        maxLength: [100, 'Service cannot exceed 100 characters']
    },
    // description : {
    // 	type: String,
    //     required: [true, 'Please enter the Description'],
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Service', Serviceschema);
