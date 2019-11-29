import { FRONT_IMAGE } from '../constants';
import CreditsPage from '../pages/credits';

const PAGE_TYPE = {
  image: 'image',
  credits: 'credits',
};

export default class CardController {
  constructor(appElement, pageCount) {
    this.appElement_ = appElement;
    this.pageCount_ = pageCount;
    this.pages_ = [];

    this.cardElement_ = document.createElement('div');
    this.cardElement_.className = 'card';

    this.currentIndex_ = 0;
    this.flippedClass_ = 'page--flipped';
    this.currentLayer_ = 1;
    this.flipping_ = false;
  }

  createPages(pages) {
    // Add front page
    this.pages_.push({
      pageNumber: 1,
      type: PAGE_TYPE.image,
      src: FRONT_IMAGE,
      border: false,
    });

    for (let i = 0; i < pages.length; ++i) {
      const pageNumber = i + 1;
      this.pages_.push({
        pageNumber: pageNumber,
        type: PAGE_TYPE.image,
        src: pages[i],
        border: true,
      });
    }

    this.pages_.push({
      pageNumber: pages.length + 2,
      type: PAGE_TYPE.credits,
      border: true,
    });
  }

  build() {
    const minIndex = 2;
    let currentIndex = this.pages_.length + minIndex;
    let doublePage = null;
    let newPage = true;

    for (let i = 0; i < this.pages_.length; ++i) {
      if (newPage) {
        doublePage && this.cardElement_.prepend(doublePage);
        doublePage = document.createElement('div');
        doublePage.className = 'double-page';
      }

      const pageData = this.pages_[i];
      const page = document.createElement('div');
      page.className = `page page--type-${PAGE_TYPE[pageData.type]} page--${newPage ? 'front' : 'back'}${pageData.border ? ' page--border' : ''}`;

      if (pageData.type === PAGE_TYPE.image) {
        const image = document.createElement('img');
        image.className = 'page__image';
        image.src = pageData.src;
        image.draggable = false;
        page.appendChild(image);
      }

      if (pageData.type === PAGE_TYPE.credits) {
        const creditsPage = new CreditsPage().build();
        page.appendChild(creditsPage);
      }

      newPage = !newPage;
      doublePage.prepend(page);
    }

    if (doublePage.childNodes.length < 2) {
      while (doublePage.childNodes.length < 2) {
        const page = document.createElement('div');
        page.className = `page page--type-image page--${newPage ? 'front' : 'back'}`;
        newPage = !newPage;
        doublePage.prepend(page);
      }
    }
    doublePage && this.cardElement_.prepend(doublePage);

    this.currentIndex_ = this.cardElement_.childNodes.length - 1;
  }

  mount() {
    this.appElement_.appendChild(this.cardElement_);
  }

  navigateBack() {
    if (this.flipping_) {
      return;
    }
    if (this.currentIndex_ === this.cardElement_.childNodes.length - 1) {
      return;
    }
    this.flipping_ = true;
    ++this.currentIndex_;
    --this.currentLayer_;
    requestAnimationFrame(() => {
      const curNode = this.cardElement_.childNodes[this.currentIndex_];
      curNode.classList.remove(this.flippedClass_);
      setTimeout(() => {
        curNode.style.zIndex = null;
      }, 750 / 2);
      setTimeout(() => {
        this.flipping_ = false;
      }, 750);
    });
  }

  navigateNext() {
    if (this.flipping_) {
      return;
    }
    if (this.currentIndex_ < 0) {
      return;
    }
    this.flipping_ = true;
    requestAnimationFrame(() => {
      const curNode = this.cardElement_.childNodes[this.currentIndex_];
      curNode.classList.add(this.flippedClass_);
      curNode.style.zIndex = this.currentLayer_;
      ++this.currentLayer_;
      --this.currentIndex_;
      setTimeout(() => {
        this.flipping_ = false;
      }, 750);
    });
  }
}
