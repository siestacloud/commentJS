import Storage from "../../db/storage.js";
import Comment from "../../core/comment.js";

class Events extends Storage {

  //? InitBtnComment обработчик кнопки "создать комментарий"
  public InitBtnComment(): void {
    let comment = new Comment()
    //* поиск элементов в DOM
    let commentBtn: HTMLInputElement | null = document.querySelector(".j-btn-send-comment");
    let textAreaElement: HTMLInputElement | null = document.querySelector(".new__textarea");
    let innerHtmlElement: HTMLInputElement | null = document.querySelector(".j-new-comment") //* целевой элемент, для рендера комментария
    if (!commentBtn) { return }

    commentBtn.addEventListener('click', () => {

      if (!textAreaElement) { return }
      if (!textAreaElement.value) { return }
      if (!innerHtmlElement) { return }           //* обработка пустого поля ввода 
      textAreaElement.setAttribute("rows", "2")        //* увел. зону ввода комментария
      comment.PuplicSetComment(textAreaElement.value)  //* заполняю коментарий данными
      comment.PuplicDisplayComment(innerHtmlElement)   //* рендер коментария
      comment.PublicSaveComment()                      //* сохранение коментария
      comment.PublicInitBtnShowAnswer()                //* подключение логики формирования ответов на комментарий
      comment.PublicInitBtnMakeFavorite()              //* подключение логики формирования свойства "избранный комментарий"  
      comment.PublicInitBtnMakeLike()                  //* подключение логики формирования лайков/дизлайков на коментарий 
    })

  }

  //? InitBtnSortComments определяю обработчики для "радио кнопок сортировки" и кнопки "избранное"
  InitBtnSortComments(innerHtmlElement: HTMLInputElement): void {
    //* поиск элементов в DOM

    let newCommentField: HTMLInputElement | null = document.querySelector(`.new`)
    let innerHtmlElementSort: HTMLInputElement | null = document.querySelector(`.menu__text`);
    let showHtmlSort: HTMLInputElement | null = document.querySelector(`.mod-button`);

    let sortRadioBtns: NodeListOf<HTMLElement> | null = document.getElementsByName('level');
    console.log(sortRadioBtns);
    
    let sortFavoriteBtn: HTMLInputElement | null = document.querySelector(".j-favorites-show");

    if (!sortFavoriteBtn) { return }
    if (!innerHtmlElementSort) { return }


    if (innerHtmlElementSort.innerHTML === "По дате") {                                       //* первичная сортировка но времени при открытии(перезагрузке) страницы
      let comments = this.Load("comments")
      if (!comments) { return }
      this.DisplayComments(comments.sort(function (x: Comment, y: Comment) { return x.GetPrivateTimestamp() - y.GetPrivateTimestamp(); }), innerHtmlElement)
    }

    sortFavoriteBtn.addEventListener('click', () => {                                         //* обработчик кнопки отобразить только избранные комментарии
      let sortComments: [] = []
      let comments = this.Load("comments")
      if (!showHtmlSort) { return }
      if (!sortFavoriteBtn) { return }
      if (!newCommentField) { return }
      if (!comments) { return }


      sortFavoriteBtn.classList.toggle("m-favorites")                                         //* изменяю цвет нажатой кнопки

      if (sortFavoriteBtn.classList.contains("m-favorites")) {                                //* если кнопка нажата 
        showHtmlSort.style.pointerEvents = "none"
        newCommentField.style.display = "none"                                                //* удаляю из дом поля ввода (в разд. избран. комменты нельзя доб. коммент) 
        comments.forEach(comment => { if (comment.GetPrivateFavorite()) { sortComments.push(<never>comment) } });
        this.DisplayComments(<never>sortComments, innerHtmlElement)                                  //* отобрази только те комментарии где есть поле Favorite
      } else {
        showHtmlSort.style.pointerEvents = ""
        newCommentField.style.display = ""                                                    //* отображаю дом поля ввода нового комментария 
        this.DisplayComments(comments, innerHtmlElement)                                      //* отобрази все комментарии
      }
    })


    for (let index = 0; index < sortRadioBtns.length; index++) {
      const sortRadioBtn = <HTMLInputElement>sortRadioBtns[index];
      
    
      
      sortRadioBtn.addEventListener('click', () => {
        let comments = this.Load("comments")
        console.log(comments);
        if (!comments) { return }
        switch (sortRadioBtn.value) {
          case "По дате":
            if (!innerHtmlElementSort) { return }
            innerHtmlElementSort.innerHTML = "По дате"
            console.log("радио кнопка", sortRadioBtn.value);
            this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateTimestamp() - y.GetPrivateTimestamp(); }), innerHtmlElement)
            break;
          case "По количеству оценок":
            if (!innerHtmlElementSort) { return }
            innerHtmlElementSort.innerHTML = "По количеству оценок"
            this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateLikes() - y.GetPrivateLikes(); }), innerHtmlElement)
            break;
          case "По количеству ответов":
            if (!innerHtmlElementSort) { return }
            innerHtmlElementSort.innerHTML = "По количеству ответов"
            
            this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateAnswers().length - y.GetPrivateAnswers().length; }), innerHtmlElement)
            break;
        }
      });
    }
  }


  //?DisplayComments принимает список комментариев и рендерит  
  DisplayComments(comments: Comment[], innerHtmlElement: HTMLInputElement) {
    innerHtmlElement.innerHTML = ""
    comments.forEach(comment => {
      comment.PuplicDisplayComment(innerHtmlElement)   //* рендер коментария
      comment.PuplicDisplayCommentAnswers()            //* рендер ответов на коментарий
      comment.PublicInitBtnShowAnswer()                //* подключение логики формирования ответов на комментарий
      comment.PublicInitBtnMakeFavorite()              //* подключение логики формирования свойства "избранный комментарий"  
      comment.PublicInitBtnMakeLike()                  //* подключение логики формирования лайков/дизлайков на коментарий 
    });
  }

  InitTextAreaBigger() {
    let tArea = document.querySelector(".new__textarea");
    if (!tArea) { return }
    tArea.addEventListener('focus', () => {
      if (!tArea) { return }
      tArea.setAttribute("rows", "6")
    })

  }
}


export default Events
