const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelectorAll(".answer");
const nextButton = document.querySelector(".next-btn");
const progress = document.querySelector(".progress");

let currentQuestionIndex = 0;
let housePoints = {
  spectreseek: 0,
  erevald: 0,
  gaudmire: 0,
  alterok: 0,
};

const questions = [
  // Add your questions and points here as objects.
  // Example:
  {
    question: "when watching a movie, do you prefer...",
    answers: [
      { text: "action-packed adventures", points: { spectreseek: 2, erevald: 1, gaudmire: 1, alterok: 2 } },
      { text: "thought-provoking dramas", points: { spectreseek: 0, erevald: 1, gaudmire: 1, alterok: 0 } },
    ],
  },
  {
    question: "in a zombie apocalypse, would you prioritize...",
    answers: [
      { text: "survival", points: { spectreseek: 0, erevald: 1, gaudmire: 0, alterok: 2 } },
      { text: "helping others", points: { spectreseek: 2, erevald: 1, gaudmire: 2, alterok: 0 } },
    ],
  },
  {
    question: "would you rather have the power of...",
    answers: [
      { text: "flight?", points: { spectreseek: 1, erevald: 0, gaudmire: 0, alterok: 2 } },
      { text: "invisibility?", points: { spectreseek: 1, erevald: 2, gaudmire: 2, alterok: 0 } },
    ],
  },
  {
    question: "are you more likely to...",
    answers: [
      { text: "binge-watch a new Netflix series", points: { spectreseek: 1, erevald: 1, gaudmire: 0, alterok: 2 } },
      { text: "read a bestselling novel", points: { spectreseek: 1, erevald: 1, gaudmire: 2, alterok: 0 } },
    ],
  },
  {
    question: "are you more likely to enjoy ...",
    answers: [
      { text: " enjoy a lighthearted comedy", points: { spectreseek: 0, erevald: 1, gaudmire: 1, alterok: 0 } },
      { text: "suspenseful thriller", points: { spectreseek: 2, erevald: 1, gaudmire: 1, alterok: 2 } },
    ],
  },
  {
    question: "would you rather be best friends with...",
    answers: [
      { text: "naruto (from Naruto)", points: { spectreseek: 2, erevald: 0, gaudmire: 2, alterok: 0 } },
      { text: "luffy (from One Piece)", points: { spectreseek: 0, erevald: 2, gaudmire: 0, alterok: 2 } },
    ],
  },
  {
    question: "do you enjoy listening more to...",
    answers: [
      { text: "podcasts", points: { spectreseek: 0, erevald: 1, gaudmire: 1, alterok: 2 } },
      { text: "youTube videos", points: { spectreseek: 2, erevald: 1, gaudmire: 1, alterok: 0 } },
    ],
  },
  {
    question: "would you rather explore...",
    answers: [
      { text: "a magical world filled with supernatural creatures", points: { spectreseek: 0, erevald: 2, gaudmire: 1, alterok: 0 } },
      { text: "a futuristic world with advanced technology", points: { spectreseek: 2, erevald: 0, gaudmire: 1, alterok: 2 } },
    ],
  },
  {
    question: "in a debate, are you more likely to...",
    answers: [
      { text: "advocating for the other side", points: { spectreseek: 0, erevald: 2, gaudmire: 1, alterok: 0 } },
      { text: "defend your own viewpoint", points: { spectreseek: 2, erevald: 0, gaudmire: 1, alterok: 2 } },
    ],
  },
  {
    question: "do you prefer...",
    answers: [
      { text: "cats", points: { spectreseek: 0, erevald: 2, gaudmire: 1, alterok: 2 } },
      { text: "dogs", points: { spectreseek: 2, erevald: 0, gaudmire: 2, alterok: 0 } },
    ],
  },
  {
    question: "if you could time travel, would you...",
    answers: [
      { text: "visit the past", points: { spectreseek: 2, erevald: 1, gaudmire: 1, alterok: 0 } },
      { text: "visit the future", points: { spectreseek: 0, erevald: 1, gaudmire: 2, alterok: 2 } },
    ],
  },
  {
    question: "would you rather control...",
    answers: [
      { text: "fire", points: { spectreseek: 2, erevald: 0, gaudmire: 0, alterok: 2 } },
      { text: "water", points: { spectreseek: 0, erevald: 2, gaudmire: 2, alterok: 0 } },
    ],
  },
  {
    question: "are you more interested in exploring...",
    answers: [
      { text: "outer space", points: { spectreseek: 1, erevald: 0, gaudmire: 2, alterok: 2 } },
      { text: "the depths of the ocean", points: { spectreseek: 1, erevald: 2, gaudmire: 0, alterok: 0 } },
    ],
  },
  
  // Continue adding questions...
];

function startQuiz() {
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  
  const questionData = questions[currentQuestionIndex];
  questionElement.innerText = questionData.question;

  answerButtons.forEach((button, index) => {
    button.innerText = questionData.answers[index].text;
    button.onclick = () => {
      selectAnswer(questionData.answers[index].points);
      nextButton.style.display = "block";
    };
  });
}

function selectAnswer(points) {
  for (const house in points) {
    housePoints[house] += points[house];
  }
}

function showResults() {
  // Determine the house with the highest points.
  let maxPoints = 0;
  let winnerHouse = "";
  for (const house in housePoints) {
    if (housePoints[house] > maxPoints) {
      maxPoints = housePoints[house];
      winnerHouse = house;
    }
  }

  // Define the filter links and background images for each house.
  const houseData = {
    spectreseek: {
      filterLink: " https://www.instagram.com/ar/551221270226764/",
      backgroundImage: "url('full bg spectreseek.png')",
    },
    erevald: {
      filterLink: "https://www.instagram.com/ar/1154288828601911/",
      backgroundImage: "url('full bg erevald.png')",
    },
    gaudmire: {
      filterLink: " https://www.instagram.com/ar/930295128108146/",
      backgroundImage: "url('full bg gaudmire.png')",
    },
    alterok: {
      filterLink: "https://www.instagram.com/ar/759300495853042/",
      backgroundImage: "url('full bg alterok.png')",
    },
  };

    // Set the background image for the winner house.
    document.body.style.backgroundImage = houseData[winnerHouse].backgroundImage;

    // Display the results and show the corresponding Instagram filter link.
    quizContainer.innerHTML = `
      <h2 class='w-10/12 mx-auto font-extrabold text-center text-5xl '>You have been chosen by ${winnerHouse}!</h2>
      <p class='w-10/12 mx-auto font-semibold text-center mt-12 text-xl '>Click the link below to try your ${winnerHouse} Instagram filter:</p>
      <a class='bg-white mt-16 block w-fit p-4 px-8 focus:bg-blue-500 focus:text-white text-black rounded-full m-auto text-black' href="${houseData[winnerHouse].filterLink}" target="_blank">Try the ${winnerHouse} AR Filter</a>
      <a class='bg-white mt-4 block w-fit p-3 px-6 focus:bg-blue-500 focus:text-white text-black rounded-full m-auto text-black' href="${`https://twitter.com/intent/tweet?text=I%20just%20took%20the%20buildspace%20House%20quiz%20and%20found%20out%20I%E2%80%99be%20been%20chosen%20by%20${winnerHouse},%20Take%20the%20quiz%20if%20you%20wanna%20get%20matched%20with%20your%20house%20today%20https://shipcrew.xyz/house`}" target="_blank">Share the word</a>
    `;
  }

function showNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    showResults();
  }
}

nextButton.addEventListener("click", showNextQuestion);
document.addEventListener("DOMContentLoaded", startQuiz);