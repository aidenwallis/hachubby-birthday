import { PAGE_COUNT, FRONT_IMAGE, BACKGROUND_IMAGE, CARD_PAGE } from './constants';
import { preloadImage } from './util/helpers';

import BackgroundController from './controllers/background';
import CardController from './controllers/card';
import LoadingController from './controllers/loading';
import ControlController from './controllers/control';

(() => {
  const appElement = document.getElementById('app');

  const cardController = new CardController(appElement, PAGE_COUNT);
  const controlController = new ControlController(appElement, cardController);
  const loadingController = new LoadingController();

  loadingController.show();

  preloadImage(BACKGROUND_IMAGE)
    .then(() => {
      new BackgroundController().show(BACKGROUND_IMAGE);
      return preloadImage(FRONT_IMAGE);
    })
    .then(() => {
      const images = new Array(PAGE_COUNT);
      for (let i = 0; i < images.length; ++i) {
        images[i] = CARD_PAGE(i + 1);
      }
      cardController.createPages(images);
      cardController.build();
      loadingController.hide();
      cardController.mount();
      controlController.mount();
      controlController.registerKeys();
    });
})();
