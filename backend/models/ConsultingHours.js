const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const hourSchema = Schema({
    type:{
        type: String,
        required: true,
    },

    time:{
        type: String,
        required: true,
    },
})

const consultingHoursSchema = Schema({

    name:{
        type: String,
        required: true,
    },

    hours: [hourSchema]

});


module.exports = ConsultingHours = mongoose.model("ConsultingHours", consultingHoursSchema, "consulting-hours");