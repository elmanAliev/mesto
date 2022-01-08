export default class Card {
    constructor(card, cardSelector, handleCardClick) {  // принимает селектор карточки (чтобы конструктор был универсальным и мог работать с разными селекторами)
      this._cardSelector = cardSelector;
      this._name = card.name;
      this._link = card.link;
      this._handleCardClick = handleCardClick;


      this._cardElement = document
        .querySelector(this._cardSelector)  // найдем темплейт эл-т с переданным селектором
        .content                            // извлекаем его содержимое 
        .querySelector('.element')          // в содержимом найдёт элемент с классом element
        .cloneNode(true);
      this._image = this._cardElement.querySelector('.element__image');
      this._like = this._cardElement.querySelector('.element__like');
    }
    
    
    // метод лайк картинкам
    _handleLikeImg() {
      this._like.classList.toggle('element__like_active');
    }
    // метод удаления карточки
    _handleRemoveCard() {
        this._cardElement.remove();
    }

    
    // метод добавления обработчиков
    _setEventListeners() {
      const data = { name: this._name, link: this._link };
      this._image.addEventListener('click', () => { // при клике на элемент открываем попап
        this._handleCardClick(data);
      });
       
      this._like.addEventListener('click', () => {  // при клике ставим лайк
        this._handleLikeImg();                         
      });
      
      this._cardElement.querySelector('.element__trash').addEventListener('click', () => {  // при клике вызываем удаление
        this._handleRemoveCard();                         
      });
    }


    // метод, добавляющий карточку в разметку
    generateCard() {
        this._setEventListeners();           // вызываем слушатели для карточки
        // Добавим данные
        this._image.src = this._link;
        this._cardElement.querySelector('.element__name').textContent = this._name;
        this._image.alt = this._name;

        // Вернём элемент наружу
        return this._cardElement;
    }
}