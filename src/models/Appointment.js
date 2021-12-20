const mongoose = require('mongoose');

const appoinmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    customername: {
        type: String,
        required: true
    },
    customeremail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status:{
        type: Boolean,
        required: true
    },
    assigned: {
        type: Boolean,
        required: true
    },
    delivered: {
        type: Boolean,
        required: true
    },
})

appoinmentSchema.pre('save', function(next){
    return next();
})

mongoose.model('Appointment', appoinmentSchema)

