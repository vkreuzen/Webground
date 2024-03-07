import { Grid } from './Grid.js';
import { Game } from './Game.js';

let game = new Game();

window.onload = (event) => {

  document.getElementById('newgame').addEventListener("click", e =>{
    game.playerName = document.getElementById('playername').value;
    game.submitAIGame();
  });

  runGame();

}

async function runGame() {

  document.querySelector('.container').classList.add('hidden');

  makeList(document.querySelector('.games table'));


  let myTurn = true;

  function setStatus(text) {
    status.innerHTML = text;
  }

  let grid = new Grid(game, 10, true, e => { return myTurn }, setStatus);

  let opponentGrid = new Grid(game, 10, false, e => { return myTurn }, setStatus);
  // opponentGrid.hide();

  let status = document.createElement('div');
  status.classList.add('status');

  document.querySelector('.container').appendChild(status);
}

async function switchToGame(id, player1, player2){

  game.gameId = id;
  game.playerName = player1;
  console.log(id);
  console.log(player1);

  let spel = await (await (game.getGame()));
  if(spel.state == 'playing'){
    let board = await ( await (game.getBoard(player2)));
    console.log(board);
  }

  document.querySelector('.container').classList.remove('hidden');
  document.querySelector('.games').classList.add('hidden');
}


async function makeList(container) {

  let games = await (await (game.getAllGames()));

  let i = 1;
  games.forEach(spel => {
    let row = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = spel.player1;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = spel.player2;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = spel.id;
    row.appendChild(td);

    let button = document.createElement('button');
    button.innerText = 'play';
    button.addEventListener("click", e => {
      console.log(spel);
      switchToGame(spel.id,spel.player1,spel.player2);
    });
    
    td = document.createElement('td');
    td.appendChild(button);
    row.appendChild(td);

    container.appendChild(row);
  });
}