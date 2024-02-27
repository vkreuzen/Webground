export class Ship {
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