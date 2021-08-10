const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const appointmentSchema = Schema({

    userId:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    event:{
        type: String,
        required: true
    },

    day:{
        type: Date,
        required: true
    },

    time:{
        type: String,
        required: true
    }

});


module.exports = Appointment = mongoose.model("Appointment", appointmentSchema);