import {WORDS} from "./words.js"

const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = []
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)