const READY_MESSAGES = [
  "What are you waiting for? Let's play!",
  "Click the button to try your luck.",
  "Scared? Just click the button.",
];

const ROLLING_MESSAGES = [
  "Good luck! I hope you lose.",
  "They see me rolling... they hating...",
  "Rolling, rolling, rolling...",
  "Let's goooooo!",
];

const LOSE_MESSAGES = [
  "You lost! Better luck next time.",
  "Better luck next time.",
  "You lost! Try again?",
];

const WIN2_MESSAGES = [
  "You won $1000. Big deal!",
  "You won $1000. So what?",
  "You won $1000. Who cares?",
];

const WIN3_MESSAGES = [
  "You won $10000. Not bad!",
  "You won $10000. Good job!",
  "You won $10000. Nice!",
];

const WIN4_MESSAGES = [
  "You won $100000. Wow!",
  "You won $100000. Amazing!",
  "You won $100000. Incredible!",
];

const WIN5_MESSAGES = [
  "Jackpot! I'm surprised.",
  "Jackpot! Cheater!",
  "Jackpot! You're lucky.",
];

export class Guide {
  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.element = container.querySelector("#guide-message");
    this.animation = null;
  }

  /**
   * @param {string} type
   */
  update(type) {
    if (!this.element) {
      throw new Error("Guide message not found!");
    }
    this.element.textContent = "";

    if (this.animation) {
      clearInterval(this.animation);
    }

    let message = "Ummm... what?";
    switch (type) {
      case "Ready":
        message =
          READY_MESSAGES[Math.floor(Math.random() * READY_MESSAGES.length)];
        break;
      case "Rolling":
        message =
          ROLLING_MESSAGES[Math.floor(Math.random() * ROLLING_MESSAGES.length)];
        break;
      case "Lose":
        message =
          LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)];
        break;
      case "Win2":
        message =
          WIN2_MESSAGES[Math.floor(Math.random() * WIN2_MESSAGES.length)];
        break;
      case "Win3":
        message =
          WIN3_MESSAGES[Math.floor(Math.random() * WIN3_MESSAGES.length)];
        break;
      case "Win4":
        message =
          WIN4_MESSAGES[Math.floor(Math.random() * WIN4_MESSAGES.length)];
        break;
      case "Win5":
        message =
          WIN5_MESSAGES[Math.floor(Math.random() * WIN5_MESSAGES.length)];
        break;
      default:
        message = "Ummm... what?";
        break;
    }

    let index = 0;
    this.animation = setInterval(() => {
      this.element.textContent += message[index];
      index++;

      if (index >= message.length) {
        clearInterval(this.animation);
      }
    }, 25);
  }
}
