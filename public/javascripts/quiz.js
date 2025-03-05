const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const submitBtn = document.getElementById("submit")
const allQuestions = document.querySelectorAll('.question');

let currentQuestion = 0;


// initially hide the submit button
submitBtn.style.display = "none"

const showQuestion = (index) => {
    allQuestions.forEach(question => question.style.display = "none");
    allQuestions[index].style.display = 'flex'
}

window.onload =  showQuestion(currentQuestion) // initial call to show first question

nextBtn.addEventListener("click", () => {
    prevBtn.disabled = false;
    console.log(currentQuestion)

    if (currentQuestion >= (allQuestions.length - 1)) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block"
        nextBtn.disabled = true;
    }
    else {
        currentQuestion++;
        showQuestion(currentQuestion);
    }


})
prevBtn.addEventListener("click", () => {
    console.log(currentQuestion)

    nextBtn.disabled = false;
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none"

    if (currentQuestion <= 0) {
        prevBtn.disabled = true;
    }
    else {
        currentQuestion--;
        showQuestion(currentQuestion);
    }

})