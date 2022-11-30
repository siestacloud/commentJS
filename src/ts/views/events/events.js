// import Models from "../../models/models.js";
import Storage from "../../db/storage.js";
import Comment from "../../core/comment.js";
// import Answer from "../../core/answer.js";



class Events extends Storage {



  //? InitBtnComment обработчик кнопки "создать комментарий"
  InitBtnComment() {
    let comment = new Comment()
    //* поиск элементов в DOM
    let commentBtn = document.querySelector(".j-btn-send-comment");
    let textAreaElement = document.querySelector(".new__textarea");
    let innerHtmlElement = document.querySelector(".j-new-comment") //* целевой элемент, для рендера комментария
    commentBtn.addEventListener('click', () => {
      if (!textAreaElement.value) { return }           //* обработка пустого поля ввода 
      textAreaElement.setAttribute("rows", 2)          //* увел. зону ввода комментария
      comment.PuplicSetComment(textAreaElement.value)  //* заполняю коментарий данными
      comment.PuplicDisplayComment(innerHtmlElement)   //* рендер коментария
      comment.PublicSaveComment()                      //* сохранение коментария
      comment.PublicInitBtnShowAnswer()                //* подключение логики формирования ответов на комментарий
      comment.PublicInitBtnMakeFavorite()              //* подключение логики формирования свойства "избранный комментарий"  
      comment.PublicInitBtnMakeLike()                  //* подключение логики формирования лайков/дизлайков на коментарий 
    })

  }

  //? InitBtnSortComments определяю обработчики для "радио кнопок сортировки" и кнопки "избранное"
  InitBtnSortComments(innerHtmlElement) {
    //* поиск элементов в DOM

    let newCommentField = document.querySelector(`.new`)
    let innerHtmlElementSort = document.querySelector(`.menu__text`);
    let showHtmlSort = document.querySelector(`.mod-button`);

    let sortRadioBtns = document.getElementsByName('level');
    let sortFavoriteBtn = document.querySelector(".j-favorites-show");

    if (innerHtmlElementSort.innerHTML === "По дате") {                                       //* первичная сортировка но времени при открытии(перезагрузке) страницы
      let comments = this.Load("comments")
      this.DisplayComments(comments.sort(function (x, y) { return x.Timestamp - y.Timestamp; }), innerHtmlElement)

    }

    sortFavoriteBtn.addEventListener('click', () => {                                         //* обработчик кнопки отобразить только избранные комментарии
      let sortComments = []
      let comments = this.Load("comments")
      sortFavoriteBtn.classList.toggle("m-favorites")                                         //* изменяю цвет нажатой кнопки
      if (sortFavoriteBtn.classList.contains("m-favorites")) {                                //* если кнопка нажата 
        showHtmlSort.style.pointerEvents = "none"
        newCommentField.style.display = "none"                                                //* удаляю из дом поля ввода (в разд. избран. комменты нельзя доб. коммент) 
        comments.forEach(comment => { if (comment.Favorite) { sortComments.push(comment) } });
        this.DisplayComments(sortComments, innerHtmlElement)                                  //* отобрази только те комментарии где есть поле Favorite
      } else {
        showHtmlSort.style.pointerEvents = ""
        newCommentField.style.display = ""                                                    //* отображаю дом поля ввода нового комментария 
        this.DisplayComments(comments, innerHtmlElement)                                      //* отобрази все комментарии
      }
    })


    sortRadioBtns.forEach(sortRadioBtn => {                                                   //* вешаю обработчики на  кнопки сортировки комментариев
      sortRadioBtn.addEventListener('click', () => {
        let comments = this.Load("comments")
        switch (sortRadioBtn.value) {
          case "По дате":
            innerHtmlElementSort.innerHTML = "По дате"
            this.DisplayComments(comments.sort(function (x, y) { return x.Timestamp - y.Timestamp; }), innerHtmlElement)
            break;
          case "По количеству оценок":
            innerHtmlElementSort.innerHTML = "По количеству оценок"
            this.DisplayComments(comments.sort(function (x, y) { return x.Likes - y.Likes; }), innerHtmlElement)
            break;
          case "По количеству ответов":
            innerHtmlElementSort.innerHTML = "По количеству ответов"
            this.DisplayComments(comments.sort(function (x, y) { return x.Answers.length - y.Answers.length; }), innerHtmlElement)
            break;
        }
      });
    })

  }


  //?DisplayComments принимает список комментариев и рендерит  
  DisplayComments(comments, innerHtmlElement) {
    innerHtmlElement.innerHTML = ""
    comments.forEach(v => {
      let comment = new Comment()
      comment.SetPrivateUnic(v.Unic)
      comment.SetPrivateText(v.Text)
      comment.SetPrivateIcon(v.Icon)
      comment.SetPrivateName(v.Name)
      comment.SetPrivateLikes(v.Likes)
      comment.SetPrivateAnswers(v.Answers)
      comment.SetPrivateFavorite(v.Favorite)
      comment.SetPrivateCreateAt(v.CreateAt)
      comment.SetPrivateTimestamp(v.Timestamp)
      comment.PuplicDisplayComment(innerHtmlElement)   //* рендер коментария
      comment.PuplicDisplayCommentAnswers()            //* рендер ответов на коментарий
      comment.PublicInitBtnShowAnswer()                //* подключение логики формирования ответов на комментарий
      comment.PublicInitBtnMakeFavorite()              //* подключение логики формирования свойства "избранный комментарий"  
      comment.PublicInitBtnMakeLike()                  //* подключение логики формирования лайков/дизлайков на коментарий 
    });
  }



  InitTextAreaBigger() {
    let tArea = document.querySelector(".new__textarea");
    tArea.addEventListener('focus', () => {
      tArea.setAttribute("rows", 6)
    })

  }

  InitBtnLike() {
    let likeBtns = document.querySelectorAll(".plus");
    likeBtns.forEach(likeBtn => {
      console.log(likeBtn);
      let dis = likeBtn.parentElement.querySelector("#dis")
      let oldCount = likeBtn.parentElement.querySelector("#count").innerHTML // 0
      likeBtn.addEventListener('click', () => {
        let count = likeBtn.parentElement.querySelector("#count").innerHTML
        let newCount = +count + 1 //1
        console.log();
        if (count - oldCount == 0 || count - oldCount == -1) {
          likeBtn.parentElement.querySelector("#count").innerHTML = newCount;
          let c = this.Load("comments")
          c.forEach(comment => {
            if (comment.unic == likeBtn.parentElement.parentElement.parentElement.parentElement.getAttribute('val')) {
              comment.likes = newCount
              this.Save(JSON.stringify(c))
            }
          });
        }
      })
      dis.addEventListener('click', () => {
        let count = likeBtn.parentElement.querySelector("#count").innerHTML // 1 0
        let newCount = +count - 1 // 0 -1
        if (count - oldCount == 1 || count - oldCount == 0) {
          dis.parentElement.querySelector("#count").innerHTML = newCount;
          let c = this.Load("comments")
          c.forEach(comment => {
            if (comment.unic == dis.parentElement.parentElement.parentElement.parentElement.getAttribute('val')) {
              comment.likes = newCount
              this.Save(JSON.stringify(c))
            }
          });
        }
      })
    });
  }




}



export default Events
