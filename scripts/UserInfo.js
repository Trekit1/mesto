export default class UserInfo {
    constructor({nameElement, jobElement}) {
        this._nameElement = nameElement;
        this._jobeElement = jobElement;
    }

    getUserInfo() {
        const profileData = {
            name: this._nameElement.textContent,
            job: this._jobeElement.textContent
        };
        return profileData;
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.profileName;
        this._jobeElement.textContent = data.profileJob;
    }
}