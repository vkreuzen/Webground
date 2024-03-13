export class GameAPI {
    host = "https://avans-webdev-zeeslag.azurewebsites.net";
    gameId;
    playerName;

    async submitAIGame(ai) {
        return await (await this.send_post(`${this.host}/game`, {
            player1: this.playerName,
            opponentIsAI: ai
        })).json();
    }

    async getAllGames() {
        return await (await fetch(`${this.host}/game`)).json();
    }

    async getGame() {
        return await (await fetch(`${this.host}/game/${this.gameId}`)).json();
    }

    async myTurn(){
        return (await (await fetch(`${this.host}/game/${this.gameId}`)).json()).currentPlayer == this.playerName;
    }

    async deleteGame() {
        return await (await this.send_delete(`${this.host}/game/${this.gameId}`)).json();
    }

    async joinGame(playerName) {        
        return await (await this.send_post(`${this.host}/game/${this.gameId}/players`, {"player2": playerName})).json();
    }

    async getBoard(playerName) {
        return await (await fetch(`${this.host}/game/${this.gameId}/board/${playerName}`)).json();
    }

    async submitBoard(board) {
        return await (await this.send_post(`${this.host}/game/${this.gameId}/board/${this.playerName}`, { "board": board })).json();
    }

    async shoot(x, y) {
        return await (await this.send_post(`${this.host}/game/${this.gameId}/player/${this.playerName}/shot`, {
            "x": y,
            "y": x
        })).json();
    }
    
    async send_post(url, body) {
        return fetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    }
    async send_delete(url) {
        return fetch(url, { method: "DELETE", headers: { "Content-Type": "application/json" } });
    }
}