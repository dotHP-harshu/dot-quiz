const fs = require('fs');
const { readTopics } = require('../utils/readTopics');

module.exports.getQuiz = (req, res) => {
    let { topicname, set } = req.params;



    readTopics((err, data) => {
        if (err) return res.send(err.message);
        data = data.topics;
        let img = data.find(e => e.name == topicname).img;

        fs.readFile(`./data/${topicname}/${set}.json`, (err, data) => {
            if (err) return res.render("404");
            questions = JSON.parse(data).questions;
            // Fisher-Yates Shuffle Algorithm
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
                }
            }

            // Assuming 'questions' is an array of objects
            questions.forEach(question => {
                shuffleArray(question.options); // Shuffle options before rendering
            });
            // res.send(data);
            res.render("getQuiz", { questions, topicname, set, img })

        })
    })

}


