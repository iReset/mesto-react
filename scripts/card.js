import { openImage } from "./popup-open-image.js"

export default class Card {
  constructor(data, options) {
    this._caption = data.name;
    this._imageLink = data.link;
    this._imageAlt = data.alt;
    this._options = options;
    this._template = this._getTemplateElement(options.template);
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementRemove = null;
  }

  _getTemplateElement(cardSelector) {
    return document.querySelector(cardSelector).content.querySelector(this._options.classCard);
  }

  _openImage() {
    openImage({
      link: this._imageLink,
      alt: this._imageAlt,
      name: this._caption,
    });
  }

  _toggleLike() {
    this._elementLike.classList.toggle(this._options.likeButtonActive);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementRemove = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => this._openImage());
    this._elementLike.addEventListener("click", () => this._toggleLike());
    this._elementRemove.addEventListener("click", () => this._removeCard());
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementCaption = this._element.querySelector(this._options.caption);
    this._elementImage = this._element.querySelector(this._options.image);
    this._elementLike = this._element.querySelector(this._options.likeButton);
    this._elementRemove = this._element.querySelector(this._options.removeButton);

    this._elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;

    this._setEventListeners();

    return this._element;
  }
}
