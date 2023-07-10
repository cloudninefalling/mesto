export class UserInfo {
  constructor(userNameSelector, userOccupationSelector) {
    this._name = document.querySelector(userNameSelector);
    this._occupation = document.querySelector(userOccupationSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }

  setUserInfo({ name, occupation }) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }
}