

const setModel = require("../models/sets")
const topicModel = require("../models/topics");


module.exports.newSet = async (req, res) => {

    try {
        let { topic, setname, questions } = req.body;

        let availableSet = await setModel.findOne({name:setname});
        if(availableSet) return res.status(400).json({message: "This set is already existed. Please change the set's name."})
        
        questions = JSON.parse(questions); // parse string into json

        let createdSet = await setModel.create({ name: setname, topicId: topic, questions });
        let topicObject = await topicModel.findOne({ _id: topic });
        topicObject.sets.push({ id: createdSet._id, name: createdSet.name });
        await topicObject.save();

        res.redirect("/admin/panel");
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}