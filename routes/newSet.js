

const fs = require("fs");
const { readTopics } = require("../utils/readTopics");


module.exports.newSet = (req, res) => {
    let { topic, setname, questions } = req.body;
    questions = JSON.parse(questions); // parse string into json

    fs.readdir(`./data/${topic}`, (err, files) => {
        if (files.indexOf(setname + ".json") == -1) {
            fs.writeFile(`./data/${topic}/${setname}.json`, JSON.stringify(questions, null, 2), (err) => {
                if (err) return res.send(err.message);
                readTopics(function (err, data) {
                    if (err) return res.send(err.message);

                    data = data.topics;
                    let topicInJson = data.find(t => t.name === topic)
                    topicInJson.sets.push(setname);
                    data = {
                        "topics": data
                    }

                    fs.writeFile("./data/topics.json", JSON.stringify(data), (err) => {
                        if (err) return res.send(err.message)
                        res.redirect('/admin/panel');

                    })
                })
            })
        } else {
            return res.send("this file existed");
        }
    })





}