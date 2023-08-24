const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.prompt = require('prompt-sync')({sigint: true});
    }

    print() {
        for (let line in this.field){
            console.log(this.field[line].join(''));
        }
    }

    directionXY(move) {
        let xy = []
        if (move === 'r'){
            return [1, 0]
        }
        else if (move === 'l'){
            return [-1, 0]
        }
        else if (move === 'd'){
            return [0, 1]
        }
        else if (move === 'u'){
            return [0, -1]
        }
        else return "That's not a valid move!"
    }

    addXY(start, move) {
        let sum = [start[0]+move[0], start[1]+move[1]];
        return sum
    }

    dead() {
        console.log("You fell off the map, IDIOT!!!");
        dead = true;
    }

    win() {
        console.log("Congrats, you found the hat!!!")
        foundHat = true;
    }


    fieldRun() {
        let foundHat = false; // determines if app should continue asking for user input
        let dead = false; // determines if user falls off map or down a hole
        let position = [0, 0]; // starting position of user
        let fieldSize = [myField.field[0].length, myField.field.length] // determines the size of the field (x.length, y.length)

        while (!foundHat || !dead) {
            // get user input
            let move = prompt('Which way?');
            // see where user moves
            let moveXY = this.directionXY(move);
            // determine xy of new position
            let newPosition = this.addXY(position, moveXY)

            // If user leaves the field (off sides or end) end game
            if (newPosition[0] > fieldSize[0] || newPosition[1] > fieldSize[1]){
                this.dead();
            }
            // If user falls in a hole end game
            else if (this.field[newPosition[0]][newPosition[1]] === 'O'){
                this.dead();
            }
            // If player finds hat, end game
            else if (this.field[newPosition[0]][newPosition[1]] === '^'){
                this.win();
            }
            else {
                this.field[newPosition[0]][newPosition[1]] = '*';
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

