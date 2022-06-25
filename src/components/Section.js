export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._clear();
    this._items.forEach(item => this._renderer(item));
  }

  _clear() {
    // Данный метод используется в renderItems. Если не очищать контейнер при повторной отрисовке элементов
    // (возможно, в будущем), то элементы продублируются.
    // Но этот метод не должен быть публичным. Сделал его приватным.
    this._container.innerHTML = '';
  }
}
