const mongoose = require('mongoose');


const engineerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true
    }
})

const Engineer = new mongoose.model('Engineer', engineerSchema) ;

module.exports = Engineer;
