export default class UserInfo {
  constructor({ profileName, profileAbout, avatar }) {
    this.nameElement = profileName;
    this.aboutElement = profileAbout;
    this.avatarElement = avatar;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      _id: this._id,
    };
  }

  _updateAvatar() {
    this.avatarElement.src = this._avatar;
  }

  _updateUserInfo() {
    this.nameElement.textContent = this._name;
    this.aboutElement.textContent = this._about;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._userId = _id;

    this._updateUserInfo();
    this._updateAvatar();
  }
}
