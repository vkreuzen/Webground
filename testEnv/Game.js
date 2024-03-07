export class Game {
    host = "https://avans-webdev-zeeslag.azurewebsites.net";
    gameId;
    playerName;

    async submitAIGame() {
        return await (await this.send_post(`${this.host}/game`, {
            player1: this.playerName,
            opponentIsAI: true
        })).json();
    }

    async getAllGames() {
        return await (await fetch(`${this.host}/game`)).json();
    }

    async getGame() {
        return await (await fetch(`${this.host}/game/${this.gameId}`)).json();
    }

    async getBoard(playerName) {
        return await (await fetch(`${this.host}/game/${this.gameId}/board/${playerName}`)).json();
    }

    async submitBoard(board) {
        console.log(`${this.host}/game/${this.gameId}/board/${this.playerName}}`);
        return await (await this.send_post(`${this.host}/game/${this.gameId}/board/${this.playerName}}`, { "board": board })).json();
    }

    async shoot(x, y) {
        return await (await this.send_post(`${this.host}/game/${this.gameId}/player/${this.playerName}}/shot`, {
            "x": x,
            "y": y
        })).json();
    }


    async barrageAllFields() {


        //Step 5 - Shoot all the squares till we win, starting at 1, 1
        let counter = 0;
        for (let x = 1; x < 10; x++) {
            for (let y = 1; y < 10; y++) {
                response = await send_post(`${host}/game/${gameId}/player/linksonder/shot`, { x, y })
                let shoot_result = await response.json();
                counter++;
                if (shoot_result.winner) {
                    console.log("We won!");
                    x = 10; y = 10; //to finish game
                }
            }
        }
    }
    
    async send_post(url, body) {
        return fetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    }
}