// Load the quiz questions from the data.json file
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const quizQuestions = data.questions;
    const quizForm = document.getElementById("quiz-form");
    const resultContainer = document.getElementById("result-container");

    // Generate the quiz questions dynamically
    quizQuestions.forEach((question, index) => {
      const questionContainer = document.createElement("div");
      questionContainer.classList.add("my-6");

      const questionTitle = document.createElement("h2");
      questionTitle.classList.add("text-xl","my-3", "font-semibold");
      questionTitle.textContent = `${index + 1}: ${question.text}`;
      questionContainer.appendChild(questionTitle);

      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("grid", "gap-4","my-3", "grid-cols-2");

      question.options.forEach(option => {
        const optionLabel = document.createElement("label");
        optionLabel.classList.add("flex", "items-center", "cursor-pointer");

        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = `question-${index}`;
        optionInput.value = option.characterTrait;
        optionInput.classList.add("mr-2");
        optionLabel.appendChild(optionInput);

        const optionText = document.createElement("span");
        optionText.textContent = option.text;
        optionLabel.appendChild(optionText);

        optionsContainer.appendChild(optionLabel);
      });

      questionContainer.appendChild(optionsContainer);
      quizForm.insertBefore(questionContainer, quizForm.lastElementChild);
    });

    // Handle form submission
    quizForm.addEventListener("submit", event => {
      event.preventDefault();

      const selectedOptions = [];
      const radioInputs = quizForm.querySelectorAll("input[type='radio']");

      radioInputs.forEach(input => {
        if (input.checked) {
          selectedOptions.push(input.value);
        }
      });

      if (selectedOptions.length === quizQuestions.length) {
        // Calculate the user's character trait
        const characterTraitCounts = {
          spectreseek: 0,
          erevald: 0,
          gaudmire: 0,
          alterok: 0
        };

        selectedOptions.forEach(option => {
          characterTraitCounts[option]++;
        });

        const maxCount = Math.max(...Object.values(characterTraitCounts));
        const characterTrait = Object.keys(characterTraitCounts).find(key => characterTraitCounts[key] === maxCount);

        // Display the result
        resultContainer.textContent = `Your character trait is: ${characterTrait}`;
        resultContainer.classList.remove("hidden");
      } else {
        alert("Please answer all of the questions.");
      }
    });
  })
  .catch(error => console.error(error));
