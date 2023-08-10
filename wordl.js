const maxLength = 5;
const wordOfTheDayUrl = "https://words.dev-apis.com/word-of-the-day";
const chekValidWordUrl = "https://words.dev-apis.com/validate-word";
const letters = document.querySelectorAll(".word-section");
let row = 0;
let column = 0;
let storedKey = "";
let word = "";
let wordOfTheDay = "";
let validationResponse = "";
let gameOver = false;

const getWordOfTheDay = async () => {
  const promise = await fetch(wordOfTheDayUrl);
  const processedResponse = await promise.json();
  wordOfTheDay = processedResponse.word.toUpperCase();
};

const handleBackspace = () => {
  letters[row].children[column].innerText = "";
  if (column !== 0) {
    column--;
  }
};

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

const handleLetters = () => {
  letters[row].children[column].innerText = event.key;
  if (column < maxLength - 1) {
    column++;
  }
};

const validateWord = async () => {
  const promise = await fetch(chekValidWordUrl, {
    method: "POST",
    body: JSON.stringify({ word: `${word}` }),
  });
  const processedResponse = await promise.json();
  validationResponse = processedResponse.validWord;

  if (validationResponse === false) {
    alert("That not a word MOTHAFUCKAAAAAA");
    word = "";
  } else {
    for (i = 0; i < maxLength; i++) {
      let letterChecked = word.charAt(i);
      let checkedInstance = wordOfTheDay.indexOf(letterChecked);
      if (checkedInstance === -1) {
        letters[row].children[i].classList.add("gray");
      } else {
        if (checkedInstance === i) {
          letters[row].children[i].classList.add("green");
        } else letters[row].children[i].classList.add("yellow");
      }
    }
    word = "";
    row++;
    column = 0;
    if (row === maxLength + 1) {
      alert("You Lost Pal...");
      gameOver = true;
    }
    return validationResponse;
  }
  word = "";
  return validationResponse;
};

const checkWord = () => {
  if (word === wordOfTheDay) {
    alert("You Won MOTHAFUCKAAAA");
    for (i = 0; i < maxLength; i++) {
      letters[row].children[i].classList.add("green");
    }
    gameOver = true;
  } else {
    validateWord();
  }
};

const handleEnter = () => {
  for (i = 0; i < maxLength; i++) {
    word = word + letters[row].children[i].innerText;
  }
  if (word.length === maxLength) {
    checkWord();
  } else word = "";
};

addEventListener("keydown", (event) => {
  if (!gameOver) {
    if (event.code === "Backspace") {
      handleBackspace();
    } else if (event.code === "Enter") {
      handleEnter();
    } else if (isLetter(event.key) === true) {
      handleLetters();
    }
  }
});

getWordOfTheDay();
