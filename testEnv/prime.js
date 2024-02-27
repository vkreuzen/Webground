import {Grid} from './Grid.js';

window.onload = (event) => {
  console.log("page is fully loaded");

  let grid = new Grid(10);

  console.log(grid.getRandomCell(grid));
}