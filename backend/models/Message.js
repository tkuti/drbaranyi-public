const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = Schema({

    userId:{
        type: String,
        required: true,
    },

    type:{
        type: String,
        required: true,
    },

    userName:{
        type: String,
        required: true,
    },

    date:{
        type: Date,
        required: true,
    },

    message:{
        type: String,
        required: true,
    },

    creatorId: {
        type: String,
        required: true,
    }

});


module.exports = Message = mongoose.model("Message", messageSchema);