export default class UserInfo {
    constructor({nameElement, jobElement, userAvatar, userId}) {
        this._nameElement = nameElement;
        this._jobeElement = jobElement;
        this._userAvatar = userAvatar;
        this._userId = userId;
    }

    getUserInfo() {
        const profileData = {
            name: this._nameElement.textContent,
            job: this._jobeElement.textContent
        };
        return profileData;
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobeElement.textContent = data.about;
        this._userAvatar.src = data.avatar;
        this._userId = data._id;
    }

    changeUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }

    changeUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobeElement.textContent = data.about;
    }
}