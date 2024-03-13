import { Cell } from './Cell.js';
import { Ship } from './Ship.js';

export class Grid {
    
    gameAPI;
    size;
    container;
    gridElement;
    grid;
    ships;
    shipBar;
    playerBoard;
    game;
    setStatus;
    nrOfPlacedShips;
    label;

    constructor(gameAPI, size, playerBoard, game, setStatus) {
        this.gameAPI = gameAPI;
        this.size = size;
        this.playerBoard = playerBoard;
        this.game = game;
        this.setStatus = setStatus;
        this.container = document.createElement('div');
        this.container.classList.add('board');
        document.querySelector('.container').appendChild(this.container);
        this.gridElement = document.createElement('div');
        this.initialiseGrid();
        if (this.playerBoard) {
            this.initialiseShips();
            this.enable();
        }
        this.label = document.createElement('label');
        this.label.innerHTML = 'Board';
        this.container.appendChild(this.label);
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
        document.querySelector('.container').appendChild(this.shipBar);
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

    async myTurn(){
        return await (this.gameAPI.myTurn());
    }

    submitShips() {
        let submission = [];

        for (let x = 1; x <= this.size; x++) {
            submission[x - 1] = []
            for (let y = 1; y <= this.size; y++) {
                submission[x - 1][y - 1] = this.grid[x][y].ship?.getCode() ?? "0";
            }
        }
        this.game.submitBoard(submission);
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

    readBoard(board, name) {
        this.hideShipBar();
        console.log(board);
        for (let x = 1; x < board.length + 1; x++) {
            for (let y = 1; y < board[x - 1].length + 1; y++) {
                if (board[x-1][y-1] != 0) {

                    let component = document.createElement('div');
                    component.classList.add('cell');
                    component.classList.add('shipcell');
                    component.id = x + ',' + y;

                    this.grid[x][y].element.appendChild(component);
                }
            }
        }        
        if (this.playerBoard) {
            this.disable();
        }
        else{
            this.enable();
        }
        this.label.innerHTML = name;
    }

    enable(){
        this.container.classList.add('enabled');
    }
    disable(){        
        this.container.classList.remove('enabled');
    }

    readShots(shots){
        console.log(shots);
        shots.forEach(shot => {
            this.grid[parseInt(shot.y+1)][parseInt(shot.x+1)].readShot();
        });
    }

    checkPlacedAllShips() {
        if (this.playerBoard) {
            this.nrOfPlacedShips++;
            if (this.nrOfPlacedShips == this.ships.length) {
                document.getElementById('submitShips').classList.remove('hidden');
            }
        }
    }

    endTurn() {
        console.log('ending turn');
        this.myTurn = false;
    }

    hideShipBar() {
        this.shipBar?.classList.add('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }

    show() {
        this.container.classList.remove('hidden');
    }
}