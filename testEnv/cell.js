export class Cell {

  x;
  y;
  shot;
  element;
  board;
  empty;

  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.shot = false;
    this.board = board;
    this.empty = true;

    this.element = document.createElement('div');
    this.element.classList.add('cell');

    if (!this.board.playerBoard) {
      this.element.onclick = e => {
        if (this.board.myTurn) {
          this.shoot();
        }
      };
    }
    else {
      this.element.addEventListener("dragover", e => {
        if (this.board.myTurn) {
          e.preventDefault();
        }
      });
      this.element.addEventListener("drop", e => {
        if (this.board.myTurn) {
          e.preventDefault();
          let data = e.dataTransfer.getData("text");
          let component = e.dataTransfer.getData("originalTarget");

          this.drop(this.board.getShipById(data), Number(component.charAt(component.length - 1)) - 1);
        }
      });
    }
  }

  shoot() {
    if (!this.shot) {
      this.shot = true;
      const shot = document.createElement('div');
      shot.classList.add('shot');
      shot.innerHTML = `&#10060;`;
      this.element.appendChild(shot);

      if (!this.empty) {
        const id = this.element.children[0].id;
        const shipId = Number(id.substring(0,id.length-2));
        const dragNr = Number(id.substring(id.indexOf('-'),id.length));
        this.board.getShipById(shipId).shoot(dragNr);
        this.board.checkSunkAllShips();
      }

      console.log('shooting');

      this.board.endTurn();

    }
  }

  //dragnr is the seqnr of the cell of the ship selected for dragging
  canDrop(ship, dragNr) {
    for (let i = 0 - dragNr; i < ship.length - dragNr; i++) {
      if (!this.board.canDrop((ship.rotated ? this.x + i : this.x), (ship.rotated ? this.y : this.y + i))) {
        return false;
      }
    }
    return true;
  }

  drop(ship, dragNr) {
    if (!this.canDrop(ship, dragNr)) {
      return;
    }
    this.board.placeShip(ship, dragNr, this.x, this.y);
  }

}