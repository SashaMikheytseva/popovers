export default class Popover {
  constructor() {
    this.container = document.querySelector('.container');
    this.button = this.container.querySelector('.btn');
    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.button.addEventListener('click', this.onClick);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["createPop"] }] */

  createPop(title, text) {
    const pop = document.createElement('div');
    pop.classList.add('pop');

    const popTitle = document.createElement('div');
    popTitle.classList.add('pop-title');

    const popText = document.createElement('div');
    popText.classList.add('pop-text');

    const arrow = document.createElement('div');
    arrow.classList.add('arrow');

    popTitle.textContent = title;
    popText.textContent = text;

    pop.append(popTitle);
    pop.append(popText);

    return pop;
  }

  onClick(e) {
    e.preventDefault();

    if (document.querySelector('.pop')) {
      document.querySelector('.pop').remove();
    } else {
      this.popover = this.createPop('Popover title', 'And here\'s some amazing content. It\'s very engaging. Right?');
      document.body.appendChild(this.popover);
      const { top, left } = this.button.getBoundingClientRect();
      this.popover.style.top = `${top - this.popover.offsetHeight - 10}px`;
      this.popover.style.left = `${left + this.button.offsetWidth / 2 - this.popover.offsetWidth / 2}px`;
    }
  }
}
