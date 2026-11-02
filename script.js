
const welcomePage = document.getElementById("welcome-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const progressText = document.getElementById("progress-text");

const resultTitle = document.getElementById("result-title");
const resultImage = document.getElementById("result-image");
const resultDescription = document.getElementById("result-description");


// Quiz questions

const questions = [
    {
        question: "When life gets overwhelming, what do you do?",
        answers: [
            { text: "Start something new", season: "spring" },
            { text: "Find friends and have fun", season: "summer" },
            { text: "Spend time reflecting", season: "autumn" },
            { text: "Retreat into my own world", season: "winter" }
        ]
    },
    {
        question: "Which moment feels most like you?",
        answers: [
            { text: "The first light of morning", season: "spring" },
            { text: "A spontaneous summer adventure", season: "summer" },
            { text: "A quiet rainy afternoon", season: "autumn" },
            { text: "A peaceful midnight", season: "winter" }
        ]
    },
    {
        question: "What matters most to you?",
        answers: [
            { text: "Growth", season: "spring" },
            { text: "Freedom", season: "summer" },
            { text: "Meaning", season: "autumn" },
            { text: "Peace", season: "winter" }
        ]
    },
    {
        question: "How would your friends describe you?",
        answers: [
            { text: "Hopeful", season: "spring" },
            { text: "Energetic", season: "summer" },
            { text: "Thoughtful", season: "autumn" },
            { text: "Independent", season: "winter" }
        ]
    }
];


// Personality results

const results = {
    spring: {
        title: "Spring Soul",
        image: "images/spring.jpg",
        description: "You are full of hope, kindness, and curiosity. Like spring, you believe in new beginnings and personal growth. You bring a gentle and positive energy to the people around you."
    },

    summer: {
        title: "Summer Soul",
        image: "images/summer.jpg",
        description: "You are adventurous, energetic, and full of life. Like summer, you enjoy freedom, excitement, and making memories. Your warmth and enthusiasm make others feel welcome."
    },

    autumn: {
        title: "Autumn Soul",
        image: "images/autumn.jpg",
        description: "You are thoughtful, sensitive, and deeply connected to your emotions. Like autumn, you appreciate meaningful moments and quiet beauty. You often notice things that others overlook."
    },

    winter: {
        title: "Winter Soul",
        image: "images/winter.jpg",
        description: "You are calm, independent, and reflective. Like winter, you value peace and personal space. You may be quiet on the outside, but you have a rich inner world."
    }
};


// Variables to remember the user's progress

let currentQuestion = 0;

let scores = {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0
};


// Start the quiz

startBtn.addEventListener("click", function() {
    welcomePage.classList.add("hidden");
    quizPage.classList.remove("hidden");

    showQuestion();
});


// Display the current question

function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;

    questionText.textContent = current.question;

    progressText.textContent = (currentQuestion + 1) + " / " + questions.length;

    answerOptions.innerHTML = "";

    current.answers.forEach(function(answer) {
        const button = document.createElement("button");

        button.textContent = answer.text;

        button.addEventListener("click", function() {
            selectAnswer(answer.season);
        });

        answerOptions.appendChild(button);
    });
}


// Save the answer and move to the next question

function selectAnswer(season) {
    scores[season]++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


// Calculate and display the personality result

function showResult() {
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    let highestScore = -1;
    let finalSeason = "";

    for (let season in scores) {
        if (scores[season] > highestScore) {
            highestScore = scores[season];
            finalSeason = season;
        }
    }

    resultTitle.textContent = results[finalSeason].title;
    resultImage.src = results[finalSeason].image;
    resultImage.alt = results[finalSeason].title;
    resultDescription.textContent = results[finalSeason].description;

    document.body.className = finalSeason;
}


// Restart the quiz

restartBtn.addEventListener("click", function() {
    currentQuestion = 0;

    scores = {
        spring: 0,
        summer: 0,
        autumn: 0,
        winter: 0
    };

    document.body.className = "";

    resultPage.classList.add("hidden");
    welcomePage.classList.remove("hidden");
});
