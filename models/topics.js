const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    topicname:{
        type:String,
        required:true
    },
    icon:{
        type:Buffer,
        required:true
    },
    icontype:{
        type:String,
    },
    sets:{
        type:Array,
        default:[]
    }
})

const topicModel = mongoose.model("topic", topicSchema);
module.exports = topicModel;