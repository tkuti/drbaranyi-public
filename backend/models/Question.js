const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const questionSchema = Schema({

    question:{
        type: String,
        required: true
    },

    answer:{
        type: String,
        required: true
    },

    img: [
        {
            type: String,
        }
    ],

    video:{
        type: String,
        default: false
    }

});


module.exports = Question = mongoose.model("Question", questionSchema);