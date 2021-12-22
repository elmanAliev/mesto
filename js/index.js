const popupEdit = document.querySelector ('.popup_type_edit'); // попап "редактирование"
const popupAdd = document.querySelector ('.popup_type_add');  // попап "добавление"
const popupTypeImg = document.querySelector ('.popup_type_img');  // попап "увеличенная картинка"

const elements = document.querySelector('.elements'); // контейнер

const nameInput = document.querySelector('.popup__input_type_name');    // поле ввода "редактирование"
const jobInput = document.querySelector('.popup__input_type_job');      // поле ввода "редактирование"

const placeInput = document.querySelector('.popup__input_type_place');  // поле ввода "добавление"
const urlInput = document.querySelector('.popup__input_type_url');      // поле ввода "добавление"

const profileName = document.querySelector('.profile__name'); // тег с классом profile__name
const profileJob = document.querySelector('.profile__job');  // тег с классом profile__job

const popupImg = popupTypeImg.querySelector ('.popup__img'); // увеличенная картинка попапа
const popupImgText = popupTypeImg.querySelector ('.popup__img-text'); // подпись к картинке

const formEdit = document.querySelector('#form-edit');  // форма редактирования профиля
const formAdd = document.querySelector('#form-add');  //  форма добавления карточки

const buttonAdd = document.querySelector ('.profile__button_type_add');  // кнопка add
const buttonEdit = document.querySelector ('.profile__button_type_edit'); // кнопку EDIT
const buttonsClose = document.querySelectorAll ('.popup__button_type_close');  // кнопки закрытия
const buttonCreate = document.querySelector ('.popup__button_type_create');  // кнопку create

const popupOverlay = document.querySelectorAll ('.popup__overlay');



class Card {
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




// закрытие попапа по клавише Esc
function closeEsc(evt) {
    if(evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened"); // находим открытый в данный момент попап 
        closePopup(popup);                                      // и передаем его как аргумент в closePopup
    }
}

//открытие попапа
function openPopup(typePopup) {
    typePopup.classList.add ('popup_opened'); // добавляем попапу класс popup_opened    
    // слушатель на клавише Esc
    document.addEventListener('keydown', closeEsc);
}
//закрытие попапа
function closePopup(typePopup) {
    typePopup.classList.remove ('popup_opened');  // удаляем у попапа класс popup_opened
    // снимаем слушатель на клавише Esc
    document.removeEventListener('keydown', closeEsc);
}

//удаление ошибок валидации, возникающих при повторном открытии попапа
function removeErrors (form) {
    const spanList = Array.from(form.querySelectorAll('.popup__input-error'));
    spanList.forEach((spanElement) => {
        spanElement.textContent = "";
    });
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove ('popup__input_type_error');;
    });
}




// ф-ция добавления карточки
function cardAdd(card) {
    elements.prepend(card);
}

//карточки из массива
const renderElements = () => {
    initialCards.forEach (function (item) {
        const card = new Card (item);
        const cardElement = card.generateCard();
        cardAdd(cardElement); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
    });
};
renderElements();

//карточка из попапа
function popupCard(evt) {
    evt.preventDefault();

    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    };
    const cardPopup = new Card (card);
    const cardElement = cardPopup.generateCard();
    cardAdd(cardElement); // для созданного объекта вызываем ф-цию создания карточки, затем функцию добавления карточки
    
    closePopup(popupAdd);   // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}

// редактирование профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupEdit);    // после нажатия на СОХРАНИТЬ, закрываем попап
}




// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    openPopup (popupEdit);  // в аргументе передаем тип попапа
    removeErrors(formEdit);
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob    
}); 

// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    formAdd.reset();
    buttonCreate.classList.add ('main-button_inactive');
    removeErrors(formAdd);
    openPopup(popupAdd);
});

// на все кнопки buttonClose ставим слушатель (при клике - запуск ф-ции closePopup)
buttonsClose.forEach((item) => {
    item.addEventListener ('click', function(evt) {
        const popup = evt.target.closest('.popup')
        closePopup(popup);
    });
});

// (при клике на overlay - запуск ф-ции closePopup)
popupOverlay.forEach((item) => {
    item.addEventListener ('click', function(evt) {
        const popup = evt.target.closest('.popup')
        closePopup(popup);
    });
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler); 

// на кнопку buttonCreate ставим слушатель
formAdd.addEventListener('submit', popupCard);