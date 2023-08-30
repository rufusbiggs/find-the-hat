const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.prompt = require('prompt-sync')({sigint: true});
        this.dead = false; // determines if user falls off map or down a hole
        this.foundHat = false; // determines if app should continue asking for user input
    }

    // Print field in terminal for user
    print() {
        for (let line in this.field){
            console.log(this.field[line].join(''));
        }
    }

    // Determine move direction from user input
    directionYX(move) {
        if (move === 'd'){
            return [1, 0]
        }
        if (move === 'u'){
            return [-1, 0]
        }
        if (move === 'r'){
            return [0, 1]
        }
        if (move === 'l'){
            return [0, -1]
        }

        return "That's not a valid move!"
    }

    // Add move direction to starting position to return final position
    addYX(start, move) {
        let newYCoordinate = start[0] + move[0];
        let newXCoordinate = start[1] + move[1];

        return [newYCoordinate, newXCoordinate]
    }

    // Print message and end game
    fall() {
        console.log("You fell off the map, IDIOT!!!");
        this.dead = true;
    }

    // Print message and end game
    win() {
        console.log("Congrats, you found the hat!!!")
        this.foundHat = true;
    }

    // check if user input is valid move
    checkInput(input) {
        if (input === 'r' || input === 'l' || input === 'd' || input === 'u'){
            return true
        }
        
        console.log("That's not a valid move!")
    }

    static fieldGenerator(){
        // user prompts
        let y = prompt('Map height?');
        let x = prompt('Map width?');
        let difficulty = prompt('Difficulty easy, medium, hard?');

        // set % of holes according to difficulty level selected
        let probabilityOfHole;
        if (difficulty === 'easy'){
            probabilityOfHole = 1;
        }
        if (difficulty === 'medium'){
            probabilityOfHole = 2;
        }
        if (difficulty === 'hard'){
            probabilityOfHole = 3;
        }

        // generate field of elements either space of hole
        let generatedField = [];
        for (let i = 0; i < y; i++){
            // creates each row
            let generatedList = []; 
            for (let j = 0; j < x; j++){
                let randomNum = Math.random() * 10;
                if (randomNum < probabilityOfHole){
                    generatedList.push(hole);
                }
                else {
                    generatedList.push(fieldCharacter);
                }
            }
            // adds each row to the field
            generatedField.push(generatedList);
        }

        // Add hat for finish (making sure the starting position index 0 is not used)
        let randomHatIndex;
        let numberOfFieldSpaces = x * y;
        // Pick random field space (not starting position)
        do {
            randomHatIndex = Math.floor(Math.random() * numberOfFieldSpaces) - 1;
        }
        while (randomHatIndex < 1);
        // assign position of hat using y and x coordinates
        let hatYCoordinate = Math.floor(randomHatIndex / x);
        let hatXCoordinate = randomHatIndex % x;
        generatedField[hatYCoordinate][hatXCoordinate] = hat;
        
        // Add starting point to field
        generatedField[0][0] = pathCharacter;

        return generatedField;

    }
    

    fieldRun() {
        let position = [0, 0]; // starting position of user
        let fieldSize = [myField.field.length - 1, myField.field[0].length - 1] // determines the size of the field (x.length, y.length)

        while (!this.foundHat & !this.dead) {
            // get user input
            let move = prompt('Which way?');
            // check if the user inputs a valid move
            let check = this.checkInput(move)
            if (!check){
                continue;
            }
            // see where user moves
            let moveYX = this.directionYX(move);
            // determine coordinates of new position
            position = this.addYX(position, moveYX);

            if (position[0] > fieldSize[0] || position[1] > fieldSize[1] || position[0] < 0 || position[1] < 0){  // If user leaves the field (off sides or end) end game
                this.fall();
            }
            if (this.field[position[0]][position[1]] === 'O'){  // If user falls in a hole end game
                this.fall();
            }
            if (this.field[position[0]][position[1]] === '^'){  // If player finds hat, end game
                this.win();
            }
            else {
                this.field[position[0]][position[1]] = '*';
                this.print();
            }
        
        }

    }
}

// Create field using field class
const myField = new Field(Field.fieldGenerator());

// print field
myField.print();

// Run field game
myField.fieldRun();
