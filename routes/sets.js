const { readTopics } = require("../utils/readTopics");
const setModel  = require("../models/sets");
const topicModel = require("../models/topics");


module.exports.sets = async(req, res) => {
    
    try{
        let topicId= req.params.topicname;
    
    let topicObject = await topicModel.findById(topicId);
    let sets =  topicObject.sets;
    let icon = {
        img:  topicObject.icon,
        type: topicObject.icontype
    }


    res.render("sets", {sets, icon})
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}