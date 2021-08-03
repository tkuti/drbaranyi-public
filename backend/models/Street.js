const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const streetSchema = Schema({

    irsz:{
        type: String,
        required: true,
    },

    kozterulet:{
        type: String,
        required: true,
    },

    jelleg:{
        type: String,
        required: true,
    },

    hsz:{
        type: String,
        required: true,
    },

    oldal:{
        type: String,
        required: true,
    },

});


module.exports = Street = mongoose.model("Street", streetSchema);