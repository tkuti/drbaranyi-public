const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const specialDaySchema = Schema({

    day:{
        type: Date,
        required: true,
    },

    type:{
        type: String,
        required: true,
    },

    newDay:{
        type: String,
        required: true,
        default: null
    }

});


module.exports = SpecialDay = mongoose.model("SpecialDay", specialDaySchema, "special-days");