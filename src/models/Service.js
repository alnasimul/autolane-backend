const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    services:  {
        type: Array,
        required: true
    }
})


const Service = new mongoose.model('Service', serviceSchema) ;

module.exports = Service;