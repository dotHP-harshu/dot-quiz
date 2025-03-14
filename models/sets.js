const mongoose = require("mongoose");

const setsSchema = mongoose.Schema({
    name:{
        type:String
    },
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'topics'
    },
    questions:{
        type:Array,
        required:true,
    },
})

const setModel = mongoose.model("set", setsSchema);
module.exports = setModel