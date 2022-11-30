import Events from "./events/events.js";

// методы кдасса view отображают шаблоны html элементов с нужными данными.
class Views extends Events {
  #privateMainPage
  constructor() {
    super()
    this.#privateMainPage
  }
  setPrivateMainPage(mainPage) { this.#privateMainPage = mainPage }
  DisplayMain() {
    this.InitTextAreaBigger()
    this.InitBtnSortComments(document.querySelector(".j-new-comment"))
    this.InitBtnComment()
  }
}
export default Views