export default class Section {
    constructor({ items, renderer }, containerSelector) {  
      this._renderedItems = items;  // data - массив данных, которые нужно добавить на страницу при инициализации класса
      this._renderer = renderer;  // renderer — это функция, которая отвечает за создание и отрисовку данных на странице
      this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы.
    }
    
    // метод. принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
      this._container.prepend(element);
    }

    // метод, который отвечает за отрисовку всех элементов
    renderItems() {      
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
}


