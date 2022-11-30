
class Controllers {
  #privateModels
  #privateView
  constructor() {
    this.#privateModels
    this.#privateView
  }
  setPrivateModels(el) { this.#privateModels = el }
  setPrivateViews(el) { this.#privateView = el }

  //? Отображение главной страницы 
  PageMain() {
    this.#privateModels.GetPreviosComments();
    this.#privateView.DisplayMain(); //* отображение раздела комментарии (подключение функционала)
  }
}
export default Controllers;