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