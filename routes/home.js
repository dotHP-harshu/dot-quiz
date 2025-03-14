const topicModel = require("../models/topics")
const renderHome = async (req, res) => {

    try {
        let topics = await topicModel.find({});
        res.render("home", { topics })
    }catch(err){
        res.status(400).json({
            err:"We can't load app. An error occurs.",
            message:err.message
        })
    }

}

module.exports = renderHome;