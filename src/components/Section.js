export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderNewItem(item) {
    this._renderer(item);
  }

  renderItems(itemsArr) {
    this._renderedItems = itemsArr;
    this._renderedItems.reverse().forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
