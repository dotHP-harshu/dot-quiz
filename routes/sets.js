const { name } = require("ejs");
const fs = require("fs");
const path = require("path");



module.exports.sets = (req, res)=>{
    let topicname = req.params.topicname;

    fs.readdir(`./data/${topicname}`, (err, data)=> {
        let sets = data.map(set=>({
            name : path.basename(set, ".json"),
            path:`/sets/${topicname}/${path.basename(set, ".json")}`
        })) // making a array of objects containing the name and route path of each question set json file
        res.render("sets", {sets})
    })
}