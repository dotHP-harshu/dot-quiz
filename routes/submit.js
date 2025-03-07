const fs = require('fs');

module.exports.result = (req, res) => {
    let { topicname, set } = req.params;
    let givenAnswers = Object.values(req.body);
    let totalQuestions = givenAnswers.length;
    let attemptAnswers = givenAnswers.length;
    let incorrectAnswers = 0;


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
            } else if (givenAnswers[i] == "") {
                attemptAnswers--;
            }else{
                incorrectAnswers++;
            }
        });

        res.render("result", { score, totalQuestions, attemptAnswers , incorrectAnswers});
    })

}