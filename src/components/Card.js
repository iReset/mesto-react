export default class Card {
  constructor(data, options, { handleCardClick, handleRemoveClick }) {
    this._id = data.id;
    this._caption = data.name;
    this._imageLink = data.link;
    this._likes = data.likes;
    this._imageAlt = data.alt;
    this._canDelete = data.canDelete;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._options = options;
    this._template = this._getTemplateElement(options.template);
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementQuantity = null;
    this._elementRemove = null;
  }

  _getTemplateElement(cardSelector) {
    return document.querySelector(cardSelector).content.querySelector(this._options.classCard);
  }

  _toggleLike() {
    this._elementLike.classList.toggle(this._options.likeButtonActive);
  }

  getId() {
    return this._id;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
    this._elementCaption = null;
    this._elementImage = null;
    this._elementLike = null;
    this._elementQuantity = null;
    this._elementRemove = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => this._handleCardClick({
      link: this._imageLink,
      alt: this._imageAlt,
      name: this._caption,
    }));
    this._elementLike.addEventListener("click", () => this._toggleLike());
    if (this._canDelete)
      this._elementRemove.addEventListener("click", () => this._handleRemoveClick());
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._elementCaption = this._element.querySelector(this._options.caption);
    this._elementImage = this._element.querySelector(this._options.image);
    this._elementLike = this._element.querySelector(this._options.likeButton);
    this._elementQuantity = this._element.querySelector(this._options.quantity);
    this._elementRemove = this._element.querySelector(this._options.removeButton);
    if (!this._canDelete) {
      this._elementRemove.remove();
      this._elementRemove = null;
    }


    this._elementCaption.textContent = this._caption;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageAlt;
    this._elementQuantity.textContent = this._likes || '';

    this._setEventListeners();

    return this._element;
  }
}
