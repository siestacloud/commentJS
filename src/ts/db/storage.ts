import Answer from "../core/answer.js";
import Comment from "../core/comment.js";


class Storage {

  public Load(key: string): Comment[] | null {
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
        privateCommentName: string
        privateFavorite: boolean
        privateCreateAt: string
        privateTimestamp: number
      }];
      privateFavorite: boolean
      privateCreateAt: string
      privateTimestamp: number
    }) => {
      let c = new Comment()
      c.SetPrivateName(parseItem.privateName)
      c.SetPrivateUnic(parseItem.privateUnic)
      c.SetPrivateIcon(parseItem.privateIcon)
      c.SetPrivateTimestamp(parseItem.privateTimestamp)
      c.SetPrivateCreateAt(parseItem.privateCreateAt)
      c.SetPrivateText(parseItem.privateText)
      c.SetPrivateLikes(parseItem.privateLikes)
      c.SetPrivateFavorite(parseItem.privateFavorite)
      
      
      if (parseItem.privateAnswers) {
        
        let answers: Answer[] = []
        if (parseItem.privateAnswers.length > 0) {

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
            answer.SetPrivateCommentName(ans.privateCommentName)
            answers.push(answer)

          });
        }
        c.SetPrivateAnswers(answers)
      }
      comments.push(c)
    });
    return comments
  }

  public Save(data: string): void {
    localStorage.setItem("comments", data)
  }
}

export default Storage
