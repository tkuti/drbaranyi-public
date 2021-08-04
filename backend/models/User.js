const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = Schema({

    userId:{
        type: String,
        required: true,
    },

    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    role:{
        type: String,
        required: true,
    }


});


module.exports = User = mongoose.model("User", userSchema);