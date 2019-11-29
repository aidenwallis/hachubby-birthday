import credits from '../names';

export default class CreditsPage {
  constructor() {
    this.element_ = document.createElement('div');
    this.element_.className = 'page--credits credits';
  }

  build() {
    this.element_.appendChild(this.buildHeader_());
    this.element_.appendChild(this.buildCredits_());

    return this.element_;
  }

  buildHeader_() {
    const element = document.createElement('div');
    element.className = 'credits__header';

    const image = document.createElement('img');
    image.src = require('../../images/hachuL.png');
    image.draggable = false;
    image.className = 'credits__header__image';
    element.appendChild(image);

    const wrapper = document.createElement('div');
    wrapper.className = 'credits__header__content';

    const title = document.createElement('h2');
    title.textContent = 'Happy Birthday HAchubby!';
    title.className = 'credits__header__title';
    wrapper.appendChild(title);

    const subtitle = document.createElement('h4');
    subtitle.className = 'credits__header__subtitle';
    subtitle.textContent = 'Thank you everyone who participated!';
    wrapper.appendChild(subtitle);

    element.appendChild(wrapper);

    return element;
  }

  buildCredits_() {
    const element = document.createElement('div');
    element.className = 'credits__container';

    const list = document.createElement('ul');
    list.className = 'credits__list';

    for (let i = 0; i < credits.length; ++i) {
      const item = document.createElement('li');
      item.className = 'credits__list__item';
      item.textContent = credits[i];
      list.appendChild(item);
    }

    element.appendChild(list);
    return element;
  }
}
