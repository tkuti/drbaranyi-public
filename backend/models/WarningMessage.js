const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const warningMessageSchema = Schema({

    name:{
        type: String,
        required: true,
    },

    message:{
        type: String,
        required: true,
    }

});


module.exports = WarningMessage = mongoose.model("WarningMessage", warningMessageSchema, "warning-messages");