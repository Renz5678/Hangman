const container = document.getElementById("letter-choices");
const hangmanBody = document.getElementById("hangman-body");
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

    if (guessedLetters.includes(guess)) {
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
        alert("Wrong guess, lives left: " + lives);
    }

    if (!guessedWord.includes("_")) {
        alert("You won!");
    } else if (lives <= 0) {
        alert("you lose");
    }

    textBox.innerHTML = guessedWord.join(" ");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}