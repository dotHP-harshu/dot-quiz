// make a /admin/login route to login admin and also make middleware

const fs = require("fs");

module.exports.adminPanel =  (req, res) => {
    let topics;
    fs.readFile("./data/topics.json", (err, data) => {
        if (err) return res.send(err.message)
        topics = JSON.parse(data).topics;
        res.render("adminPanel", { topics });
    })
}