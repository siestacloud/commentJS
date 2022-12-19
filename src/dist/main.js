/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/controllers/controllers.js":
/*!*******************************************!*\
  !*** ./src/js/controllers/controllers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Controllers {
    constructor() {
        this.privateModels;
        this.privateView;
    }
    SetPrivateModels(el) { this.privateModels = el; }
    SetPrivateViews(el) { this.privateView = el; }
    //? Отображение главной страницы 
    PageMain() {
        this.privateModels.GetPreviosComments();
        this.privateView.DisplayMain(); //* отображение раздела комментарии (подключение функционала)
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controllers);


/***/ }),

/***/ "./src/js/core/answer.js":
/*!*******************************!*\
  !*** ./src/js/core/answer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Answer {
    constructor() {
        this.privateText;
        this.privateUnic;
        this.privateIcon;
        this.privateName;
        this.privateLikes;
        this.privateTimestamp;
        this.privateFavorite;
        this.privateCreateAt;
        this.privateCommentLink;
        this.privateCommentName;
    }
    SetPrivateName(v) { this.privateName = v; }
    SetPrivateUnic(v) { this.privateUnic = v; }
    SetPrivateIcon(v) { this.privateIcon = v; }
    SetPrivateTimestamp(v) { this.privateTimestamp = v; }
    SetPrivateCreateAt(v) { this.privateCreateAt = v; }
    SetPrivateText(v) { this.privateText = v; }
    SetPrivateLikes(v) { this.privateLikes = v; }
    SetPrivateFavorite(v) { this.privateFavorite = v; }
    SetPrivateCommentLink(v) { this.privateCommentLink = v; }
    SetPrivateCommentName(v) { this.privateCommentName = v; }
    GetPrivateName() { return this.privateName; }
    GetPrivateUnic() { return this.privateUnic; }
    GetPrivateIcon() { return this.privateIcon; }
    GetPrivateTimestamp() { return this.privateTimestamp; }
    GetPrivateCreateAt() { return this.privateCreateAt; }
    GetPrivateText() { return this.privateText; }
    GetPrivateLikes() { return this.privateLikes; }
    GetPrivateFavorite() { return this.privateFavorite; }
    GetPrivateCommentLink() { return this.privateCommentLink; }
    GetPrivateCommentName() { return this.privateCommentName; }
    //? PublicDisplayFieldsForAnswer рендер поля ввода и кнопки отправки ответа на коментарий 
    PublicDisplayFieldsForAnswer(innerHTMLElement, commentUnic, commentName) {
        let wrapper = document.createElement('div');
        innerHTMLElement.after(wrapper);
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
    `;
        wrapper.innerHTML += newInput;
        let textAreaElement = document.querySelector(".j-answer-textarea");
        let tBtn = document.querySelector(".j-btn-send-answer");
        //* обработчик на кнопку отправки ответа
        tBtn.addEventListener('click', () => {
            if (!textAreaElement.value) {
                return;
            } //* обработка пустого поля ввода
            let inputHtmlField = document.querySelector(".j-answer-input");
            inputHtmlField.remove(); //* удаляю форму ввода ответа
            this.PuplicSetAnswer(textAreaElement.value, commentUnic, commentName); //* заполняю ответ данными и привязывую его к комментарию
            this.PuplicDisplayAnswer(wrapper); //* рендер коментария
            this.PublicSaveAnswer();
            this.PublicInitBtnMakeLike(); //* подключение логики формирования свойства "избранный комментарий"  
        });
    }
    //? PuplicDisplayAnswer отображение ответа к коментарию
    PuplicDisplayAnswer(innerHTMLElement) {
        let favoriteTextTemplate, favoriteCssMod;
        this.privateFavorite ? favoriteTextTemplate = "в избранном" : favoriteTextTemplate = "в избранное";
        this.privateFavorite ? favoriteCssMod = "m-favorites" : favoriteCssMod = "";
        let wrapper = document.createElement('div');
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
    PuplicSetAnswer(text, commentUnic, commentName) {
        this.privateCommentLink = commentUnic;
        this.privateCommentName = commentName;
        this.privateUnic = Math.random();
        this.privateTimestamp = Date.now();
        this.privateText = text;
        this.privateIcon = "img/user1.png";
        this.privateName = "Siesta Cloud";
        this.privateLikes = 0;
        this.privateFavorite = false;
        this.privateCreateAt = new Date().toLocaleTimeString('en-GB', {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric"
        });
    }
    //privateSaveComment добавляю новый комментарий в массив в localStorage
    PublicSaveAnswer() {
        let items = localStorage.getItem("comments");
        let userComments = JSON.parse(items);
        if (!userComments) {
            return;
        }
        userComments.forEach(comment => {
            if (comment.privateUnic == this.privateCommentLink) {
                let answers = comment.privateAnswers;
                if (answers) {
                    answers.forEach(answer => {
                        if (answer.privateUnic === this.privateUnic) {
                            if (!answers) {
                                return;
                            }
                            answers = answers.filter(item => item !== answer);
                        }
                    });
                }
                else {
                    answers = [];
                }
                answers.push(this);
                comment.privateAnswers = answers;
            }
        });
        localStorage.setItem("comments", JSON.stringify(userComments));
    }
    //? PublicInitBtnMakeLike определение обработчиков на кнопки "лайк" и "дизлайк" комментария
    PublicInitBtnMakeLike() {
        let commentHtmlEl = document.querySelector(`[val="${this.privateUnic}"]`);
        let likeBtn = commentHtmlEl.querySelector(".plus");
        let likeBtnWrapper = likeBtn.parentElement;
        let disLikeBtn = likeBtnWrapper.querySelector("#dis");
        let counter = likeBtnWrapper.querySelector("#count");
        let oldCount = +counter.innerHTML; // 0
        likeBtn.addEventListener('click', () => {
            let counter = likeBtnWrapper.querySelector("#count");
            let count = +counter.innerHTML; // 0
            let newCount = +count + 1; //1
            if (count - oldCount == 0 || count - oldCount == -1) {
                counter.innerHTML = newCount.toString();
                this.privateLikes = newCount;
                this.PublicSaveAnswer();
            }
        });
        disLikeBtn.addEventListener('click', () => {
            let counter = likeBtnWrapper.querySelector("#count");
            let count = +counter.innerHTML; // 0
            let newCount = +count - 1; // 0 -1
            if (count - oldCount == 1 || count - oldCount == 0) {
                counter.innerHTML = newCount.toString();
                this.privateLikes = newCount;
                this.PublicSaveAnswer();
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Answer);


/***/ }),

/***/ "./src/js/core/comment.js":
/*!********************************!*\
  !*** ./src/js/core/comment.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _answer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./answer.js */ "./src/js/core/answer.js");

class Comment {
    constructor() {
        this.privateText;
        this.privateUnic;
        this.privateIcon;
        this.privateName;
        this.privateLikes;
        this.privateAnswers;
        this.privateFavorite;
        this.privateCreateAt;
        this.privateTimestamp;
    }
    SetPrivateName(v) { this.privateName = v; }
    SetPrivateUnic(v) { this.privateUnic = v; }
    SetPrivateIcon(v) { this.privateIcon = v; }
    SetPrivateTimestamp(v) { this.privateTimestamp = v; }
    SetPrivateCreateAt(v) { this.privateCreateAt = v; }
    SetPrivateText(v) { this.privateText = v; }
    SetPrivateLikes(v) { this.privateLikes = v; }
    SetPrivateFavorite(v) { this.privateFavorite = v; }
    SetPrivateAnswers(v) { this.privateAnswers = v; }
    GetPrivateName() { return this.privateName; }
    GetPrivateUnic() { return this.privateUnic; }
    GetPrivateIcon() { return this.privateIcon; }
    GetPrivateTimestamp() { return this.privateTimestamp; }
    GetPrivateCreateAt() { return this.privateCreateAt; }
    GetPrivateText() { return this.privateText; }
    GetPrivateLikes() { return this.privateLikes; }
    GetPrivateFavorite() { return this.privateFavorite; }
    GetPrivateAnswers() { return this.privateAnswers; }
    // PuplicDisplayComment отображение коментария
    PuplicDisplayComment(innerHTMLElement) {
        let favoriteTextTemplate, favoriteCssMod;
        this.privateFavorite ? favoriteTextTemplate = "в избранном" : favoriteTextTemplate = "в избранное";
        this.privateFavorite ? favoriteCssMod = "m-favorites" : favoriteCssMod = "";
        let wrapper = document.createElement('div');
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
        let commentHTMLElement = document.querySelector(`[val="${this.privateUnic}"]`);
        let innerHtmlAnswer = commentHTMLElement.querySelector(".comments__ans");
        // console.log("innerHtmlAnswer", innerHtmlAnswer);
        // console.log("this.privateAnswers", this.privateAnswers);
        if (!this.privateAnswers) {
            return;
        }
        this.privateAnswers.forEach(answer => {
            answer.SetPrivateCommentLink(this.GetPrivateUnic());
            answer.PuplicDisplayAnswer(innerHtmlAnswer);
            answer.PublicInitBtnMakeLike();
        });
    }
    PuplicSetComment(text) {
        this.privateUnic = Math.random();
        this.privateTimestamp = Date.now();
        this.privateText = text;
        this.privateIcon = "img/user1.png";
        this.privateName = "Siesta Cloud";
        this.privateLikes = 0;
        this.privateAnswers = [];
        this.privateFavorite = false;
        this.privateCreateAt = new Date().toLocaleTimeString('en-GB', {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric"
        });
    }
    //privateSaveComment добавляю новый комментарий в массив в localStorage
    PublicSaveComment() {
        let items = localStorage.getItem("comments");
        let userComments = JSON.parse(items);
        if (!userComments) {
            return;
        }
        let comments = [];
        userComments.forEach(comment => {
            let saveComment = new Comment();
            saveComment.SetPrivateName(comment.privateName);
            saveComment.SetPrivateUnic(comment.privateUnic);
            saveComment.SetPrivateIcon(comment.privateIcon);
            saveComment.SetPrivateTimestamp(comment.privateTimestamp);
            saveComment.SetPrivateCreateAt(comment.privateCreateAt);
            saveComment.SetPrivateText(comment.privateText);
            saveComment.SetPrivateLikes(comment.privateLikes);
            saveComment.SetPrivateFavorite(comment.privateFavorite);
            if (comment.privateAnswers) { // []
                let answers = [];
                comment.privateAnswers.forEach(ans => {
                    let answer = new _answer_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
                    answer.SetPrivateName(ans.privateName);
                    answer.SetPrivateUnic(ans.privateUnic);
                    answer.SetPrivateIcon(ans.privateIcon);
                    answer.SetPrivateTimestamp(ans.privateTimestamp);
                    answer.SetPrivateCreateAt(ans.privateCreateAt);
                    answer.SetPrivateText(ans.privateText);
                    answer.SetPrivateLikes(ans.privateLikes);
                    answer.SetPrivateFavorite(ans.privateFavorite);
                    answer.SetPrivateCommentLink(ans.privateCommentLink);
                    answer.SetPrivateCommentName(ans.privateCommentName);
                    answers.push(answer);
                });
                saveComment.SetPrivateAnswers(answers);
            }
            comments.push(saveComment);
            if (saveComment.GetPrivateUnic() === this.privateUnic) {
                if (!userComments) {
                    return;
                }
                comments = comments.filter(item => item !== saveComment);
            }
        });
        comments.push(this);
        // this.Save(JSON.stringify(userComments))
        // console.log("comments",comments);
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    //? PublicInitBtnShowAnswer обработчик кнопки "отобразить поле ввода ответа"
    //? - вешает обработчик на кнопку "создать ответ"
    PublicInitBtnShowAnswer() {
        let answerShow = new _answer_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        //* поиск элементов в DOM
        let tbtnField = document.querySelector(`[val="${this.privateUnic}"]`);
        let tBtnShowAnswerField = tbtnField.querySelector(".j-btn-show-fields-for-answer");
        tBtnShowAnswerField.addEventListener('click', () => {
            answerShow.PublicDisplayFieldsForAnswer(tBtnShowAnswerField.parentElement, this.privateUnic, this.privateName);
        });
    }
    //? PublicInitBtnMakeFavorite обработчик кнопки "доб в избранное"
    //? менят цвет кнопки и сохраняет комментарий в localStorage с обновленным полем Favorite (true|false)
    PublicInitBtnMakeFavorite() {
        let commentHtmlEl = document.querySelector(`[val="${this.privateUnic}"]`);
        let favoriteBtn = commentHtmlEl.querySelector(".j-btn-favorites");
        let favoriteBtnTextVal = favoriteBtn.querySelector("p");
        favoriteBtn.addEventListener('click', () => {
            if (!favoriteBtnTextVal) {
                return;
            }
            favoriteBtn.classList.toggle("m-favorites");
            if (favoriteBtn.classList.contains("m-favorites")) { // селектор (кнопка "в избранное" нажата) 
                favoriteBtnTextVal.innerHTML = "в избранном";
                console.log("favoriteBtn", favoriteBtnTextVal);
                this.privateFavorite = true;
                this.PublicSaveComment();
            }
            else { // селектора нет, коментарий нужно удалить
                favoriteBtnTextVal.innerHTML = "в избранное";
                this.privateFavorite = false;
                this.PublicSaveComment();
            }
        });
    }
    //? PublicInitBtnMakeLike определение обработчиков на кнопки "лайк" и "дизлайк" комментария
    PublicInitBtnMakeLike() {
        let commentHtmlEl = document.querySelector(`[val="${this.privateUnic}"]`);
        let likeBtn = commentHtmlEl.querySelector(".plus");
        let likeBtnWrapper = likeBtn.parentElement;
        let disLikeBtn = likeBtnWrapper.querySelector("#dis");
        let counter = likeBtnWrapper.querySelector("#count");
        let oldCount = +counter.innerHTML; // 0
        likeBtn.addEventListener('click', () => {
            let counter = likeBtnWrapper.querySelector("#count");
            let count = +counter.innerHTML; // 0
            let newCount = +count + 1; //1
            if (count - oldCount == 0 || count - oldCount == -1) {
                counter.innerHTML = newCount.toString();
                this.privateLikes = newCount;
                this.PublicSaveComment();
            }
        });
        disLikeBtn.addEventListener('click', () => {
            let counter = likeBtnWrapper.querySelector("#count");
            let count = +counter.innerHTML; // 0
            let newCount = +count - 1; // 0 -1
            if (count - oldCount == 1 || count - oldCount == 0) {
                counter.innerHTML = newCount.toString();
                this.privateLikes = newCount;
                this.PublicSaveComment();
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);


/***/ }),

/***/ "./src/js/db/storage.js":
/*!******************************!*\
  !*** ./src/js/db/storage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_answer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/answer.js */ "./src/js/core/answer.js");
/* harmony import */ var _core_comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/comment.js */ "./src/js/core/comment.js");


class Storage {
    Load(key) {
        let item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        let parseItems = JSON.parse(item);
        let comments = [];
        parseItems.forEach((parseItem) => {
            let c = new _core_comment_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
            c.SetPrivateName(parseItem.privateName);
            c.SetPrivateUnic(parseItem.privateUnic);
            c.SetPrivateIcon(parseItem.privateIcon);
            c.SetPrivateTimestamp(parseItem.privateTimestamp);
            c.SetPrivateCreateAt(parseItem.privateCreateAt);
            c.SetPrivateText(parseItem.privateText);
            c.SetPrivateLikes(parseItem.privateLikes);
            c.SetPrivateFavorite(parseItem.privateFavorite);
            if (parseItem.privateAnswers) {
                let answers = [];
                if (parseItem.privateAnswers.length > 0) {
                    parseItem.privateAnswers.forEach(ans => {
                        let answer = new _core_answer_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
                        answer.SetPrivateUnic(ans.privateUnic);
                        answer.SetPrivateText(ans.privateText);
                        answer.SetPrivateIcon(ans.privateIcon);
                        answer.SetPrivateName(ans.privateName);
                        answer.SetPrivateLikes(ans.privateLikes);
                        answer.SetPrivateFavorite(ans.privateFavorite);
                        answer.SetPrivateCreateAt(ans.privateCreateAt);
                        answer.SetPrivateTimestamp(ans.privateTimestamp);
                        answer.SetPrivateCommentLink(ans.privateCommentLink);
                        answer.SetPrivateCommentName(ans.privateCommentName);
                        answers.push(answer);
                    });
                }
                c.SetPrivateAnswers(answers);
            }
            comments.push(c);
        });
        return comments;
    }
    Save(data) {
        localStorage.setItem("comments", data);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);


/***/ }),

/***/ "./src/js/models/models.js":
/*!*********************************!*\
  !*** ./src/js/models/models.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/storage.js */ "./src/js/db/storage.js");

class Models extends _db_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    GetPreviosComments() {
        let storageData = this.Load("comments");
        if (!storageData) {
            storageData = [];
            //save some comments in localStorage for test ...
            storageData.push({
                privateUnic: 0.111111111111111,
                privateText: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
                privateIcon: "img/user2.png",
                privateName: "Алексей Румянцев",
                privateLikes: 2,
                privateAnswers: [],
                privateFavorite: false,
                privateCreateAt: "28/11, 21:41",
                privateTimestamp: 1669730242100,
            });
            storageData.push({
                privateUnic: 0.222222222222,
                privateText: "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
                privateIcon: "img/user3.png",
                privateName: "Илья Златов",
                privateLikes: 5,
                privateAnswers: [],
                privateFavorite: false,
                privateCreateAt: "28/11, 21:51",
                privateTimestamp: 1669730242900,
            });
            this.Save(JSON.stringify(storageData));
            return;
        }
        if (storageData.length > 0) {
            return;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Models);


/***/ }),

/***/ "./src/js/views/events/events.js":
/*!***************************************!*\
  !*** ./src/js/views/events/events.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/storage.js */ "./src/js/db/storage.js");
/* harmony import */ var _core_comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/comment.js */ "./src/js/core/comment.js");


class Events extends _db_storage_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    //? InitBtnComment обработчик кнопки "создать комментарий"
    InitBtnComment() {
        let comment = new _core_comment_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
        //* поиск элементов в DOM
        let commentBtn = document.querySelector(".j-btn-send-comment");
        let textAreaElement = document.querySelector(".new__textarea");
        let innerHtmlElement = document.querySelector(".j-new-comment"); //* целевой элемент, для рендера комментария
        if (!commentBtn) {
            return;
        }
        commentBtn.addEventListener('click', () => {
            if (!textAreaElement) {
                return;
            }
            if (!textAreaElement.value) {
                return;
            }
            if (!innerHtmlElement) {
                return;
            } //* обработка пустого поля ввода 
            textAreaElement.setAttribute("rows", "2"); //* увел. зону ввода комментария
            comment.PuplicSetComment(textAreaElement.value); //* заполняю коментарий данными
            comment.PuplicDisplayComment(innerHtmlElement); //* рендер коментария
            comment.PublicSaveComment(); //* сохранение коментария
            comment.PublicInitBtnShowAnswer(); //* подключение логики формирования ответов на комментарий
            comment.PuplicDisplayCommentAnswers(); //* рендер ответов на коментарий
            comment.PublicInitBtnMakeFavorite(); //* подключение логики формирования свойства "избранный комментарий"  
            comment.PublicInitBtnMakeLike(); //* подключение логики формирования лайков/дизлайков на коментарий 
        });
    }
    //? InitBtnSortComments определяю обработчики для "радио кнопок сортировки" и кнопки "избранное"
    InitBtnSortComments(innerHtmlElement) {
        //* поиск элементов в DOM
        let newCommentField = document.querySelector(`.new`);
        let innerHtmlElementSort = document.querySelector(`.menu__text`);
        let showHtmlSort = document.querySelector(`.mod-button`);
        let sortRadioBtns = document.getElementsByName('level');
        let sortFavoriteBtn = document.querySelector(".j-favorites-show");
        if (!sortFavoriteBtn) {
            return;
        }
        if (!innerHtmlElementSort) {
            return;
        }
        if (innerHtmlElementSort.innerHTML === "По дате") { //* первичная сортировка но времени при открытии(перезагрузке) страницы
            let comments = this.Load("comments");
            if (!comments) {
                return;
            }
            this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateTimestamp() - y.GetPrivateTimestamp(); }), innerHtmlElement);
        }
        sortFavoriteBtn.addEventListener('click', () => {
            let sortComments = [];
            let comments = this.Load("comments");
            if (!showHtmlSort) {
                return;
            }
            if (!sortFavoriteBtn) {
                return;
            }
            if (!newCommentField) {
                return;
            }
            if (!comments) {
                return;
            }
            sortFavoriteBtn.classList.toggle("m-favorites"); //* изменяю цвет нажатой кнопки
            if (sortFavoriteBtn.classList.contains("m-favorites")) { //* если кнопка нажата 
                showHtmlSort.style.pointerEvents = "none";
                newCommentField.style.display = "none"; //* удаляю из дом поля ввода (в разд. избран. комменты нельзя доб. коммент) 
                comments.forEach(comment => { if (comment.GetPrivateFavorite()) {
                    sortComments.push(comment);
                } });
                this.DisplayComments(sortComments, innerHtmlElement); //* отобрази только те комментарии где есть поле Favorite
            }
            else {
                showHtmlSort.style.pointerEvents = "";
                newCommentField.style.display = ""; //* отображаю дом поля ввода нового комментария 
                this.DisplayComments(comments, innerHtmlElement); //* отобрази все комментарии
            }
        });
        for (let index = 0; index < sortRadioBtns.length; index++) {
            const sortRadioBtn = sortRadioBtns[index];
            sortRadioBtn.addEventListener('click', () => {
                let comments = this.Load("comments");
                if (!comments) {
                    return;
                }
                switch (sortRadioBtn.value) {
                    case "По дате":
                        if (!innerHtmlElementSort) {
                            return;
                        }
                        innerHtmlElementSort.innerHTML = "По дате";
                        this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateTimestamp() - y.GetPrivateTimestamp(); }), innerHtmlElement);
                        break;
                    case "По количеству оценок":
                        if (!innerHtmlElementSort) {
                            return;
                        }
                        innerHtmlElementSort.innerHTML = "По количеству оценок";
                        this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateLikes() - y.GetPrivateLikes(); }), innerHtmlElement);
                        break;
                    case "По количеству ответов":
                        if (!innerHtmlElementSort) {
                            return;
                        }
                        innerHtmlElementSort.innerHTML = "По количеству ответов";
                        this.DisplayComments(comments.sort(function (x, y) { return x.GetPrivateAnswers().length - y.GetPrivateAnswers().length; }), innerHtmlElement);
                        break;
                }
            });
        }
    }
    //?DisplayComments принимает список комментариев и рендерит  
    DisplayComments(comments, innerHtmlElement) {
        innerHtmlElement.innerHTML = "";
        comments.forEach(comment => {
            comment.PuplicDisplayComment(innerHtmlElement); //* рендер коментария
            comment.PublicInitBtnShowAnswer(); //* подключение логики формирования ответов на комментарий
            comment.PuplicDisplayCommentAnswers(); //* рендер ответов на коментарий
            comment.PublicInitBtnMakeFavorite(); //* подключение логики формирования свойства "избранный комментарий"  
            comment.PublicInitBtnMakeLike(); //* подключение логики формирования лайков/дизлайков на коментарий 
        });
    }
    InitTextAreaBigger() {
        let tArea = document.querySelector(".new__textarea");
        if (!tArea) {
            return;
        }
        tArea.addEventListener('focus', () => {
            if (!tArea) {
                return;
            }
            tArea.setAttribute("rows", "6");
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);


/***/ }),

/***/ "./src/js/views/views.js":
/*!*******************************!*\
  !*** ./src/js/views/views.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/events.js */ "./src/js/views/events/events.js");

// методы кдасса view отображают шаблоны html элементов с нужными данными.
class Views extends _events_events_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
    DisplayMain() {
        this.InitTextAreaBigger();
        let fieldForNewComment = document.querySelector(".j-new-comment");
        if (!fieldForNewComment) {
            return;
        }
        // console.log("view");
        this.InitBtnSortComments(fieldForNewComment);
        this.InitBtnComment();
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Views);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_controllers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/controllers.js */ "./src/js/controllers/controllers.js");
/* harmony import */ var _models_models_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/models.js */ "./src/js/models/models.js");
/* harmony import */ var _views_views_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/views.js */ "./src/js/views/views.js");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");




class App {
    constructor() {
        this.privateControllers;
    }
    SetPrivateControllers(controller) { this.privateControllers = controller; }
    Init() {
        this.privateControllers.PageMain();
    }
}
// Точка входа
document.addEventListener("DOMContentLoaded", function () {
    const views = new _views_views_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const models = new _models_models_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const controllers = new _controllers_controllers_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    controllers.SetPrivateModels(models);
    controllers.SetPrivateViews(views);
    const app = new App();
    app.SetPrivateControllers(controllers);
    app.Init();
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map