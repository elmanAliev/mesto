// // закрытие попапа по клавише Esc
// export function closeEsc(evt) {
//     if(evt.key === "Escape") {
//         const popup = document.querySelector(".popup_opened"); // находим открытый в данный момент попап 
//         closePopup(popup);                                      // и передаем его как аргумент в closePopup
//     }
// }
// //открытие попапа
// export function openPopup(typePopup) {
//     typePopup.classList.add ('popup_opened'); // добавляем попапу класс popup_opened    
//     // слушатель на клавише Esc
//     document.addEventListener('keydown', closeEsc);
// }

// //закрытие попапа
// export function closePopup(typePopup) {
//     typePopup.classList.remove ('popup_opened');  // удаляем у попапа класс popup_opened
//     // снимаем слушатель на клавише Esc
//     document.removeEventListener('keydown', closeEsc);
// }
