export class Ship {
  components;
  length;
  element;
  name;
  rotated;
  id

  constructor(id, name, length) {
    this.id = id;
    this.rotated = false;
    this.name = name;
    this.length = length;
    this.element = document.createElement('div');
    this.components = [];
    for (let i = 0; i < this.length; i++) {
      let component = document.createElement('div');
      component.classList.add('cell');
      if (i == 0) {
        component.classList.add('left');
      }
      if (i == this.length-1) {
        component.classList.add('right');
      }
      this.components[i] = component;
      this.element.appendChild(component);
    }
    this.element.id = this.id;
    this.element.classList.add('ship');
    this.element.style.width = (length * 50 - 6) + 'px';
    // this.element.innerHTML = name;
    this.element.draggable = true;

    this.element.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.id);
      console.log(e.explicitOriginalTarget);
    });
    this.element.addEventListener("contextmenu", e => this.rotate(e));
  }

  rotate (e){
      e.preventDefault();
      if (!this.rotated) {
        this.element.classList.add('rotated');
      }
      else {
        this.element.classList.remove('rotated');
      }
      this.rotated = !this.rotated;
  }

  // :(
  removeEventListener(){
    this.element.removeEventListener("contextmenu", this.rotate);
  }


}