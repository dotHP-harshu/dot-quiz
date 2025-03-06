const fs = require('fs')
module.exports.getQuiz = (req, res) =>{
    let {topicname, set} = req.params;

    fs.readFile(`./data/${topicname}/${set}.json`, (err, data)=>{
        if(err) return res.send(err.message);
        questions = JSON.parse(data).questions;
        // res.send(data);
        res.render("getQuiz", {questions, topicname, set})

    })
    
}