import {Cell} from './Cell.js';
import {Ship} from './Ship.js';


window.onload = (event) => {
  console.log("page is fully loaded");

  const grid = [];

  //fill the grid with 100 cells
  for (let x = 1; x <= 10; x++) {
    grid[x] = [];
    for (let y = 1; y <= 10; y++) {
      let cell = new Cell(x,y);

      grid[x][y] = cell;

      document.getElementById('grid').appendChild(cell.element);
    }
  }

  let patrouille = new Ship('patrouilleschip',2);
  document.querySelector('.shipbar').appendChild(patrouille.element); 
  let duikboot = new Ship('duikboot',3);
  document.querySelector('.shipbar').appendChild(duikboot.element);
  let torpedo = new Ship('torpedojager',3);
  document.querySelector('.shipbar').appendChild(torpedo.element);
  let slagschip = new Ship('slagschip',4);
  document.querySelector('.shipbar').appendChild(slagschip.element);
  let vliegdekschip = new Ship('vliegdekschip',5);
  document.querySelector('.shipbar').appendChild(vliegdekschip.element);

  console.log(getRandomCell(grid));

};

function getRandomCell(grid){
  return grid[Math.ceil(Math.random() * grid.length)][Math.ceil(Math.random() * grid.length)];
}