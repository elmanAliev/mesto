import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__img');
        this._popupImgText = this._popup.querySelector('.popup__img-text');
    }
  
    open = ({ name, link }) => {
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupImgText.textContent = name;
        super.open();
    }
  }