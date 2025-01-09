export class UI {
  constructor(container) {
    this.bank = container.querySelector("#bank");
    this.plays = container.querySelector("#plays");
  }

  update(bank = null, plays = null) {
    if (bank) {
      this.bank.textContent = `$${bank}`;
    }

    if (plays) {
      this.plays.textContent = `${plays}`;
    }
  }
}
