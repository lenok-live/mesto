//класс отвечает за отрисовку элементов на странице, у класса нет своей разметки 
//он получает разметку через функцию-колбэк и вставляет её в контейнер

//сво-во items — это массив данных, которые нужно добавить на страницу при инициализации класса
//renderer — функция, которая отвечает за создание и отрисовку данных на странице
//containerSelector - селектор контейнера, в который нужно добавлять созданные элементы

export default class Section {
  constructor({ renderer }, containerSelector) {
   // this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  
  //метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  //метод, который отвечает за отрисовку всех элементов 
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item)});
  }
}