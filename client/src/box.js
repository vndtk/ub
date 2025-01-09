export class Box {
  /**
   *
   * @param {HTMLDivElement} board
   * @param {number[]} numbers
   */
  constructor(board) {
    if (!board) {
      throw new Error("Board container not found!");
    }

    const numbers = new Array(70).fill(1).map((_, i) => i + 1);
    const box = document.createElement("div");
    box.className = "board-box";

    const list = document.createElement("div");
    list.className = "board-box-list";

    numbers.forEach((number) => {
      const box = document.createElement("div");
      box.className = "board-box-number";
      box.textContent = number;
      list.appendChild(box);
    });

    box.appendChild(list);
    board.appendChild(box);

    this.list = list;
    this.box = box;
    this.updateTimeout = null;
  }

  /**
   *
   * @returns {number}
   */
  roll() {
    this.reset();

    /**
     * this ensures the correct transform position based on number height
     * @type {HTMLDivElement} e
     */
    const e = this.list.firstChild;
    const h = e.getBoundingClientRect().height;

    /**
     * @todo figure out why I wrote the calculation in this way
     * I wrote the following code a couple of days ago
     * forgot why it works this way, and not any other way
     */
    const random = Math.floor(Math.random() * 70) + 1;
    const position = (random - 1) * h;
    this.list.style.setProperty("--y", `-${position}px`);

    return random;
  }

  update(index, isCorrect) {
    this.reset();

    this.updateTimeout = setTimeout(() => {
      console.log(`Box ${index} is ${isCorrect ? "correct" : "wrong"}`);
      if (isCorrect) {
        this.box.classList.add("correct");
      } else {
        this.box.classList.add("wrong");
      }
    }, 500 + index * 100);
  }

  reset() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    this.box.classList.remove("correct", "wrong");
  }
}
