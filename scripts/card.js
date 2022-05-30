import { openImage } from "./popup-open-image.js"

export default class Card {
  constructor(data, cardSelector) {
    this._caption = data.name;
    this._imageLink = data.link;
    this._imageAlt = data.alt;
    this._template = this._getTemplateElement(cardSelector);
    this._element = null;
    this._elementImage = null;
  }

  _getTemplateElement(cardSelector) {
    return document.querySelector(cardSelector).content.querySelector('.element');
  }

  _setEventListeners() {
    const elementLike = this._element.querySelector('.element__like-button');
    const elementRemove = this._element.querySelector('.element__remove-button');

    this._elementImage.addEventListener("click", () =>
      openImage({
        link: this._imageLink,
        alt: this._imageAlt,
        name: this._caption,
      }));
    elementLike.addEventListener("click", () =>
      elementLike.classList.toggle("element__like-button_active")
    );
    elementRemove.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementImage = this._element.querySelector('.element__image');
    const elementCaption = this._element.querySelector('.element__caption');

    elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;

    this._setEventListeners();

    return this._element;
  }
}
