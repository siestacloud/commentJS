import Storage from "../db/storage.js";
import Answer from "./answer.js";


class Comment extends Storage {
  #privateName
  #privateUnic
  #privateIcon
  #privateTimestamp
  #privateCreateAt
  #privateText
  #privateLikes
  #privateFavorite
  #privateAnswers

  constructor() {
    super()
    this.#privateText
    this.#privateUnic
    this.#privateIcon
    this.#privateName
    this.#privateLikes
    this.#privateAnswers
    this.#privateFavorite
    this.#privateCreateAt
    this.#privateTimestamp
  }

  SetPrivateName(v) { this.#privateName = v }
  SetPrivateUnic(v) { this.#privateUnic = v }
  SetPrivateIcon(v) { this.#privateIcon = v }
  SetPrivateTimestamp(v) { this.#privateTimestamp = v }
  SetPrivateCreateAt(v) { this.#privateCreateAt = v }
  SetPrivateText(v) { this.#privateText = v }
  SetPrivateLikes(v) { this.#privateLikes = v }
  SetPrivateFavorite(v) { this.#privateFavorite = v }
  SetPrivateAnswers(v) { this.#privateAnswers = v }


  GetPrivateName() { return this.#privateName }
  GetPrivateUnic() { return this.#privateUnic }
  GetPrivateIcon() { return this.#privateIcon }
  GetPrivateTimestamp() { return this.#privateTimestamp }
  GetPrivateCreateAt() { return this.#privateCreateAt }
  GetPrivateText() { return this.#privateText }
  GetPrivateLikes() { return this.#privateLikes }
  GetPrivateFavorite() { return this.#privateFavorite }
  GetPrivateAnswers() { return this.#privateAnswers }


  // PuplicDisplayComment отображение коментария
  PuplicDisplayComment(innerHTMLElement) {
    let favoriteTextTemplate, favoriteCssMod
    this.#privateFavorite ? favoriteTextTemplate = "в избранном" : favoriteTextTemplate = "в избранное";
    this.#privateFavorite ? favoriteCssMod = "m-favorites" : favoriteCssMod = "";

    let wrapper = document.createElement('div')
    // console.log("wrapper",wrapper);
    const newComment = `
    <div class="comments__item" val="${this.#privateUnic}">
    <div class="comments__user user">
      <img src="${this.#privateIcon}" alt="">
      <div class="comments__wrap">
        <span>${this.#privateName}</span>
        <span class="date">${this.#privateCreateAt}</span>
      </div>
    </div>
    <div class="comments__wrapper">
      <div class="comments__text">
        <span>${this.#privateText}</span>
      </div>
      <div class="comments__btns">
        <div class="comments__answer j-btn-show-fields-for-answer">
          <img src="img/arrow_right.png" alt="">
          <p>ответить</p>
        </div>
        <div class="comments__greate j-btn-favorites ${favoriteCssMod}">
          <img src="img/heart_icon.png" alt="">
          <p>${favoriteTextTemplate}</p>
        </div>
        <div class="comments__like">
          <p id="dis" class="min"><span>-</span></p>
          <p id="count" class="count">${this.#privateLikes}</p>
          <p id="plus" class="plus"><span>+</span></p>
        </div>
        </div>
      <div class="comments__ans"></div>  
      `;
    wrapper.innerHTML += newComment;
    innerHTMLElement.insertBefore(wrapper, innerHTMLElement.firstChild);

  }


  // PuplicDisplayComment отображение всех отвeтов на коментарий
  PuplicDisplayCommentAnswers() {
    let innerHtmlAnswer = document.querySelector(`[val="${this.#privateUnic}"]`).querySelector(".comments__ans");
    console.log("innerHtmlAnswer", innerHtmlAnswer);
    this.#privateAnswers.forEach(ans => {
      let answer = new Answer()
      answer.SetPrivateUnic(ans.Unic)
      answer.SetPrivateText(ans.Text)
      answer.SetPrivateIcon(ans.Icon)
      answer.SetPrivateName(ans.Name)
      answer.SetPrivateLikes(ans.Likes)
      answer.SetPrivateFavorite(ans.Favorite)
      answer.SetPrivateCreateAt(ans.CreateAt)
      answer.SetPrivateTimestamp(ans.Timestamp)
      answer.SetPrivateCommentLink(this.GetPrivateUnic())
      answer.PuplicDisplayAnswer(innerHtmlAnswer)
      answer.PublicInitBtnMakeLike()
    });


  }


  PuplicSetComment(text) {
    this.#privateUnic = Math.random()
    this.#privateTimestamp = Date.now()
    this.#privateText = text
    this.#privateIcon = "img/user1.png"
    this.#privateName = "Siesta Cloud"
    this.#privateLikes = 0
    this.#privateAnswers = []
    this.#privateFavorite = false
    this.#privateCreateAt = new Date().toLocaleTimeString('en-GB', {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric"
    });
  }


  //privateSaveComment добавляю новый комментарий в массив в localStorage
  PublicSaveComment() {
    let userComments = this.Load("comments")

    userComments.forEach(comment => {
      if (comment.Unic === this.#privateUnic) {
        userComments = userComments.filter(item => item !== comment)
      }
    });
    userComments.push({
      Unic: this.#privateUnic,
      Text: this.#privateText,
      Icon: this.#privateIcon,
      Name: this.#privateName,
      Likes: this.#privateLikes,
      Answers: this.#privateAnswers,
      Favorite: this.#privateFavorite,
      CreateAt: this.#privateCreateAt,
      Timestamp: this.#privateTimestamp
    })
    this.Save(JSON.stringify(userComments))
  }


  //? PublicInitBtnShowAnswer обработчик кнопки "отобразить поле ввода ответа"
  //? - вешает обработчик на кнопку "создать ответ"
  PublicInitBtnShowAnswer() {
    let answerShow = new Answer()
    //* поиск элементов в DOM
    let tBtnShowAnswerField = document.querySelector(`[val="${this.#privateUnic}"]`).querySelector(".j-btn-show-fields-for-answer");
    tBtnShowAnswerField.addEventListener('click', () => {
      answerShow.PublicDisplayFieldsForAnswer(tBtnShowAnswerField.parentElement, this.#privateUnic)
    });
  }


  //? PublicInitBtnMakeFavorite обработчик кнопки "доб в избранное"
  //? менят цвет кнопки и сохраняет комментарий в localStorage с обновленным полем Favorite (true|false)
  PublicInitBtnMakeFavorite() {
    let favoriteBtn = document.querySelector(`[val="${this.#privateUnic}"]`).querySelector(".j-btn-favorites");
    
    let favoriteBtnTextVal = favoriteBtn.querySelector("p")
    favoriteBtn.addEventListener('click', () => {
      favoriteBtn.classList.toggle("m-favorites")
      if (favoriteBtn.classList.contains("m-favorites")) { // селектор (кнопка "в избранное" нажата) 
        favoriteBtnTextVal.innerHTML = "в избранном"
        console.log("favoriteBtn", favoriteBtnTextVal);
        this.#privateFavorite = true
        this.PublicSaveComment()
      } else { // селектора нет, коментарий нужно удалить
        favoriteBtnTextVal.innerHTML = "в избранное"
        this.#privateFavorite = false
        this.PublicSaveComment()
      }
    })
  }
  //? PublicInitBtnMakeLike определение обработчиков на кнопки "лайк" и "дизлайк" комментария
  PublicInitBtnMakeLike() {
    let likeBtn = document.querySelector(`[val="${this.#privateUnic}"]`).querySelector(".plus");
    let disLikeBtn = likeBtn.parentElement.querySelector("#dis")
    let oldCount = likeBtn.parentElement.querySelector("#count").innerHTML // 0

    likeBtn.addEventListener('click', () => {
      let count = likeBtn.parentElement.querySelector("#count").innerHTML
      let newCount = +count + 1 //1
      if (count - oldCount == 0 || count - oldCount == -1) {
        likeBtn.parentElement.querySelector("#count").innerHTML = newCount;
        this.#privateLikes = newCount
        this.PublicSaveComment()
      }
    })

    disLikeBtn.addEventListener('click', () => {
      let count = likeBtn.parentElement.querySelector("#count").innerHTML // 1 0
      let newCount = +count - 1 // 0 -1
      if (count - oldCount == 1 || count - oldCount == 0) {
        disLikeBtn.parentElement.querySelector("#count").innerHTML = newCount;
        this.#privateLikes = newCount
        this.PublicSaveComment()
      }
    })
  }

}


export default Comment;

