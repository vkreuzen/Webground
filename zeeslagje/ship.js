export class Ship {
  components;
  shots;
  hits;
  length;
  element;
  name;
  rotated;
  id
  sunk;

  constructor(id, name, length) {
    this.id = id;
    this.rotated = false;
    this.name = name;
    this.length = length;
    this.element = document.createElement('div');
    this.components = [];
    this.shots = [];
    this.hits = 0;
    this.sunk = false;
    for (let i = 0; i < this.length; i++) {
      let component = document.createElement('div');
      component.classList.add('cell');
      component.classList.add('shipcell');
      if (i == 0) {
        component.classList.add('left');
      }
      if (i == this.length-1) {
        component.classList.add('right');
      }
      component.id = this.id+'-'+(i+1);
      this.components[i] = component;
      this.shots[i] = false;
      this.element.appendChild(component);
    }
    this.element.id = this.id;
    this.element.classList.add('ship');
    this.element.style.width = (length * 50 - 6) + 'px';
    // this.element.innerHTML = name;
    this.element.draggable = true;

    this.element.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.setData("originalTarget", e.explicitOriginalTarget.id);
    });
    this.element.addEventListener("contextmenu", e => this.rotate(e));
  }

  shoot(dragNr){
    if(!this.shots[dragNr]){
      this.shots[dragNr] = true;
      this.hits++;
    }
    if(this.hits == this.length){
      this.sunk = true;
    }
  }

  rotate (e){
      e.preventDefault();
      if (!this.rotated) {
        this.element.classList.add('rotated');
        for (let i = 0; i < this.length; i++) {
          this.components[i].classList.add('rotated');
        }
      }
      else {
        this.element.classList.remove('rotated');
        for (let i = 0; i < this.length; i++) {
          this.components[i].classList.remove('rotated');
        }
      }
      this.rotated = !this.rotated;
  }

  resetShip(){
    this.components.forEach(component => {      
      this.element.appendChild(component);
    });
    if(this.rotated){
      this.element.classList.remove('rotated');
        for (let i = 0; i < this.length; i++) {
          this.components[i].classList.remove('rotated');
        }
        this.rotated = false;
    }
  }

  getCode(){
    return this.name.charAt(0);
  }
}