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


    fieldRun() {
        // let foundHat = false; // determines if app should continue asking for user input
        // let dead = false; // determines if user falls off map or down a hole
        let position = [0, 0]; // starting position of user
        let fieldSize = [myField.field.length - 1, myField.field[0].length - 1] // determines the size of the field (x.length, y.length)

        while (!this.foundHat & !this.dead) {
            // get user input
            let move = prompt('Which way?');
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


const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
    ['░', '░', '░'],
  ]);

myField.print();
myField.fieldRun();

