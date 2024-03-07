import { Cell } from './Cell.js';
import { Ship } from './Ship.js';

export class Grid {
    game;
    size;
    container;
    gridElement;
    grid;
    ships;
    shipBar;
    playerBoard;
    myTurn;
    setStatus;
    nrOfPlacedShips;

    constructor(game, size, playerBoard, myTurn, setStatus) {
        this.game = game;
        this.size = size;
        this.playerBoard = playerBoard;
        this.myTurn = myTurn;
        this.setStatus = setStatus;
        this.container = document.createElement('div');
        this.container.classList.add('board');
        document.querySelector('.container').appendChild(this.container);
        this.gridElement = document.createElement('div');
        this.initialiseGrid();
        if (this.playerBoard) {
            this.initialiseShips();
            this.container.classList.add('enabled');
        }
    }

    initialiseGrid() {
        this.gridElement.classList.add('grid');
        this.gridElement.style.gridTemplateColumns = `repeat(${this.size + 1}, var(--cell-size))`;
        this.grid = [];


        let heading = document.createElement('div');
        heading.classList.add('cell');
        heading.classList.add('heading');
        this.gridElement.appendChild(heading);

        for (let i = 65; i < 65 + this.size; i++) {
            heading = document.createElement('div');
            heading.classList.add('cell');
            heading.classList.add('heading');
            heading.innerHTML = String.fromCharCode(i);
            this.gridElement.appendChild(heading);
        }

        //fill the grid with 100 cells
        for (let x = 1; x <= this.size; x++) {
            this.grid[x] = [];

            heading = document.createElement('div');
            heading.classList.add('cell');
            heading.classList.add('heading');
            heading.innerHTML = x;
            this.gridElement.appendChild(heading);

            for (let y = 1; y <= this.size; y++) {

                let cell = new Cell(x, y, this);

                this.grid[x][y] = cell;

                this.gridElement.appendChild(cell.element);
            }

        }
        this.container.appendChild(this.gridElement);

        // TEMP


        this.ships = [];

        if (!this.playerBoard) {

            let ship = new Ship(0, 'testShip', 4);
            this.grid[4][4].drop(ship, 2);
            this.ships.push(ship);

            ship = new Ship(1, 'testShip Again', 3);
            this.grid[8][8].drop(ship, 3);
            this.ships.push(ship);
        }

        this.nrOfPlacedShips = 2;

        // TEMP
    }

    initialiseShips() {
        this.ships = [];
        this.shipBar = document.createElement('div');
        this.shipBar.classList.add('shipbar');
        const text = document.createElement('div');
        text.classList.add('text');
        text.innerHTML = 'Ship Bar'
        this.shipBar.appendChild(text);
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset Ships';
        resetButton.addEventListener("click", e => this.resetShips());
        this.shipBar.appendChild(resetButton);
        
        const submitButton = document.createElement('button');
        submitButton.id = "submitShips";
        submitButton.classList.add('hidden');
        submitButton.innerText = 'Submit Ships';
        submitButton.addEventListener("click", e => this.submitShips());
        this.shipBar.appendChild(submitButton);

        const shipList = [[4, 'patrouilleschip', 2],
        [3, 'onderzeeer', 3],
        [2, 'slagschip', 4],
        [1, 'vliegdekschip', 6]];

        let id = 0;

        for (let s = 0; s < shipList.length; s++) {
            for (let i = 0; i < shipList[s][0]; i++) {
                let ship = new Ship(id, shipList[s][1], shipList[s][2]);
                this.ships.push(ship);
                this.shipBar.appendChild(ship.element);
                id++;
            }
        }

        this.container.append(this.shipBar);
        this.nrOfPlacedShips = 0;
    }

    resetShips() {
        this.ships.forEach(ship => {
            ship.resetShip();
            this.shipBar.appendChild(ship.element);
        });
        this.grid.forEach(row => {
            row.forEach(cell => {
                cell.ship = null;
            })
        })
    }

    submitShips(){
        let submission = [];

        for (let x = 1; x <= this.size; x++) {
            submission[x-1] = []
            for (let y = 1; y <= this.size; y++) {
                submission[x-1][y-1] = this.grid[x][y].ship?.getCode() ?? 0;
            }
        }

        console.log(submission);

        console.log(this.game.submitBoard(submission));
        this.hideShipBar();
    }

    getRandomCell(board) {
        return board.grid[Math.ceil(Math.random() * board.grid.length)][Math.ceil(Math.random() * board.grid.length)];
    }

    inBounds(x, y) {
        return (x >= 1 && y >= 1 && x <= this.size && y <= this.size);
    }

    canDrop(x, y) {
        if (!this.inBounds(x, y)) {
            return false;
        }
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (this.inBounds(x + i, y + j)) {
                    if (!this.grid[x + i][y + j].isEmpty()) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    getShipById = (id) => {
        return this.ships[id];
    }

    checkSunkAllShips() {
        let sunkenShips = 0;
        this.ships.forEach(ship => {
            if (ship.sunk) {
                sunkenShips++;
            }
        });
        if (sunkenShips == this.ships.length) {
            this.setStatus('WINNER!');
        }
    }

    placeShip(ship, dragNr, x, y) {
        for (let i = 0 - dragNr; i < ship.length - dragNr; i++) {
            const cell = this.grid[(ship.rotated ? x + i : x)][(ship.rotated ? y : y + i)];
            cell.element.appendChild(ship.components[i + dragNr]);
            cell.ship = ship;
        }
        this.checkPlacedAllShips();
    }

    checkPlacedAllShips() {
        if (this.playerBoard) {
            this.nrOfPlacedShips++;
            if(this.nrOfPlacedShips >= 2){//}== this.ships.length){
                document.getElementById('submitShips').classList.remove('hidden');
            }
        }
    }

    endTurn() {
        console.log('ending turn');
        this.myTurn = false;
    }

    hideShipBar(){
        this.shipBar.classList.add('hidden');
    }

    hide(){
        this.container.classList.add('hidden');
    }

    show(){
        this.container.classList.remove('hidden');
    }
}