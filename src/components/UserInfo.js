export default class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._id = _id;
    if (avatar)
      this._avatar.src = avatar;
  }
}
