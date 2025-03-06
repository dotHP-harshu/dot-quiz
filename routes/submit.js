const fs = require('fs');

module.exports.submit = (req, res) => {
    let { topicname, set } = req.params;
    let givenAnswers = Object.values(req.body);
    
    fs.readFile(`./data/${topicname}/${set}.json`, (err, data) => {
        if (err) return res.send(err.message);
        
        data = JSON.parse(data)
        let correctAnswers = data.questions.map((question) => {
            return question.correctAnswer
        })
        
        let score = 0;
        givenAnswers.forEach((ans, i) => {
            if (givenAnswers[i] == correctAnswers[i]) {
                score++;
            }
        });

        res.render("result",{score});
    })

}