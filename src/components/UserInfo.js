export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {  
      this._name = document.querySelector(nameSelector);
      this._job = document.querySelector(jobSelector);
      this._avatar = document.querySelector(avatarSelector);
      this._id = 0;
    }
    
    getUserInfo () {
        return {
            name: this._name.textContent, 
            job: this._job.textContent,
        };
    }

    getUserID() {
        return this._id;
    }

    setUserID(id) {
        this._id = id;
    }

    setUserInfo ({ name, job, avatar}) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._avatar.src = avatar
    }

}