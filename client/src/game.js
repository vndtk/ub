import { Guide } from "./guide";
import { Board } from "./board";
import { UI } from "./ui";

export class Game {
  constructor(container) {
    if (container) {
      this.guide = new Guide(container);
      this.board = new Board(container);
      this.ui = new UI(container);

      this.socket = new WebSocket("ws://localhost:8080");
      this.socket.onopen = () => {
        this.register();
      };

      this.socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        console.log(parsed);

        switch (parsed.action) {
          case "register":
            this.ui.update(parsed.data.bank, parsed.data.plays);
            break;
          default:
        }
      };

      container.querySelector("#play-button").addEventListener("click", () => {
        this.play();
      });

      this.state = "Ready";
      this.rollingTimeout = null;
      this.guide.update(this.state);
    } else {
      throw new Error("Game container not found!");
    }
  }

  register() {
    const id = localStorage.getItem("id") || crypto.randomUUID();
    localStorage.setItem("id", id);

    this.socket.send(JSON.stringify({ action: "register", id }));
  }

  play() {
    if (this.state === "Rolling" || this.rollingTimeout !== null) {
      return;
    }

    this.state = "Rolling";
    this.guide.update(this.state);
    this.guess = this.board.play();

    this.rollingTimeout = setTimeout(() => {
      this.check();
      this.guide.update(this.state);
      console.log(this.state);
      clearTimeout(this.rollingTimeout);
      this.rollingTimeout = null;
    }, 3000); // animation takes 3 seconds
  }

  check() {
    let correctGuesses = 0;
    this.guess.forEach((guess, index) => {
      if (guess === this.combination[index]) {
        correctGuesses++;

        this.board.update(index, true);
      } else {
        this.board.update(index, false);
      }
    });

    switch (correctGuesses) {
      case 5:
        this.state = "Win5";
        break;
      case 4:
        this.state = "Win4";
        break;
      case 3:
        this.state = "Win3";
        break;
      case 2:
        this.state = "Win2";
        break;
      default:
        this.state = "Lose";
        break;
    }
  }
}
