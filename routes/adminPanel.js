// make a /admin/login route to login admin and also make middleware

const fs = require("fs");
const topicModel = require("../models/topics")

module.exports.adminPanel = async (req, res) => {
    try {
        let topics;
        topics = await topicModel.find({});
        res.render("adminPanel", { topics });
    } catch (err) {
        res.status(400).json({
            err: "Any error occurs on loading the app",
            message: err.message
        })
    }
}