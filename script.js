const container = document.getElementById("letter-choices");
const hangmanBody = document.getElementById("hangman-body");
const livesLeft = document.getElementById("lives-left");
const gussedLettersContainer = document.getElementById("guessed-letters");
const instructions = document.getElementById("instructions");
const instructionWrapper = document.getElementById("instruction-wrapper");
const close = document.getElementById("close");
const startBtn = document.getElementById("start");
const startWrapper = document.getElementById("start-wrapper");
const endWrapper = document.getElementById("end-wrapper");
const result = document.getElementById("result");
const word = document.getElementById("word");
const tries = document.getElementById("tries");
const playAgain = document.getElementById("play-again");

startBtn.addEventListener("click", ()=> {
    startWrapper.classList.add("hidden");
});

instructions.addEventListener("click", () => {
    instructionWrapper.classList.add("visible");
});

close.addEventListener("click", () => {
    instructionWrapper.classList.remove("visible");
});

playAgain.addEventListener("click", () => {
    location.reload();
});

const words = [
  "apple",
  "chair",
  "snake",
  "ghost",
  "music",
  "flame",
  "stone",
  "river",
  "house",
  "cloud"
];

let guessedLetters = [];

let n = getRandomInt(0, words.length - 1);
let lives = 6;
livesLeft.textContent = lives.toString();
let wordToBeGuessed = words[n];

let guessedWord = [];

for (let i = 0; i < wordToBeGuessed.length; i++) {
    guessedWord[i] = "_";
}

let isGuessed = false;
console.log(wordToBeGuessed);

const textBox = document.getElementById("text-box");

textBox.innerHTML = guessedWord.join(" "); 


for (let i = 65; i <= 90; i++) {
    const letterBtn = document.createElement("button");
    letterBtn.innerText = String.fromCharCode(i);
    letterBtn.className = "letters";
    letterBtn.onclick = () => startGame(String.fromCharCode(i).toLowerCase());
    container.appendChild(letterBtn);
}

let currentChild = hangmanBody.firstElementChild;
currentChild = currentChild.nextElementSibling;

function startGame(guess) {
    if (lives <= 0 || !guessedWord.includes("_")) {
        let decision = window.confirm("Game is already over, want another round?");
    
        if (decision) {
            location.reload();
        } else {
            return;
        }
    }

    if (guessedLetters.includes(guess) && lives > 0) {
        alert("Letter is already guessed!");
        return;
    }

    guessedLetters.push(guess);
    
    let correctGuess = false;
    for (let i = 0; i < wordToBeGuessed.length; i++) {
        if (wordToBeGuessed[i] === guess) {
            guessedWord[i] = guess;
            correctGuess = true;
        }
    }    

    if (!correctGuess) {
        currentChild.classList.add("visible");
        currentChild = currentChild.nextElementSibling;
        lives--;
        livesLeft.textContent = lives.toString();
        gussedLettersContainer.innerHTML += guess.toUpperCase() + " ";
        alert("Wrong guess, lives left: " + lives);
    }

    if (!guessedWord.includes("_")) {
        result.innerHTML = "You Win!"
        word.innerHTML = `The word was <b>${wordToBeGuessed.toUpperCase()}</b>`;
        tries.innerHTML = `Lives used: ${6 - lives}`;
        endWrapper.classList.remove("hidden");
        
    } else if (lives <= 0) {
        result.innerHTML = "You Lose!"
        word.innerHTML = `The word was <b>${wordToBeGuessed.toUpperCase()}</b>`;
        endWrapper.classList.remove("hidden");
    }

    textBox.innerHTML = guessedWord.join(" ");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}