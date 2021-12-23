import {openPopup} from "./utils.js";
import {
    popupTypeImg,
    popupImg,
    popupImgText,
} from "./utils.js";

export class Card {
    constructor(card, cardSelector = '#element') {  // принимает селектор карточки (чтобы конструктор был универсальным и мог работать с разными селекторами)
      this._cardSelector = cardSelector;
      this._name = card.name;
      this._link = card.link;
    }
    
    // метод получения темплейт эл-та
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)  // найдем темплейт эл-т с переданным селектором
        .content                            // извлекаем его содержимое 
        .querySelector('.element')          // в содержимом найдёт элемент с классом element
        .cloneNode(true);                   // клонируем его
  
      return cardElement;                   // возвращаем клонированный эл-т
    }
    
    
    // метод открытия попапа (увеличение картинки)
    _handleOpenPopup() {
        popupImg.src = this._link;
        popupImg.alt = this._name
        popupImgText.textContent = this._name  
        openPopup(popupTypeImg)
    }
    // метод лайк картинкам
    _handleLikeImg() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
    // метод удаления карточки
    _handleRemoveCard() {
        this._element.remove();
    }

    
    // метод добавления обработчиков
    _setEventListeners() {
      this._element.querySelector('.element__image').addEventListener('click', () => { // при клике на элемент
        this._handleOpenPopup();                                                       // открываем попап
      });
       
      this._element.querySelector('.element__like').addEventListener('click', () => {  // при клике вызываем лайк
        this._handleLikeImg();                         
      });
      
      this._element.querySelector('.element__trash').addEventListener('click', () => {  // при клике вызываем удаление
        this._handleRemoveCard();                         
      });
    }


    // метод, добавляющий карточку в разметку
    generateCard() {
        this._element = this._getTemplate(); // Запишем разметку в приватное поле _element. и Так у других элементов появится доступ к ней.
        this._setEventListeners();           // вызываем слушатели для карточки
        // Добавим данные
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;

        // Вернём элемент наружу
        return this._element;
    }
}