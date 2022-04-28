import { WORDS } from "./words.js";

const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = []
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)


// Put the board on screen 
function initBoard() {
    //store gameboard in an easy variable
    let board = document.getElementById("gameBoard")

    // loop to set up gameboard with the 6 gueses
    for(let i=0;i<numberOfGuesses;i++){
        let row = document.createElement("div")
        row.className = "letterRow"

        //another loop to set up the letters in each row
        for(let j=0;j<5;j++){
            let box = document.createElement("div")
            box.className = "letterBox"
            //puts the letters into the created row
            row.appendChild(box)
        }

        // appends the row to the gameboard
        board.appendChild(row)
    }
}

initBoard()


// User Presses a Key
document.addEventListener("keyup", (e) => {
    if(guessesRemaining === 0){
        return
    }

    let pressedKey = String(e.key)

    if(pressedKey === "Backspace" && nextLetter !==0){
        //call delete letter function
        deleteLetter()
        return 
    }

    if (pressedKey === "Enter"){
        // call check guess function
        checkGuess()
        return
    }
    //use regex to make sure its alphabetical
    let found = pressedKey.match(/[a-z]/gi)
    if(!found || found.length >1){
        return
    } else {
        //call insertLetter function with pressedKey as an argument
        insertLetter(pressedKey)
    }
})



function insertLetter(pressedKey){
    //if board is full, don't add any more letters
    if(nextLetter===5){
        return
    }
    //sanitize the input
    pressedKey = pressedKey.toLowerCase()

    //choose what row to put the letter in IE how many guesses have you used
    let row = document.getElementsByClassName("letterRow")[6-guessesRemaining]

    // set the proper box in the row
    let box = row.children[nextLetter]
    //sets the box to the letter pressed
    box.textContent = pressedKey
    // changes the box to filled
    box.classList.add("filledBox")
    //adds the key to the current guess array
    currentGuess.push(pressedKey)
    // increases next letter count by 1
    nextLetter++
}

function checkGuess(){
    let row = document.getElementsByClassName("letterRow")[6-guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for(const val of currentGuess){
        guessString += val
    }
    // Makes sure the guess is the full 5 letter length
    if (guessString.length != 5){
        alert("Not enough letters")
        return
    }

    if (!WORDS.includes(guessString)){
        alert("Word not in list!")
        return
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            
            if (currentGuess[i] === rightGuess[i]) {
                // letter correct
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")
            alert(`The right word was: "${rightGuessString}"`)
        }
    }

}

function deleteLetter(){
    let row = document.getElementsByClassName("letterRow")[6-guessesRemaining]
    let box = row.children[nextLetter-1]
    //set letter box to blank
    box.textContent = ""
    // removes the filled box class
    box.classList.remove("filledBox")
    //remove the last letter from the guess array
    currentGuess.pop()
    //set the letter back 1
    nextLetter -=1
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}