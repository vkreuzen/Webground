export class Cell {

  x;
  y;
  shot;
  element;
  board;

  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.shot = false;
    this.board = board;

    this.element = document.createElement('div');
    this.element.classList.add('cell');

    this.element.onclick = e => {
      this.shoot();
    };

    this.element.addEventListener("dragover", e => {
      e.preventDefault();
    });
    this.element.addEventListener("drop", e => {
      e.preventDefault();
      let data = e.dataTransfer.getData("text");
      console.log(this.canDrop(board.getShipById(data), 2));
      e.target.appendChild(document.getElementById(data));
      board.getShipById(data).removeEventListener();
    });
  }

  shoot() {
    if (!this.shot) {
      this.shot = true;
      // this.element.innerHTML = `${this.x},${this.y}`;
      this.element.innerHTML = `&#10060;`;
    }
  }

  // VERTICAL!
  //cell is where dragged ship has been dropped, dragnr is the nr of the cell of the ship selected for dragging
  canDrop(ship, dragNr) {
    console.log(ship);
    //verify left side
    for (let i = 1; i < dragNr; i++) {
      console.log(i+': '+(this.x - i) + ', '+ this.y);
      if (!this.board.inBounds(this.x - i, this.y)) {
        return false;
      }
    }
    //no need to verify dragNr

    //verify right side
    for (let i = 1; i <= ship.length-dragNr; i++) {
      console.log(i+': '+(this.x + i) + ', '+ this.y);
      if (!this.board.inBounds(this.x + i, this.y)) {
        return false;
      }
    }
    return true;
  }

}