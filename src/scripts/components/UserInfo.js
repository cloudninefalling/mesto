export class UserInfo {
  constructor(userNameSelector, userOccupationSelector) {
    this.name = document.querySelector(userNameSelector);
    this.occupation = document.querySelector(userOccupationSelector);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      occupation: this.occupation.textContent
    }
  }

  setUserInfo(name, occupation) {
    this.name.textContent = name;
    this.occupation.textContent = occupation;
  }
}