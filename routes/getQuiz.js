const fs = require('fs');
const { readTopics } = require('../utils/readTopics');

const setModel = require("../models/sets")
const topicModel = require("../models/topics")

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

module.exports.getQuiz = async (req, res) => {

    try{
        let setId = req.params.setId

        // get the set by id from model
        let set = await setModel.findById(setId);
    
        // get question from set
        let questions = set.questions;
        //shuffle the options
        questions.forEach(question => {
            shuffleArray(question.options); // Shuffle options before rendering
        });
    
        // get the topicname from topics model via setmodel
        let setTopicId = set.topicId;
        let topicObject = await topicModel.findById(setTopicId);
        let topicname = topicObject.topicname;
        let icon = {
            img: topicObject.icon,
            type: topicObject.icontype
        }
    
        res.render("getQuiz", { questions, set, topicname, icon })
    }catch(err){
        res.status(400).json({
            err:"An error occurs on loading quiz.",
            message:err.message
        })
    }

}


