const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
})

const Member = new mongoose.model('Member', memberSchema) ;

module.exports = Member;


