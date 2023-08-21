const maxLength = 5;
let wordOfTheDayUrl = "https://words.dev-apis.com/word-of-the-day";
const chekValidWordUrl = "https://words.dev-apis.com/validate-word";
const letters = document.querySelectorAll(".word-section");
const allLetters = document.querySelectorAll(".input");
const againButton = document.querySelector(".again-button");
const endWindow = document.querySelector(".game-end-window ");
const endText = document.querySelector(".game-end-text");
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

const checkColor = (chcInst, letterIndex, fndIndex) => {
  if (chcInst === -1) {
    letters[row].children[letterIndex].classList.add("gray");
  } else {
    if (chcInst === i) {
      letters[row].children[letterIndex].classList.add("green");
      fndIndex.push(chcInst);
    } else letters[row].children[letterIndex].classList.add("yellow");
    fndIndex.push(chcInst);
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
    let foundIndex = [];
    for (i = 0; i < maxLength; i++) {
      let letterChecked = word.charAt(i);
      let checkedInstance = wordOfTheDay.indexOf(letterChecked);
      console.log(checkedInstance);
      if (foundIndex.includes(checkedInstance) === true) {
        checkedInstance = wordOfTheDay.indexOf(letterChecked, checkedInstance);
        // console.log(checkedInstance);
        checkColor(checkedInstance, i, foundIndex);
      } else checkColor(checkedInstance, i, foundIndex);
    }
    word = "";
    row++;
    column = 0;
    if (row === maxLength + 1) {
      endText.innerText = "You Lost Pal...";
      endWindow.style.visibility = "visible";
      gameOver = true;
    }
    return validationResponse;
  }
  word = "";
  return validationResponse;
};

const checkWord = () => {
  if (word === wordOfTheDay) {
    endText.innerText = "You've Won MOTHAFUCKAAAA";
    endWindow.style.visibility = "visible";
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

const playAgain = () => {
  wordOfTheDayUrl = "https://words.dev-apis.com/word-of-the-day?random=1";

  letters.forEach((letter) => {
    for (let i = 0; i < maxLength; i++) {
      letter.children[i].classList = "input";
      letter.children[i].innerText = "";
    }
  });
  row = 0;
  column = 0;
  storedKey = "";
  word = "";
  wordOfTheDay = "";
  validationResponse = "";
  gameOver = false;
  getWordOfTheDay();
  endWindow.style.visibility = "hidden";
};

addEventListener("onClick", () => {
  console.log(wordOfTheDay);
  console.log(validationResponse);
});
getWordOfTheDay();
