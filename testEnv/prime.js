import {Grid} from './Grid.js';

window.onload = (event) => {
  console.log("page is fully loaded");

  let myTurn = true;

  function setStatus(text){
    status.innerHTML = text;
  }
  
  let grid = new Grid(10, true, e => {return myTurn}, setStatus);

  let opponentGrid = new Grid(10, false, e => {return myTurn}, setStatus);

  let status = document.createElement('div');
  status.classList.add('status');

  document.querySelector('.container').appendChild(status);

}