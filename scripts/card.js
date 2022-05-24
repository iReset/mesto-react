export default class Card {
  constructor(data, cardSelector) {
    this._caption = data.name;
    this._imageLink = data.link;
    this._imageAlt = data.alt;
    this._cardSelector = cardSelector;
  }
}
