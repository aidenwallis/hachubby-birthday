const ICONS = {
  left: require('../../images/arrow-circle-left-solid.svg'),
  right: require('../../images/arrow-circle-right-solid.svg'),
};

const KEY_CODES = {
  back: new Set([
    37, // Left arrow key
    33, // Page up
  ]),
  next: new Set([
    39, // Right arrow
    34, // Page down
  ])
};

export default class ControlController {
  constructor(appElement, cardController) {
    this.appElement_ = appElement;
    this.cardController_ = cardController;

    this.wrapperElement_ = document.createElement('div');
    this.wrapperElement_.className = 'footer';

    this.pageElement_ = document.createElement('p');
    this.pageElement_.className = 'pagination';
    this.wrapperElement_.appendChild(this.pageElement_);

    this.containerElement_ = document.createElement('div');
    this.containerElement_.className = 'controls flex justify--center';
    this.wrapperElement_.appendChild(this.containerElement_);
  }

  mount() {
    for (let i = 0; i < 2; ++i) {
      const control = document.createElement('button');
      const direction = i === 0 ? 'left' : 'right';
      control.className = `control control--${direction}`;

      const image = document.createElement('img');
      image.className = 'control__icon';
      image.src = ICONS[direction];
      control.appendChild(image);

      control.onclick = i === 0 ? () => this.back_() : () => this.next_();

      this.containerElement_.appendChild(control);
    }

    this.appElement_.appendChild(this.wrapperElement_);
    this.setPage([0]);
  }

  registerKeys() {
    document.addEventListener('keydown', (e) => {
      if (KEY_CODES.back.has(e.keyCode)) {
        e.preventDefault();
        this.back_();
      }
      if (KEY_CODES.next.has(e.keyCode)) {
        e.preventDefault();
        this.next_();
      }
    });
  }

  back_() {
    this.cardController_.navigateBack((page) => this.setPage(page));
  }

  next_() {
    this.cardController_.navigateNext((page) => this.setPage(page));
  }

  setPage(pages = [0]) {
    this.pageElement_.textContent = `Page ${pages.join('-')}`;
  }
}
