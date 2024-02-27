export class Cell {

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