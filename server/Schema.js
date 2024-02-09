const mongoose = require("mongoose");

const photos = mongoose.Schema({
    username : String,
    photo : {
        type: Array
    }
})

module.exports = mongoose.model("photosmodel", photos)