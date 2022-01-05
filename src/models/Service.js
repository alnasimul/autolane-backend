const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    }
})

serviceSchema.pre('save', function(next){
    return next();
})

mongoose.model("Service", serviceSchema);