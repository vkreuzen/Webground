


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

class Ship {
  positions;
  length;
  element;
  name;

  constructor(name, length){
    this.name = name;
    this.length = length;
    this.element = document.createElement('div');
    this.element.id = name;
    this.element.classList.add('ship');
    this.element.style.width = (length * 50 - 6)+'px';
    this.element.innerHTML = name;
    this.element.draggable = true;

    this.element.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.id);
    });
    this.element.addEventListener("contextmenu", e => {
      e.preventDefault();
      if(!this.element.classList.contains('rotated')){
        this.element.classList.add('rotated');
      }
      else{
        this.element.classList.remove('rotated');
      }
    });
  }


}

class Cell {

  x;
  y;
  shot;
  element;

  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.shot = false;

    this.element = document.createElement('div');
    this.element.classList.add('cell');

    this.element.onclick = e => {
      this.shoot();
      console.log('shot');
    };

    this.element.addEventListener("dragover", e => {
      e.preventDefault();
    });
    this.element.addEventListener("drop", e => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    });
  }

  shoot() {
    if (!this.shot) {
      this.shot = true;
      // this.element.innerHTML = `${this.x},${this.y}`;
      this.element.innerHTML = `&#10060;`;      
    }
  }
}