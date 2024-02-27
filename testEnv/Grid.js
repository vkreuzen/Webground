import { Cell } from './Cell.js';
import { Ship } from './Ship.js';

export class Grid {
    size;
    container;
    gridElement;
    grid;
    ships;

    constructor(size) {
        this.size = size;
        this.container = document.querySelector('.container');
        this.gridElement = document.createElement('div');
        this.initialiseGrid();
        this.initialiseShips();
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
        const shipBar = document.createElement('div');
        shipBar.classList.add('shipbar');
        const text = document.createElement('div');
        text.classList.add('text');
        text.innerHTML = 'Ship Bar'
        shipBar.appendChild(text);

        let patrouille = new Ship(0,'patrouilleschip', 2);
        this.ships.push(patrouille);
        shipBar.appendChild(patrouille.element);
        let duikboot = new Ship(1,'duikboot', 3);
        this.ships.push(duikboot);
        shipBar.appendChild(duikboot.element);
        let torpedo = new Ship(2,'torpedojager', 3);
        this.ships.push(torpedo);
        shipBar.appendChild(torpedo.element);
        let slagschip = new Ship(3,'slagschip', 4);
        this.ships.push(slagschip);
        shipBar.appendChild(slagschip.element);
        let vliegdekschip = new Ship(4,'vliegdekschip', 5);
        this.ships.push(vliegdekschip);
        shipBar.appendChild(vliegdekschip.element);

        this.container.append(shipBar);

    }

    getRandomCell(board) {
        return board.grid[Math.ceil(Math.random() * board.grid.length)][Math.ceil(Math.random() * board.grid.length)];
    }

    inBounds(x, y) {
        return (x >= 1 && y >= 1 && x <= this.size && y <= this.size);
    }

    getShipById = (id) => {
        return this.ships[id];
    }
}