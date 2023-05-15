//Класс отвечает за управление отображением информации о пользователе на странице
//Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе

export default class UserInfo {
  constructor({ name, job, avatar, _id }) {
    this._nameSelector = name;
    this._jobSelector = job;
    this._avatarSelector = avatar;
  }

  //метод возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent,
      avatar: this._avatarSelector.src // link
    };
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar, _id }) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = about;
    if (avatar) {
      this._avatarSelector.src = avatar;
    }
    this._avatarSelector.alt = name;
    this._userId = _id
  }

  getId() {
    return this._userId
  }
}