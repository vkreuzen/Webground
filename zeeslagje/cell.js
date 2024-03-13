export class Cell {

  x;
  y;
  shot;
  element;
  board;
  ship;

  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.shot = false;
    this.board = board;
    this.ship = null;

    this.element = document.createElement('div');
    this.element.classList.add('cell');

    if (!this.board.playerBoard) {
      this.element.onclick = e => {
          this.shoot();
      };
    }
    else {
      this.element.addEventListener("dragover", e => {
        e.preventDefault();
      });
      this.element.addEventListener("drop", e => {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        let component = e.dataTransfer.getData("originalTarget");

        this.drop(this.board.getShipById(data), Number(component.charAt(component.length - 1)) - 1);
      });
    }
  }

  readShot() {
    this.shot = true;
    let shot = this.element.querySelector('.shot');
    if(!shot){
      shot = document.createElement('div');
      shot.classList.add('shot');
      if(this.isEmpty()){
        shot.innerHTML = `&#x1F5F8;`;
      }
      else{
        shot.innerHTML = `&#10060;`;
      }
      this.element.appendChild(shot);
    }
  }

  async shoot() {
    if (await (this.board.myTurn()) && !this.shot) {
      this.shot = true;
      const shot = document.createElement('div');
      shot.classList.add('shot');
      this.element.appendChild(shot);

      if (!this.isEmpty) {
        const id = this.element.children[0].id;
        const shipId = Number(id.substring(0, id.length - 2));
        const dragNr = Number(id.substring(id.indexOf('-'), id.length));
        this.board.getShipById(shipId).shoot(dragNr);
        this.board.checkSunkAllShips();
      }

      let result = this.board.gameAPI.shoot(this.x - 1, this.y - 1);      
      if((await result).hit){
        shot.innerHTML = `&#10060;`;
      }
      else{
        shot.innerHTML = `&#x1F5F8;`;
      }

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

  isEmpty() {
    return (this.ship == null) && !this.element.querySelector('.shipcell');;
  }

}