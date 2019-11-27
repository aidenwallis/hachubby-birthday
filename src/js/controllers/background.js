export default class BackgroundController {
  constructor() {
    this.element_ = document.getElementById('background');
    this.activeClass_ = 'background--loaded';
  }

  show(url) {
    this.element_.style.backgroundImage = `url(${url})`;
    this.element_.classList.add(this.activeClass_);
  }
}
