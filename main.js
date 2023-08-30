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

    print() {
        for (let line in this.field){
            console.log(this.field[line].join(''));
        }
    }

    print2(field){
        for (let line in field){
        console.log(field[line].join(''));
    }}

    directionYX(move) {
        let xy = []
        if (move === 'd'){
            return [1, 0]
        }
        else if (move === 'u'){
            return [-1, 0]
        }
        else if (move === 'r'){
            return [0, 1]
        }
        else if (move === 'l'){
            return [0, -1]
        }
        else return "That's not a valid move!"
    }

    addYX(start, move) {
        let sum = [start[0]+move[0], start[1]+move[1]];
        return sum
    }

    fall() {
        console.log("You fell off the map, IDIOT!!!");
        this.dead = true;
    }

    win() {
        console.log("Congrats, you found the hat!!!")
        this.foundHat = true;
    }

    checkInput(input) {
        if (input === 'r' || input === 'l' || input === 'd' || input === 'u'){
            return true
        }
        else console.log("That's not a valid move!")
    }

    static fieldGenerator(){
        // ask for dimensions of field
        let y = prompt('Map height?');
        let x = prompt('Map width?');

        // ask for difficulty level
        let difficulty = prompt('Difficulty low, med, hard?');

        // set % of holes according to difficulty level selected
        let probabilityOfHole = 0;
        if (difficulty === 'low'){
            probabilityOfHole = 1;
        }
        else if (difficulty === 'med'){
            probabilityOfHole = 2;
        }
        else if (difficulty === 'hard'){
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
                else generatedList.push(fieldCharacter);
            }
            // adds each row to the field
            generatedField.push(generatedList);
        }

        // Add hat for finish (making sure the starting position index 0 is not used)
        let randomHatIndex;
        do {
            randomHatIndex = Math.floor(Math.random() * x * y) - 1;
        }
        while (randomHatIndex === 0);
        generatedField[randomHatIndex % x][Math.floor(randomHatIndex / x)] = hat;
        
        // Add starting point
        generatedField[0][0] = pathCharacter;

        return generatedField;

    }
    

    fieldRun() {
        // let foundHat = false; // determines if app should continue asking for user input
        // let dead = false; // determines if user falls off map or down a hole
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
            // determine xy of new position
            position = this.addYX(position, moveYX);

            // If user leaves the field (off sides or end) end game
            if (position[0] > fieldSize[0] || position[1] > fieldSize[1] || position[0] < 0 || position[1] < 0){
                this.fall();
            }
            // If user falls in a hole end game
            else if (this.field[position[0]][position[1]] === 'O'){
                this.fall();
            }
            // If player finds hat, end game
            else if (this.field[position[0]][position[1]] === '^'){
                this.win();
            }
            else {
                this.field[position[0]][position[1]] = '*';
                this.print();
            }
        }

    }
}


const myField = new Field(Field.fieldGenerator());

myField.print();
myField.fieldRun();
