const gameBoard = document.getElementById('grid');
const incorrect = document.getElementById('incorrect');
const word_list = [
    "banana", 
    "chicken", 
    "library", 
    "octopus", 
    "giraffe", 
    "pumpkin", 
    "tornado", 
    "journey", 
    "sandwich", 
    "elephant", 
    "mountain", 
    "firework", 
    "pineapple", 
    "notebook", 
    "kangaroo", 
    "birthday", 
    "raincoat", 
    "backpack", 
    "umbrella", 
    "avocado"
];
const the_grid = document.getElementById('the_grid');
let letter_guess = document.getElementById('letter_guess');
const guess_button = document.getElementById('guess');
const mister = document.getElementById('hanged_man')
const play_button = document.getElementById('play')
const the_game = document.getElementById('game')
const the_user = document.getElementById('user')
const player = document.getElementById('player')

let randomIndex = Math.floor(Math.random() * word_list.length);
word = word_list[randomIndex]

let grid = [];
let word_array = [];
let incorrect_guesses = new Set();
let all_guesses = []
let correct = [];
let wrong = 0;
let counter = 1;
img_srcs = ['bar.png', 'head.png', 'body.png', 'arm1.png', 'arm2.png', 'leg1.png', 'fullBody.jpg']

play_button.addEventListener("click", ()=>{
    the_game.style.display = 'flex'
    the_user.style.display = 'flex'
    play_button.remove()
});

makeGrid()

guess_button.addEventListener('click', function() {
    const inputValue = letter_guess.value;
    console.log(inputValue);  
    game(inputValue)
});

letter_guess.addEventListener("keypress", (e)=>{
    if(e.key=== "Enter"){
        guess_button.click();
    }
});

function game(inputValue){
    if(all_guesses.includes(inputValue)){
        console.log('Letter Already Picked, Choose another letter!')
    }
    else{
    breakWord();
    checkLetter(inputValue); 
    letter_guess.value = ""
    makeGrid(); 
    mister.src= img_srcs[wrong]
    }
    
    let wordSet = new Set(word_array.sort());
    let correctSet = new Set(correct.sort());

    if (areSetsEqual(wordSet, correctSet)) {
        gameOver('win')
    }
    if (wrong > 5) {
        gameOver('lose')
    }
    console.log('Round:', counter++);
    console.log('wrong:', wrong);
}


function gameOver(outcome){
    gameBoard.removeChild(gameBoard.lastChild)
    para = document.createElement('p')
    para.id = 'the_grid';
    para.textContent = word
    gameBoard.appendChild(para);

    while (player.firstChild) {
        player.removeChild(player.firstChild);
    }

    if(outcome == 'win'){
        message = document.createElement('p')
        message.textContent = 'CONGRALUTIONS, YOU WIN!!!'
        message.id='outcome'
        message.style.color= 'green';

        player.appendChild(message);
    }
    
    if(outcome == 'lose'){
        message = document.createElement('p')
        message.textContent = 'YOU LOSE!!!'
        message.id='outcome'
        message.style.color= 'red'

        player.appendChild(message);

    }
}

function makeGrid() {
    console.log('Making Grid');
    console.log('Word to guess is: ', word);

    const currentGrid = document.getElementById('the_grid');

    if (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
        console.log('THE GRID EXISTS')
    }

    grid = Array(word.length).fill('_');

    for (let i = 0; i < word_array.length; i++) {
        for (let j = 0; j < correct.length; j++) {
            if (correct[j] == word_array[i]) {
                grid[i] = correct[j];
                break;
            }
        }
    }

    console.log('grid', grid);
    console.log(grid.join(" "));
    let para = document.createElement('p');
    para.id = "the_grid";
    para.textContent = grid.join(" ");

    gameBoard.appendChild(para);
    console.log("grid was made");

    if(incorrect.children.length > 1){
        incorrect.removeChild(incorrect.lastElementChild)
    }

    let oPara = document.createElement('p');
    oPara.id= 'i_letters';
    let incorrectArray = Array.from(incorrect_guesses);
    oPara.textContent = incorrectArray.join(" ");
    incorrect.appendChild(oPara)

    return grid;
}

function breakWord() {
    for (let i = 0; i < word.length; i++) {
        word_array[i] = word[i];
    }
    return word_array;
}

function checkLetter(letter) {
    console.log(letter);

    if (word_array.includes(letter)) {
        console.log('Correct');
        correct.push(letter);
    } else {
        console.log('Incorrect');
        incorrect_guesses.add(letter);
        wrong++;
        
    }
    all_guesses.push(letter)
}

function areSetsEqual(set1, set2) {
    if (set1.size !== set2.size) {
        return false; // Sets must have the same size to be equal
    }
    // Check if every element in set1 is also in set2
    for (let item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    return true;
}


