import { Box } from "./box";

export class Board {
  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.board = container.querySelector(".game-board");
    if (this.board) {
      this.boxes = [];
      for (let i = 0; i < 5; i++) {
        const box = new Box(this.board);
        this.boxes.push(box);
      }
    } else {
      throw new Error("Board container not found!");
    }
  }

  play() {
    const guess = [];
    this.boxes.forEach((box) => {
      const number = box.roll();
      guess.push(number);
    });

    return guess;
  }

  update(index, isCorrect) {
    this.boxes[index].update(index, isCorrect);
  }
}
