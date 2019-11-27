export const CARD_ID = '49d9ad4b223d1a2';
export const PAGE_COUNT = 41;
export const BACKGROUND_IMAGE = require('../images/table-background.jpg');
export const CARD_PAGE = (page) => `https://groupgreeting.storage.googleapis.com/cards/${CARD_ID}/pages/${CARD_ID}_${page}.png?t=${Date.now()}`;
export const FRONT_IMAGE = 'https://placehold.it/460x570.png';
