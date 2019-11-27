import { preloadImage } from './util/helpers';
import { CARD_PAGE } from './constants';

export default class ImageLoader {
  constructor(pageCount) {
    this.pageCount = pageCount - 2; // Front/back cover
  }

  load() {
    return new Promise((resolve, reject) => {
      const curTime = Date.now();
      let loaded = 0;
      const srcs = [];
      const onload = () => {
        ++loaded;
        if (loaded === this.pageCount) {
          return resolve(srcs);
        }
      };

      for (let i = 0; i < this.pageCount; ++i) {
        const src = CARD_PAGE(i + 1);
        srcs.push(src);
        preloadImage(src).then(onload).catch(onload);
      }
    });
  }
}
