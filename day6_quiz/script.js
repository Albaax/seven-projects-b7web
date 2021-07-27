// Initial Data

let currentQuestion = 0;
let correctAnswers = 0;

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
showQuestion();
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`; 

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for(let i in q.options) { // Better performance than render DOM multiple times 
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach( option => {
            option.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    } else {
    }
    currentQuestion++;
    showQuestion();

}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points <= 40) {
        document.querySelector('.scoreText1').innerHTML = 'Bad, huh?';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points > 40 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Not bad, huh?';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Well played!!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `You got ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `You answered ${questions.length} and got ${correctAnswers} correct answers!`;
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
    
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}





















