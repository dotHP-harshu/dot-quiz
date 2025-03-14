const setModel = require('../models/sets');

module.exports.result = async (req, res) => {
    try{
        let setId = req.params.setId;

    let givenAnswers = Object.values(req.body);
    let totalQuestions = givenAnswers.length;
    let attemptAnswers = givenAnswers.length;
    let incorrectAnswers = 0;

    let setObject = await setModel.findById(setId);
    let questionArray = setObject.questions;
    let correctAnswers = questionArray.map((question) => {
        return question.correctAnswer;
    })

    let score = 0;

    givenAnswers.forEach((ans, i) => {
        if (givenAnswers[i] == correctAnswers[i]) {
            score++;
        } else if (givenAnswers[i] == "") {
            attemptAnswers--;
        } else {
            incorrectAnswers++;
        }
    })


    res.render("result", { score, totalQuestions, attemptAnswers, incorrectAnswers });
    }catch(err){
        res.status.json({
            err:"Sorry any error occurs on submitting the test.",
            message:err.message
        })
    }
}