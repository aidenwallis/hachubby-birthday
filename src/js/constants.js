export const CARD_ID = '49d9ad4b223d1a2';
export const PAGE_COUNT = 52;
export const BACKGROUND_IMAGE = require('../images/table-background.jpg');
export const CARD_PAGE = (page) => `https://groupgreeting.storage.googleapis.com/cards/${CARD_ID}/pages/${CARD_ID}_${page}.png?t=${Date.now()}`;
export const FRONT_IMAGE = require('../images/front-cover.png');
export const BACK_IMAGE = require('../images/back-cover.png');
