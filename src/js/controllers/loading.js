export default class LoadingController {
  constructor() {
    this.element_ = document.getElementById('loading');
    this.activeClass_ = 'loading--active';
  }

  show() {
    this.element_.classList.add(this.activeClass_);
  }

  hide() {
    this.element_.classList.remove(this.activeClass_);
  }
}
