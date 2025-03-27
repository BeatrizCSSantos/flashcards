document.addEventListener("DOMContentLoaded", function () {
  const saveCard = document.getElementById("save-button");
  const addNewCard = document.getElementById("add-new-cards");
  const closeCard = document.getElementById("close-button");
  const cardsContainer = document.getElementById("cards");
  const flashcardsContainer = document.getElementById("flashcards");

  let flashcardArray = JSON.parse(localStorage.getItem("flashcards")) || [];

  saveCard.addEventListener("click", addFlashcard);
  addNewCard.addEventListener(
    "click",
    () => (cardsContainer.style.display = "block")
  );

  closeCard.addEventListener(
    "click",
    () => (cardsContainer.style.display = "none")
  );

  function cardMaker(flashcardData, index) {
    const flashcard = document.createElement("div");
    flashcard.className = "flashcard";

    const question = document.createElement("p");
    question.setAttribute(
      "style",
      "font-family: var(--primary-font); font-size: 16px; text-align:center; padding: 15px; margin-top:30px; border: solid 1px lightgrey; width: 340px; background: white; border-radius: 3px;"
    );
    question.textContent = flashcardData.question;
    question.className = "flashcard-question";

    const answer = document.createElement("p");
    answer.setAttribute(
      "style",
      "font-family: var(--primary-font);font-size: 16px; text-align:center; display:none; margin: -10px 0px 0px 0px; border: solid 1px lightgrey; width: 370px; background: white; border-radius: 3px;"
    );
    answer.textContent = flashcardData.answer;
    answer.className = "flashcard-answer";
    answer.style.display = "none";

    const showAnswerButton = document.createElement("button");
    showAnswerButton.setAttribute(
      "style",
      "font-family: var(--primary-font);width: 250px;background: var(--primary-color);border-color: var(--secundary-color);border-radius: var(--radius);color: var(--strong-color-text); margin-left: 66px"
    );
    showAnswerButton.textContent = "Ver Resposta";
    showAnswerButton.className = "show-answer-btn";

    const deleteButton = document.createElement("i");
    deleteButton.setAttribute(
      "style",
      "color: var(--secundary-color);margin-right: var(--gap); display: flex;align-items: end;justify-content: end;"
    );
    deleteButton.className = "fas fa-trash flashcard-delete";

    showAnswerButton.addEventListener("click", () => {
      answer.style.display = answer.style.display === "none" ? "block" : "none";
      showAnswerButton.textContent =
        answer.style.display === "none" ? "Ver Resposta" : "Esconder Resposta";
    });

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      flashcardArray.splice(index, 1);
      localStorage.setItem("flashcards", JSON.stringify(flashcardArray));
      updateFlashcardsDisplay();
    });

    flashcard.appendChild(question);
    flashcard.appendChild(answer);
    flashcard.appendChild(showAnswerButton);
    flashcard.appendChild(deleteButton);

    return flashcard;
  }

  function updateFlashcardsDisplay() {
    flashcardsContainer.innerHTML = "";
    flashcardArray.forEach((card, index) => {
      flashcardsContainer.appendChild(cardMaker(card, index));
    });
  }

  function addFlashcard() {
    const questionInput = document.getElementById("question");
    const answerInput = document.getElementById("answer");

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
      alert("As areas de Pergunta e Resposta não podem ficar vazias");
      return;
    }

    const newFlashcard = {
      question,
      answer,
    };

    flashcardArray.push(newFlashcard);
    localStorage.setItem("flashcards", JSON.stringify(flashcardArray));

    questionInput.value = "";
    answerInput.value = "";
    cardsContainer.style.display = "none";

    updateFlashcardsDisplay();
  }

  function addDeleteAllButton() {
    if (!document.getElementById("delete-all-cards")) {
      const deleteAllButton = document.createElement("button");
      deleteAllButton.setAttribute(
        "style",
        "font-family: var(--primary-font);width: 250px;background: var(--primary-color);border-color: var(--secundary-color);border-radius: var(--radius);color: var(--strong-color-text);"
      );
      deleteAllButton.id = "delete-all-cards";
      deleteAllButton.textContent = "Deletar todos os FlashCards";
      deleteAllButton.className = "delete-all-btn";

      deleteAllButton.addEventListener("click", () => {
        if (confirm("Tem certeza que quer deletar todos os flashcards?")) {
          flashcardArray = [];
          localStorage.removeItem("flashcards");
          updateFlashcardsDisplay();
        }
      });

      const headerDiv = document.querySelector("#header div");
      headerDiv.appendChild(deleteAllButton);
    }
  }

  addDeleteAllButton();
  updateFlashcardsDisplay();
});
