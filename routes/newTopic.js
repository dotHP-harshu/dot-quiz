const topicModel = require("../models/topics")

module.exports.newTopic = async (req, res) => {

    try {
        let topicname = req.body.topicname;


        let topic = await topicModel.find({topicname:topicname});
        if(topic) return res.status(400).json({message:"Topic already existed in the list."})
        
        
        let iconBuffer = req.file.buffer;
        let icontype = req.file.mimetype;

        await topicModel.create({ topicname, icon: iconBuffer, icontype })
        
        res.redirect("/admin/panel")

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

}