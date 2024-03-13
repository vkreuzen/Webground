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
  playerName;

  async runGame() {

    document.querySelector('.container').classList.add('hidden');

    this.makeList(document.querySelector('.games table'));

    this.myTurn = true;

    function setStatus(text) {
      status.innerHTML = text;
    }

    this.opponentGrid = new Grid(gameAPI, 10, false, this, setStatus);
    this.grid = new Grid(gameAPI, 10, true, this, setStatus);

    this.opponentGrid.hide();

    this.playerName = (new URLSearchParams(window.location.search)).get('name');
    document.getElementById('playername').value = this.playerName;

    let status = document.createElement('div');
    status.classList.add('status');

    document.querySelector('.container').appendChild(status);

    document.getElementById('newgame').addEventListener("click", e => {
      this.playerName = document.getElementById('playername').value;
      gameAPI.playerName = this.playerName;
      gameAPI.submitAIGame(false).then(e => this.reload());
    });
    document.getElementById('newAIgame').addEventListener("click", e => {
      this.playerName = document.getElementById('playername').value;
      gameAPI.playerName = this.playerName;
      gameAPI.submitAIGame(true).then(e => this.reload());
    });
  }

  reload(){
    window.location.replace('//' + location.host + location.pathname+"?name="+this.playerName);
  }

  async switchToGame(id, player1, player2) {

    gameAPI.gameId = id;
    if (this.playerName == player1) {
      gameAPI.playerName = player1;
    }
    else if (this.playerName == player2) {
      gameAPI.playerName = player2;
    }

    this.openGame();
    
  }

  async openGame(){

    if (gameAPI.playerName != null) {

      let spel = await (await (gameAPI.getGame()));
      if (spel.state == 'playing') {
        this.grid.readBoard(await (await (gameAPI.getBoard(this.playerName == spel.player1 ? spel.player1 : spel.player2))),this.playerName);
        this.grid.readShots(this.playerName == spel.player1 ? spel.player2Shots : spel.player1Shots);
        const interval = setInterval(() => this.checkChangedState(),1000);

        this.opponentGrid.readBoard(await (await (gameAPI.getBoard(this.playerName == spel.player1 ? spel.player2 : spel.player1))),this.playerName == spel.player1 ? spel.player2 : spel.player1);
        this.opponentGrid.readShots(this.playerName == spel.player1 ? spel.player1Shots : spel.player2Shots);
        this.opponentGrid.show();
      }
      if(spel.state == 'finished'){
        this.endGame();
      }

      document.querySelector('.container').classList.remove('hidden');
      document.querySelector('.games').classList.add('hidden');
    }
  }

  async checkChangedState(){
    let spel = await (await (gameAPI.getGame()));
    this.grid.readShots(this.playerName == spel.player1 ? spel.player2Shots : spel.player1Shots);
    if(spel.state == 'finished'){
      this.endGame();
    }
    document.getElementById('currentPlayer').innerHTML = spel.currentPlayer;
  }

  async joinGame(id, player1, player2) {
    gameAPI.gameId = id;
    gameAPI.playerName = player1;
    await ( await (gameAPI.joinGame(player2)));
    this.switchToGame(id, player1, player2);
  }

  async submitBoard(submission){
    this.gameAPI.submitBoard(submission);
  }

  async endGame(){    
    let spel = await (await (gameAPI.getGame()));
    this.grid.readBoard(await (await (gameAPI.getBoard(this.playerName == spel.player1 ? spel.player1 : spel.player2))),this.playerName);
    this.grid.readShots(this.playerName == spel.player1 ? spel.player2Shots : spel.player1Shots);

    this.opponentGrid.readBoard(await (await (gameAPI.getBoard(this.playerName == spel.player1 ? spel.player2 : spel.player1))),this.playerName == spel.player1 ? spel.player2 : spel.player1);
    this.opponentGrid.readShots(this.playerName == spel.player1 ? spel.player1Shots : spel.player2Shots);
    this.opponentGrid.show();
    this.opponentGrid.disable();
    document.getElementById('currentPlayer').innerHTML = 'END OF GAME';
  }

  async deleteGame(id) {

    gameAPI.gameId = id;
    let result = await (await (gameAPI.deleteGame()));
    console.log(result);
    this.reload();
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

      let play = document.createElement('button');
      play.innerText = 'play';
      play.addEventListener("click", e => {
        console.log(spel);
        this.switchToGame(spel.id, spel.player1, spel.player2);
      });
      let join = document.createElement('button');
      join.innerText = 'join';
      join.addEventListener("click", e => {
        console.log(spel);
        this.joinGame(spel.id, spel.player1, 'BOB');
      });
      let del = document.createElement('button');
      del.innerText = 'delete';
      del.addEventListener("click", e => {
        console.log(spel);
        this.deleteGame(spel.id);
      });

      td = document.createElement('td');
      td.appendChild(play);
      td.appendChild(join);
      td.appendChild(del);
      row.appendChild(td);

      container.appendChild(row);
    });
  }
}