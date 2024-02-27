import { Cell } from './Cell.js';
import { Ship } from './Ship.js';

export class Grid {
    size;
    container;
    gridElement;
    grid;

    constructor(size) {
        this.size = size;
        this.container = document.querySelector('.container');
        this.gridElement = document.createElement('div');
        this.initialiseGrid();
        this.initialiseShips();
    }

    initialiseGrid() {
        this.gridElement.classList.add('grid');
        this.gridElement.style.gridTemplateColumns = `repeat(${this.size}, var(--cell-size))`;
        this.grid = [];

        //fill the grid with 100 cells
        for (let x = 1; x <= this.size; x++) {
            this.grid[x] = [];
            for (let y = 1; y <= this.size; y++) {
                let cell = new Cell(x, y);

                this.grid[x][y] = cell;

                this.gridElement.appendChild(cell.element);
            }

        }
        this.container.appendChild(this.gridElement);
    }

    initialiseShips() {
        const shipBar = document.createElement('div');
        shipBar.classList.add('shipbar');
        const text = document.createElement('div');
        text.classList.add('text');
        text.innerHTML = 'Ship Bar'
        shipBar.appendChild(text);

        let patrouille = new Ship('patrouilleschip', 2);
        shipBar.appendChild(patrouille.element);
        let duikboot = new Ship('duikboot', 3);
        shipBar.appendChild(duikboot.element);
        let torpedo = new Ship('torpedojager', 3);
        shipBar.appendChild(torpedo.element);
        let slagschip = new Ship('slagschip', 4);
        shipBar.appendChild(slagschip.element);
        let vliegdekschip = new Ship('vliegdekschip', 5);
        shipBar.appendChild(vliegdekschip.element);

        this.container.append(shipBar);

    }

    getRandomCell(board) {
        return board.grid[Math.ceil(Math.random() * board.grid.length)][Math.ceil(Math.random() * board.grid.length)];
    }
}