const { name } = require("ejs");
const fs = require("fs");
const path = require("path");
const { readTopics } = require("../utils/readTopics");



module.exports.sets = (req, res) => {
    let topicname = req.params.topicname;
    readTopics((err, data) => {
        if (err) return res.send(err.message);
        data = data.topics;
        let img = data.find(e => e.name == topicname).img;
        
        fs.readdir(`./data/${topicname}`, (err, data) => {
            if (err) return res.send(err.message)
            let sets = data.map(set => ({
                name: path.basename(set, ".json"),
                path: `/sets/${topicname}/${path.basename(set, ".json")}`,
                img: img
            })) // making a array of objects containing the name and route path of each question set json file
            res.render("sets", { sets })
        })
    })

}