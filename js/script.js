const popupEdit = document.querySelector ('.popup_type_edit'); // поместили в переменную попап
const popupAdd = document.querySelector ('.popup_type_add');  // поместили в переменную попап
const popupTypeImg = document.querySelector ('.popup_type_img');  // поместили в переменную попап

const nameInput = document.querySelector('.popup__input_type_name');  // поместили в переменную поле ввода
const jobInput = document.querySelector('.popup__input_type_job');  // поместили в переменную поле ввода

const placeInput = document.querySelector('.popup__input_type_place');  // поместили в переменную поле ввода
const urlInput = document.querySelector('.popup__input_type_url');  // поместили в переменную поле ввода

const profileName = document.querySelector('.profile__name'); // поместили в переменную тег с классом profile__name
const profileJob = document.querySelector('.profile__job');  // поместили в переменную тег с классом profile__job

const popupImg = popupTypeImg.querySelector ('.popup__img'); // поместили в переменную картинку попапа
const popupImgText = popupTypeImg.querySelector ('.popup__img-text'); // поместили в переменную картинку попапа

const formElement = document.querySelector('.popup__container');  // Находим форму в DOM
const buttonAdd = document.querySelector ('.profile__button_type_add');  // поместили в переменную кнопку добавления
const buttonEdit = document.querySelector ('.profile__button_type_edit'); // поместили в переменную кнопку EDIT
const buttonClose = document.querySelectorAll ('.popup__button_type_close');  // поместили в переменную кнопку закрытия
const buttonCreate = document.querySelector ('.popup__button_type_create');  // поместили в переменную кнопку добавления


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
    placeInput.value = '';  // при появлении попапа поля будут пустые
    urlInput.value = '';  // при появлении попапа поля будут пустые
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
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 


//массив добавляемых карточек
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


//добавление карточек из массива
initialCards.forEach (function (item) {
    const elements = document.querySelector('.elements'); // поместили контейнер elements в переменную
    const elementTemplate = document.querySelector('#element').content; // поместили template в переменную
    const addElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем содержимое template
    const addImage = addElement.querySelector('.element__image');
    const addName = addElement.querySelector('.element__name');
    addImage.src = item.link;
    addName.textContent = item.name;
    elements.append(addElement);

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
        popupImgText.textContent = addName.textContent;  
    });
});

//добавление карточек из попапа
function addCard() {
    const elements = document.querySelector('.elements'); // поместили контейнер elements в переменную
    const elementTemplate = document.querySelector('#element').content; // поместили template в переменную
    const addElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем содержимое template
    const addImage = addElement.querySelector('.element__image');
    const addName = addElement.querySelector('.element__name');   
    addImage.src = urlInput.value;  // в текстовое значение profileName и profileJob записываются
    addName.textContent = placeInput.value;    // значения из полей ввода nameInput и jobInput
    elements.prepend(addElement);
    
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
        popupImgText.textContent = addName.textContent;  
    });

    closePopup(popupAdd);   // чтобы попап закрылся, после нажатия на СОХРАНИТЬ, удаляем у него класс popup_opened
}
// на кнопку buttonCreate ставим слушатель
buttonCreate.addEventListener('click', addCard);