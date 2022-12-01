import Events from "./events/events.js";

// методы кдасса view отображают шаблоны html элементов с нужными данными.
class Views extends Events {
  constructor() {
    super()
  }
  DisplayMain(): void {
    this.InitTextAreaBigger()
    let fieldForNewComment: HTMLInputElement | null = document.querySelector(".j-new-comment")
    if (!fieldForNewComment) {return}
    
    // console.log("view");
    this.InitBtnSortComments(fieldForNewComment)
    this.InitBtnComment()
  }
}
export default Views