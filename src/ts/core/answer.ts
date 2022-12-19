
class Answer {
  private privateName: string
  private privateUnic: number
  private privateIcon: string
  private privateTimestamp: number
  private privateCreateAt: string
  private privateText: string
  private privateLikes: number
  private privateFavorite: boolean
  private privateCommentLink: number
  private privateCommentName: string


  constructor() {
    this.privateText
    this.privateUnic
    this.privateIcon
    this.privateName
    this.privateLikes
    this.privateTimestamp
    this.privateFavorite
    this.privateCreateAt
    this.privateCommentLink
    this.privateCommentName
  }

  SetPrivateName(v: string) { this.privateName = v }
  SetPrivateUnic(v: number) { this.privateUnic = v }
  SetPrivateIcon(v: string) { this.privateIcon = v }
  SetPrivateTimestamp(v: number) { this.privateTimestamp = v }
  SetPrivateCreateAt(v: string) { this.privateCreateAt = v }
  SetPrivateText(v: string) { this.privateText = v }
  SetPrivateLikes(v: number) { this.privateLikes = v }
  SetPrivateFavorite(v: boolean) { this.privateFavorite = v }
  SetPrivateCommentLink(v: number) { this.privateCommentLink = v }
  SetPrivateCommentName(v: string) { this.privateCommentName = v }


  GetPrivateName() { return this.privateName }
  GetPrivateUnic() { return this.privateUnic }
  GetPrivateIcon() { return this.privateIcon }
  GetPrivateTimestamp() { return this.privateTimestamp }
  GetPrivateCreateAt() { return this.privateCreateAt }
  GetPrivateText() { return this.privateText }
  GetPrivateLikes() { return this.privateLikes }
  GetPrivateFavorite() { return this.privateFavorite }
  GetPrivateCommentLink() { return this.privateCommentLink }
  GetPrivateCommentName() { return this.privateCommentName }

  //? PublicDisplayFieldsForAnswer рендер поля ввода и кнопки отправки ответа на коментарий 
  PublicDisplayFieldsForAnswer(innerHTMLElement: HTMLInputElement, commentUnic: number,commentName:string) {
    let wrapper = document.createElement('div')
    innerHTMLElement.after(wrapper)
    const newInput = `
    <div class="comments__new new j-answer-input">
      <div class="new__user user">
        <img src="img/user1.png" alt="">
        <span>Максим Авдеенко</span>
      </div>
      <div class="new__wrapper">
        <div class="new__input">
          <span>Макс. 1000 символов</span>
          <textarea name="msg" maxlength="1000" rows="2" class="new__textarea j-answer-textarea"
            placeholder="Введите текст сообщения..."></textarea>
        </div>
        <button type="submit" class="new__btn j-btn-send-answer">Отправить </button>
      </div>
    </div>
    `
    wrapper.innerHTML += newInput;
    let textAreaElement = <HTMLInputElement>document.querySelector(".j-answer-textarea");
    let tBtn = <HTMLInputElement>document.querySelector(".j-btn-send-answer");

    //* обработчик на кнопку отправки ответа
    tBtn.addEventListener('click', () => {
      if (!textAreaElement.value) { return }                    //* обработка пустого поля ввода
      let inputHtmlField = <HTMLInputElement>document.querySelector(".j-answer-input")
      inputHtmlField.remove();                                  //* удаляю форму ввода ответа
      this.PuplicSetAnswer(textAreaElement.value, commentUnic,commentName)  //* заполняю ответ данными и привязывую его к комментарию
      this.PuplicDisplayAnswer(wrapper)                         //* рендер коментария
      this.PublicSaveAnswer()
      this.PublicInitBtnMakeLike()              //* подключение логики формирования свойства "избранный комментарий"  

    })

  }

  //? PuplicDisplayAnswer отображение ответа к коментарию
  PuplicDisplayAnswer(innerHTMLElement: HTMLDivElement) {
    let favoriteTextTemplate, favoriteCssMod
    this.privateFavorite ? favoriteTextTemplate = "в избранном" : favoriteTextTemplate = "в избранное";
    this.privateFavorite ? favoriteCssMod = "m-favorites" : favoriteCssMod = "";
    let wrapper = document.createElement('div')
    const newComment = `
    <div class="comments__item" val="${this.privateUnic}">
    <div class="comments__user user">
      <img src="${this.privateIcon}" alt="">
      <div class="comments__wrap">
        <span>${this.privateName}</span>
        <img style="width:20px;"src="img/arrow-grey.png" alt="">
        <span class="m-answerto">${this.privateCommentName}</span>
        <span class="date">${this.privateCreateAt}</span>
      </div>
    </div>
    <div class="comments__wrapper">
      <div class="comments__text">
        <span>${this.privateText}</span>
      </div>
      <div class="comments__btns">
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


  PuplicSetAnswer(text: string, commentUnic: number, commentName:string) {
    this.privateCommentLink = commentUnic
    this.privateCommentName = commentName
    this.privateUnic = Math.random()
    this.privateTimestamp = Date.now()
    this.privateText = text
    this.privateIcon = "img/user1.png"
    this.privateName = "Siesta Cloud"
    this.privateLikes = 0
    this.privateFavorite = false
    this.privateCreateAt = new Date().toLocaleTimeString('en-GB', {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric"
    });
  }


  //privateSaveComment добавляю новый комментарий в массив в localStorage
  PublicSaveAnswer() {
    let items = <string>localStorage.getItem("comments")
    let userComments = <{
      privateUnic: number
      privateText: string
      privateIcon: string
      privateName: string
      privateLikes: number
      privateAnswers: Answer[];
      privateFavorite: boolean
      privateCreateAt: string
      privateTimestamp: number
    }[]>JSON.parse(items)
    if (!userComments) { return }

    userComments.forEach(comment => {

      if (comment.privateUnic == this.privateCommentLink) {
        let answers = comment.privateAnswers
        if (answers) {
          answers.forEach(answer => {
            if (answer.privateUnic === this.privateUnic) {
              
              if (!answers) { return }
              answers = answers.filter(item => item !== answer)
            }
          });
          
          
        }else{

          answers = []
        }

        
        answers.push(this)
        comment.privateAnswers = answers

      }
    });
    localStorage.setItem("comments", JSON.stringify(userComments))
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
        this.PublicSaveAnswer()
      }
    })

    disLikeBtn.addEventListener('click', () => {
      let counter = <HTMLInputElement>likeBtnWrapper.querySelector("#count")
      let count = +counter.innerHTML // 0
      let newCount = +count - 1 // 0 -1


      if (count - oldCount == 1 || count - oldCount == 0) {

        counter.innerHTML = newCount.toString();

        this.privateLikes = newCount
        this.PublicSaveAnswer()
      }
    })
  }



}


export default Answer;

