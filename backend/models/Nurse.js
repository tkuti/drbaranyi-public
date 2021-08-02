const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const nurseSchema = Schema({

    name:{
        type: String,
        required: true,
    },

    phone:{
        type: String,
        required: true,
    }

});


module.exports = Nurse = mongoose.model("Nurse", nurseSchema);