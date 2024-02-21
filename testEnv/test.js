


window.onload = (event) => {
  console.log("page is fully loaded");

  //fill the grid with 100 cells
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      let cell = new Cell(x,y);

      cell.element.onclick = e => {
        cell.shoot();
        console.log('shot');
      };

      document.getElementById('grid').appendChild(cell.element);
    }
  }

};


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
  }

  shoot() {
    if (!this.shot) {
      this.shot = true;
      // this.element.innerHTML = `${this.x},${this.y}`;
      this.element.innerHTML = `&#10060;`;      
    }
  }
}