import Answer from "./answer.js";

class Comment {
  private privateName: string
  private privateUnic: number
  private privateIcon: string
  private privateTimestamp: number
  private privateCreateAt: string
  private privateText: string
  private privateLikes: number
  private privateFavorite: boolean
  private privateAnswers: Answer[] 
  constructor() {
    this.privateText
    this.privateUnic
    this.privateIcon
    this.privateName
    this.privateLikes
    this.privateAnswers
    this.privateFavorite
    this.privateCreateAt
    this.privateTimestamp
  }

  SetPrivateName(v: string) { this.privateName = v }
  SetPrivateUnic(v: number) { this.privateUnic = v }
  SetPrivateIcon(v: string) { this.privateIcon = v }
  SetPrivateTimestamp(v: number) { this.privateTimestamp = v }
  SetPrivateCreateAt(v: string) { this.privateCreateAt = v }
  SetPrivateText(v: string) { this.privateText = v }
  SetPrivateLikes(v: number) { this.privateLikes = v }
  SetPrivateFavorite(v: boolean) { this.privateFavorite = v }
  SetPrivateAnswers(v: Answer[]) { this.privateAnswers = v }


  GetPrivateName(): string { return this.privateName }
  GetPrivateUnic(): number { return this.privateUnic }
  GetPrivateIcon(): string { return this.privateIcon }
  GetPrivateTimestamp(): number { return this.privateTimestamp }
  GetPrivateCreateAt(): string { return this.privateCreateAt }
  GetPrivateText(): string { return this.privateText }
  GetPrivateLikes(): number { return this.privateLikes }
  GetPrivateFavorite(): boolean { return this.privateFavorite }
  GetPrivateAnswers() { return this.privateAnswers }


  // PuplicDisplayComment отображение коментария
  PuplicDisplayComment(innerHTMLElement: HTMLInputElement) {
    let favoriteTextTemplate, favoriteCssMod
    this.privateFavorite ? favoriteTextTemplate = "в избранном" : favoriteTextTemplate = "в избранное";
    this.privateFavorite ? favoriteCssMod = "m-favorites" : favoriteCssMod = "";

    let wrapper = document.createElement('div')
    // console.log("wrapper",wrapper);
    const newComment = `
    <div class="comments__item" val="${this.privateUnic}">
    <div class="comments__user user">
      <img src="${this.privateIcon}" alt="">
      <div class="comments__wrap">
        <span>${this.privateName}</span>
        <span class="date">${this.privateCreateAt}</span>
      </div>
    </div>
    <div class="comments__wrapper">
      <div class="comments__text">
        <span>${this.privateText}</span>
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
          <p id="count" class="count">${this.privateLikes}</p>
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
    console.log("TEST");  

    let commentHTMLElement = <HTMLInputElement>document.querySelector(`[val="${this.privateUnic}"]`)
    let innerHtmlAnswer = <HTMLInputElement>commentHTMLElement.querySelector(".comments__ans");
    // console.log("innerHtmlAnswer", innerHtmlAnswer);
    // console.log("this.privateAnswers", this.privateAnswers);

    if (!this.privateAnswers) { 
      
      return
     }
    this.privateAnswers.forEach(answer => {
      answer.SetPrivateCommentLink(this.GetPrivateUnic())
      answer.PuplicDisplayAnswer(innerHtmlAnswer)
      answer.PublicInitBtnMakeLike()
    });


  }


  PuplicSetComment(text: string) {
    this.privateUnic = Math.random()
    this.privateTimestamp = Date.now()
    this.privateText = text
    this.privateIcon = "img/user1.png"
    this.privateName = "Siesta Cloud"
    this.privateLikes = 0
    this.privateAnswers = []
    this.privateFavorite = false
    this.privateCreateAt = new Date().toLocaleTimeString('en-GB', {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric"
    });
  }


  //privateSaveComment добавляю новый комментарий в массив в localStorage
  PublicSaveComment() {
    let items = <string>localStorage.getItem("comments")
    let userComments = <{
      privateUnic: number
      privateText: string
      privateIcon: string
      privateName: string
      privateLikes: number
      privateAnswers: {
        privateUnic: number
        privateText: string
        privateIcon: string
        privateName: string
        privateLikes: number
        privateCommentLink: number
        privateCommentName: string
        privateFavorite: boolean
        privateCreateAt: string
        privateTimestamp: number
      }[] ;
      privateFavorite: boolean
      privateCreateAt: string
      privateTimestamp: number
    }[]>JSON.parse(items)
    if (!userComments) { return }
    
    let comments:Comment[] = []
    userComments.forEach(comment => {

      let saveComment = new Comment()
      saveComment.SetPrivateName(comment.privateName)
      saveComment.SetPrivateUnic(comment.privateUnic)
      saveComment.SetPrivateIcon(comment.privateIcon)
      saveComment.SetPrivateTimestamp(comment.privateTimestamp)
      saveComment.SetPrivateCreateAt(comment.privateCreateAt)
      saveComment.SetPrivateText(comment.privateText)
      saveComment.SetPrivateLikes(comment.privateLikes)
      saveComment.SetPrivateFavorite(comment.privateFavorite)
      if (comment.privateAnswers) { // []
        let answers:Answer[] = []
        
        
        comment.privateAnswers.forEach(ans => {
          let answer = new Answer()
          answer.SetPrivateName(ans.privateName)
          answer.SetPrivateUnic(ans.privateUnic)
          answer.SetPrivateIcon(ans.privateIcon)
          answer.SetPrivateTimestamp(ans.privateTimestamp)
          answer.SetPrivateCreateAt(ans.privateCreateAt)
          answer.SetPrivateText(ans.privateText)
          answer.SetPrivateLikes(ans.privateLikes)
          answer.SetPrivateFavorite(ans.privateFavorite)
          answer.SetPrivateCommentLink(ans.privateCommentLink) 
          answer.SetPrivateCommentName(ans.privateCommentName) 
          answers.push(answer)
        });
        saveComment.SetPrivateAnswers(answers)
      }

      comments.push(saveComment)

      if (saveComment.GetPrivateUnic() === this.privateUnic) {
      if (!userComments) { return }
      comments = comments.filter(item => item !== saveComment)
      }
    });

    comments.push(this)

    // this.Save(JSON.stringify(userComments))
    // console.log("comments",comments);
    
    localStorage.setItem("comments", JSON.stringify(comments))


  }


  //? PublicInitBtnShowAnswer обработчик кнопки "отобразить поле ввода ответа"
  //? - вешает обработчик на кнопку "создать ответ"
  PublicInitBtnShowAnswer() {
    let answerShow = new Answer()
    //* поиск элементов в DOM

    let tbtnField = <HTMLInputElement>document.querySelector(`[val="${this.privateUnic}"]`)
    let tBtnShowAnswerField = <HTMLInputElement>tbtnField.querySelector(".j-btn-show-fields-for-answer");
    tBtnShowAnswerField.addEventListener('click', () => {

      answerShow.PublicDisplayFieldsForAnswer(<HTMLInputElement>tBtnShowAnswerField.parentElement, this.privateUnic,this.privateName)
      
    });
  }


  //? PublicInitBtnMakeFavorite обработчик кнопки "доб в избранное"
  //? менят цвет кнопки и сохраняет комментарий в localStorage с обновленным полем Favorite (true|false)
  PublicInitBtnMakeFavorite() {
    let commentHtmlEl = <HTMLInputElement>document.querySelector(`[val="${this.privateUnic}"]`)
    let favoriteBtn = <HTMLInputElement>commentHtmlEl.querySelector(".j-btn-favorites");

    let favoriteBtnTextVal = favoriteBtn.querySelector("p")
    favoriteBtn.addEventListener('click', () => {
      if (!favoriteBtnTextVal) { return }
      favoriteBtn.classList.toggle("m-favorites")
      if (favoriteBtn.classList.contains("m-favorites")) { // селектор (кнопка "в избранное" нажата) 
        favoriteBtnTextVal.innerHTML = "в избранном"
        console.log("favoriteBtn", favoriteBtnTextVal);
        this.privateFavorite = true
        this.PublicSaveComment()
      } else { // селектора нет, коментарий нужно удалить
        favoriteBtnTextVal.innerHTML = "в избранное"
        this.privateFavorite = false
        this.PublicSaveComment()
      }
    })
  }
  //? PublicInitBtnMakeLike определение обработчиков на кнопки "лайк" и "дизлайк" комментария
  PublicInitBtnMakeLike() {
    
    let commentHtmlEl = <HTMLInputElement>document.querySelector(`[val="${this.privateUnic}"]`)
    let likeBtn = <HTMLInputElement>commentHtmlEl.querySelector(".plus");

    let likeBtnWrapper = <HTMLInputElement>likeBtn.parentElement
    let disLikeBtn = <HTMLInputElement>likeBtnWrapper.querySelector("#dis")

    let counter = <HTMLInputElement>likeBtnWrapper.querySelector("#count")
    let oldCount = +counter.innerHTML // 0


    likeBtn.addEventListener('click', () => {
      let counter = <HTMLInputElement>likeBtnWrapper.querySelector("#count")
      let count = +counter.innerHTML // 0
      let newCount = +count + 1 //1
      if (count - oldCount == 0 || count - oldCount == -1) {
        counter.innerHTML = newCount.toString();
        this.privateLikes = newCount
        this.PublicSaveComment()
      }
    })


    disLikeBtn.addEventListener('click', () => {
      let counter = <HTMLInputElement>likeBtnWrapper.querySelector("#count")
      let count = +counter.innerHTML // 0

      let newCount = +count - 1 // 0 -1


      if (count - oldCount == 1 || count - oldCount == 0) {

        counter.innerHTML = newCount.toString();

        this.privateLikes = newCount
        this.PublicSaveComment()
      }
    })
  }

}


export default Comment;

