import { Grid } from './Grid.js';
import { GameAPI } from './GameAPI.js';

let gameAPI = new GameAPI();

window.onload = (event) => {

  let game = new Game();

  game.runGame();

}

class Game {

  myTurn;
  grid;
  opponentGrid;

  async runGame() {

    document.querySelector('.container').classList.add('hidden');

    this.makeList(document.querySelector('.games table'));

    this.myTurn = true;

    function setStatus(text) {
      status.innerHTML = text;
    }

    this.grid = new Grid(gameAPI, 10, true, e => { return this.myTurn }, setStatus);

    this.opponentGrid = new Grid(gameAPI, 10, false, e => { return this.myTurn }, setStatus);
    // opponentGrid.hide();

    let status = document.createElement('div');
    status.classList.add('status');

    document.querySelector('.container').appendChild(status);

    document.getElementById('newgame').addEventListener("click", e => {
      gameAPI.playerName = document.getElementById('playername').value;
      gameAPI.submitAIGame();
    });
  }

  async switchToGame(id, player1, player2) {

    gameAPI.gameId = id;
    gameAPI.playerName = player1;

    let spel = await (await (gameAPI.getGame()));
    if (spel.state == 'playing') {
      let board = await (await (gameAPI.getBoard(player1)));
      this.grid.readBoard(board);
      this.grid.readShots(spel.player2Shots);

      board = await (await (gameAPI.getBoard(player2)));
      this.opponentGrid.readBoard(board);
      this.opponentGrid.readShots(spel.player1Shots);
    }

    document.querySelector('.container').classList.remove('hidden');
    document.querySelector('.games').classList.add('hidden');
  }

  async makeList(container) {

    let games = await (await (gameAPI.getAllGames()));

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
        this.switchToGame(spel.id, spel.player1, spel.player2);
      });

      td = document.createElement('td');
      td.appendChild(button);
      row.appendChild(td);

      container.appendChild(row);
    });
  }
}