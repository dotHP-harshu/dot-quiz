
const startBtn = document.getElementById("start");
const timeContainer = document.querySelector("#rules p");
const rulesContainer = document.getElementById("rules-wrapper")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const submitBtn = document.getElementById("submit")
const allQuestions = document.querySelectorAll('.question');
const minContainer = document.getElementById("minutes");
const secContainer = document.getElementById("seconds");
const confirmationContainer = document.getElementById("submit-confirmation");
const noBtn = document.getElementById("no-btn")


let timer;
let seconds = 0;
let minutes = 0;
let totalTime = (allQuestions.length * 20);
let currentQuestion = 0;


timeContainer.textContent = `📌 You have ${totalTime} seconds.`

// start quiz clickin on start btn
startBtn.addEventListener('click', () => {
    rulesContainer.style.display = ' none'
    // Code for timer in the quiz 
    timer = setInterval(() => {
        seconds++;

        if (seconds < 60) {
            if (seconds < 10) {
                secContainer.textContent = "0" + seconds;
            } else {
                secContainer.textContent = seconds;
            }
        } else {
            seconds = 0;
            secContainer.textContent = "00"

            minutes++;

            if (minutes < 10) {
                minContainer.textContent = "0" + minutes
            } else {
                minContainer.textContent = minutes
            }
        }
    }, 1000);
})



// initially hide the submit button
submitBtn.style.display = "none"

const showQuestion = (index) => {
    allQuestions.forEach(question => question.style.display = "none");
    allQuestions[index].style.display = 'flex'
}

window.onload = showQuestion(currentQuestion) // initial call to show first question
prevBtn.disabled = true;
prevBtn.style.opacity = 0.6; // intially disables button

// get next question slide on click on nextbtn
nextBtn.addEventListener("click", () => {
    prevBtn.disabled = false;
    prevBtn.style.opacity = 1;

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

// get previous question slide on click on prevbtn
prevBtn.addEventListener("click", () => {

    nextBtn.disabled = false;
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none"

    if (currentQuestion <= 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = 0.6;
    }
    else {
        currentQuestion--;
        showQuestion(currentQuestion);
    }

})




// submit the quiz after over the time 
setTimeout(() => {
    clearInterval(timer);
    alert("Time is over.");
    HTMLFormElement.prototype.submit.call(document.getElementById('quizform'));
}, totalTime*1000);


// show confirmation window
submitBtn.addEventListener("click", () => {
    confirmationContainer.style.display = 'flex';
})

// hide confirmation window
noBtn.addEventListener("click", () => {
    confirmationContainer.style.display = 'none';
})
