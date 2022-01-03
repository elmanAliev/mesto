import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popupSelector.querySelector('.popup__img');
        this._popupImgText = this._popupSelector.querySelector('.popup__img-text');
    }
  
    open = () => {
        console.log(this._link)
        this._popupImg.src = this._link;
        this._popupImg.alt = this._name;
        this._popupImgText.textContent = this._name;
        super.open();
    }
  }