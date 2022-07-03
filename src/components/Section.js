export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this._clear();
    items.forEach(item => this._renderer(item));
  }

  _clear() {
    this._container.innerHTML = '';
  }
}
