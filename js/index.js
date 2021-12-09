const popupEdit = document.querySelector ('.popup_type_edit'); // поместили в переменную попап
const popupAdd = document.querySelector ('.popup_type_add');  // поместили в переменную попап
const popupTypeImg = document.querySelector ('.popup_type_img');  // поместили в переменную попап

const elements = document.querySelector('.elements'); // поместили контейнер elements в переменную

const nameInput = document.querySelector('.popup__input_type_name');  // поместили в переменную поле ввода
const jobInput = document.querySelector('.popup__input_type_job');  // поместили в переменную поле ввода

const placeInput = document.querySelector('.popup__input_type_place');  // поместили в переменную поле ввода
const urlInput = document.querySelector('.popup__input_type_url');  // поместили в переменную поле ввода

const profileName = document.querySelector('.profile__name'); // поместили в переменную тег с классом profile__name
const profileJob = document.querySelector('.profile__job');  // поместили в переменную тег с классом profile__job

const popupImg = popupTypeImg.querySelector ('.popup__img'); // поместили в переменную картинку попапа
const popupImgText = popupTypeImg.querySelector ('.popup__img-text'); // поместили в переменную картинку попапа

const formEdit = document.querySelector('#form-edit');  // Находим форму редактирования профиля
const formAdd = document.querySelector('#form-add');  // Находим форму редактирования профиля

const buttonAdd = document.querySelector ('.profile__button_type_add');  // поместили в переменную кнопку добавления
const buttonEdit = document.querySelector ('.profile__button_type_edit'); // поместили в переменную кнопку EDIT
const buttonsClose = document.querySelectorAll ('.popup__button_type_close');  // поместили в переменную кнопку закрытия
const buttonCreate = document.querySelector ('.popup__button_type_create');  // поместили в переменную кнопку добавления

const popupOverlay = document.querySelectorAll ('.popup__overlay');

// закрытие по клавише Esc
function closeEsc(evt) {
    if(evt.key === "Escape") {
        const popup = document.querySelector(".popup_opened"); // находим открытый в данный момент попап 
        closePopup(popup);                                      // и передаем его как аргумент в closePopup
    }
}

// функция открытия попапа
function openPopup(typePopup) {
    typePopup.classList.add ('popup_opened'); // добавляем попапу класс popup_opened    
    // слушатель на клавише Esc
    document.addEventListener('keydown', closeEsc);
}
// функция закрытия попапа
function closePopup(typePopup) {
    typePopup.classList.remove ('popup_opened');  // удаляем у попапа класс popup_opened
    // снимаем слушатель на клавише Esc
    document.removeEventListener('keydown', closeEsc);
}


// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    openPopup (popupEdit);  // в аргументе передаем тип попапа
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob    
}); 
// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    formAdd.reset();
    buttonCreate.classList.add ('main-button_inactive');
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


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupEdit);    // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler); 


// ф-ция добавления карточки
function cardAdd(card) {
    elements.prepend(card);
}

// ф-ция создания карточки
function cardCreate(card) {
    const elementTemplate = document.querySelector('#element').content; // поместили template в переменную
    const addElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем содержимое template
    const addImage = addElement.querySelector('.element__image');
    const addName = addElement.querySelector('.element__name');
    
    addImage.src = card.link;   // записали в добавляемую карточку значения link, alt и name 
    addName.textContent = card.name;
    addImage.alt = card.name;

    // лайк карточкам
    const buttonLike = addElement.querySelector('.element__like');
    buttonLike.addEventListener('click', function(evt) {
        evt.target.classList.toggle ('element__like_active');
    });
    // удаление карточек
    const buttonTrash = addElement.querySelector('.element__trash');
    buttonTrash.addEventListener('click', function() {
        const elementItem = buttonTrash.closest('.element');
        elementItem.remove();
    });   
    // открытие попапа картинки
    addImage.addEventListener ('click', function () {
        openPopup(popupTypeImg);
        popupImg.src = addImage.src;
        popupImg.alt = addName.textContent;
        popupImgText.textContent = addName.textContent;  
    });

    return addElement; // функцияя возвращает созданную карточку
}


//карточки из массива
initialCards.forEach (function (item) {
    cardAdd(cardCreate(item)); // для каждого эл-та массива вызываем ф-цию создания карточки, затем функцию добавления карточки
});

//карточка из попапа
function popupCard(evt) {
    evt.preventDefault();

    const card = {                  // создаем из вводимых данных объект, потому что объект принимается ф-цией создания карточки как аргумент 
        name: placeInput.value,
        link: urlInput.value,
    };
    
    cardAdd(cardCreate(card)); // для созданного объекта вызываем ф-цию создания карточки, затем функцию добавления карточки
    
    closePopup(popupAdd);   // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}
// на кнопку buttonCreate ставим слушатель
formAdd.addEventListener('submit', popupCard);

