import Answer from "../core/answer.js";
import Comment from "../core/comment.js";


class Storage {

  public Load(key: string): Comment[] | null {

    // console.log("Storage");

    let item = localStorage.getItem(key)
    if (!item) { return null }
    let parseItems = JSON.parse(item)
    let comments: Comment[] = []
    parseItems.forEach((parseItem: {
      privateUnic: number
      privateText: string
      privateIcon: string
      privateName: string
      privateLikes: number
      privateAnswers: [{
        privateUnic: number
        privateText: string
        privateIcon: string
        privateName: string
        privateLikes: number
        privateCommentLink: number
        privateFavorite: boolean
        privateCreateAt: string
        privateTimestamp: number
      }];
      privateFavorite: boolean
      privateCreateAt: string
      privateTimestamp: number
    }) => {
      // console.log(" элемент из лок", parseItem);
      let c = new Comment()
      // console.log("новый обьект создан ", c);


      c.SetPrivateName(parseItem.privateName)
      c.SetPrivateUnic(parseItem.privateUnic)
      c.SetPrivateIcon(parseItem.privateIcon)
      c.SetPrivateTimestamp(parseItem.privateTimestamp)
      c.SetPrivateCreateAt(parseItem.privateCreateAt)
      c.SetPrivateText(parseItem.privateText)
      c.SetPrivateLikes(parseItem.privateLikes)
      c.SetPrivateFavorite(parseItem.privateFavorite)
      
      
      if (parseItem.privateAnswers) {
        
        console.log(parseItem.privateAnswers);
        let answers: Answer[] = []
        if (parseItem.privateAnswers.length > 0) {
          console.log(" у эл из локал есть ответы ", parseItem.privateAnswers.length);

          parseItem.privateAnswers.forEach(ans => {
            
            let answer = new Answer()
            answer.SetPrivateUnic(ans.privateUnic)
            answer.SetPrivateText(ans.privateText)
            answer.SetPrivateIcon(ans.privateIcon)
            answer.SetPrivateName(ans.privateName)
            answer.SetPrivateLikes(ans.privateLikes)
            answer.SetPrivateFavorite(ans.privateFavorite)
            answer.SetPrivateCreateAt(ans.privateCreateAt)
            answer.SetPrivateTimestamp(ans.privateTimestamp)
            answer.SetPrivateCommentLink(ans.privateCommentLink)
            // console.log("!");
            answers.push(answer)

          });
          // console.log(" ответы для коментария подгружны  ", answers.length);
        }
        c.SetPrivateAnswers(answers)
      }
      comments.push(c)
      // console.log("итоговый массив комментариев обновлен ::: ", comments.length);
    });
    return comments
  }

  public Save(data: string): void {
    localStorage.setItem("comments", data)
  }
}

export default Storage
