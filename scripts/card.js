import { openImage } from "./popup-open-image.js"

export default class Card {
  constructor(data, options) {
    this._caption = data.name;
    this._imageLink = data.link;
    this._imageAlt = data.alt;
    this._options = options;
    this._template = this._getTemplateElement(options.template);
    this._element = null;
    this._elementImage = null;
  }

  _getTemplateElement(cardSelector) {
    return document.querySelector(cardSelector).content.querySelector(this._options.classCard);
  }

  _setEventListeners() {
    const elementLike = this._element.querySelector(this._options.likeButton);
    const elementRemove = this._element.querySelector(this._options.removeButton);

    this._elementImage.addEventListener("click", () =>
      openImage({
        link: this._imageLink,
        alt: this._imageAlt,
        name: this._caption,
      }));
    elementLike.addEventListener("click", () =>
      elementLike.classList.toggle(this._options.likeButtonActive)
    );
    elementRemove.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementImage = this._element.querySelector(this._options.image);
    const elementCaption = this._element.querySelector(this._options.caption);

    elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;

    this._setEventListeners();

    return this._element;
  }
}
