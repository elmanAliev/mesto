let popupEdit = document.querySelector ('.popup_type_edit'); // поместили в переменную попап
let buttonEdit = document.querySelector ('.profile__button_type_edit'); // поместили в переменную кнопку EDIT

let nameInput = document.querySelector('.popup__input_type_name');  // поместили в переменную поле ввода
let jobInput = document.querySelector('.popup__input_type_job');  // поместили в переменную поле ввода

let profileName = document.querySelector('.profile__name'); // поместили в переменную тег с классом profile__name
let profileJob = document.querySelector('.profile__job');  // поместили в переменную тег с классом profile__job

let buttonClose = document.querySelectorAll ('.popup__button_type_close');  // поместили в переменную кнопку закрытия
let formElement = document.querySelector('.popup__container');  // Находим форму в DOM

let popupAdd = document.querySelector ('.popup_type_add');
let buttonAdd = document.querySelector ('.profile__button_type_add');
let buttonSave = document.querySelector ('.popup__button_type_save');

let placeInput = document.querySelector('.popup__input_type_place');  // поместили в переменную поле ввода
let urlInput = document.querySelector('.popup__input_type_url');  // поместили в переменную поле ввода

// функция открытия попапа
function openPopup(typePopup) {
    typePopup.classList.add ('popup_opened'); // добавляем попапу класс popup_opened    
}
// функция закрытия попапа
function closePopup(typePopup) {
    typePopup.classList.remove ('popup_opened');  // удаляем у попапа класс popup_opened
}

// на кнопку buttonEdit ставим слушатель (при клике - запуск ф-ции openPopup)
buttonEdit.addEventListener ('click', function() {
    openPopup (popupEdit);  // в аргументе передаем тип попапа
    nameInput.value = profileName.textContent;  // при клике на кнопку в значения полей ввода помещаем 
    jobInput.value = profileJob.textContent;    // текстовые значения нах-ся в profileName и profileJob    
}); 

// на кнопку buttonAdd ставим слушатель (при клике - запуск ф-ции openPopup)
buttonAdd.addEventListener ('click', function() {
    openPopup(popupAdd);
}); 



// на все кнопки buttonClose ставим слушатель (при клике - запуск ф-ции closePopup)
for (i=0; i<buttonClose.length; i++) {
    buttonClose[i].addEventListener ('click', function(evt) {
        const eventTarget = evt.target;
        const parentEventTarget = eventTarget.parentElement;
        const parentTwoEventTarget = parentEventTarget.parentElement;
        closePopup(parentTwoEventTarget);
    });
}




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
       
    profileName.textContent = nameInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = jobInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupEdit);    // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 




//добавление карточек из массива
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 




initialCards.forEach (function (item) {
    const elements = document.querySelector('.elements'); // поместили контейнер elements в переменную
    const elementTemplate = document.querySelector('#element').content; // поместили template в переменную
    const addElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем содержимое template
    const addImage = addElement.querySelector('.element__image');
    const addName = addElement.querySelector('.element__name');
    addImage.src = item.link;
    addName.textContent = item.name;
    elements.append(addElement);
});

//добавление карточек из попапа
function addCard () {
    
       
    profileNametextContent = placeInput.value;  // в текстовое значение profileName и profileJob записываются
    profileJob.textContent = urlInput.value;    // значения из полей ввода nameInput и jobInput
    
    closePopup(popupAdd);    // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}
// Прикрепляем обработчик к форме:
buttonSave.addEventListener('click', addCard); 

















// лайк
let likeButtons = document.querySelectorAll ('.element__like');

for (let i=0; i<likeButtons.length; i++) {
    likeButtons[i].addEventListener ('click', function () {
        likeButtons[i].classList.toggle ('element__like_active');  
    });
};

// попап с картинкой
let popupTypeImg = document.querySelector ('.popup_type_img');
let imgElements = document.querySelectorAll ('.element__image');
let popupImg = document.querySelector ('.popup__img');
for (let i=0; i<imgElements.length; i++) {
    imgElements[i].addEventListener ('click', function () {
        popupTypeImg.classList.add ('popup_opened');
        popupImg.src=imgElements[i].src;
    });
};
