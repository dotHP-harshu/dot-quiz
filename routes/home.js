const { readTopics } = require("../utils/readTopics");

const renderHome = (req, res) => {
    readTopics((err, data)=>{
        if(err) return res.send(err);
        let topics = data.topics;
        res.render("home", {topics});
    })
}

module.exports = renderHome;