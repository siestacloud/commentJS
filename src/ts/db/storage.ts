import Answer from "../core/answer.js";
import Comment from "../core/comment.js";


class Storage {

  public Load(key: string):Comment[]|null {


    let item = localStorage.getItem(key)
    if (!item) { return null }
    let parseItems = JSON.parse(item)
    let comments:Comment[] = []
    let answers:Answer[] = []

    parseItems.forEach((parseItem:{
      Unic: number
      Text: string
      Icon: string
      Name: string
      Likes: number
      Answers: [{
        Unic: number
        Text: string
        Icon: string
        Name: string
        Likes: number
        CommentLink: number
        Favorite: boolean
        CreateAt: string
        Timestamp: number
      }] | null;
      Favorite: boolean
      CreateAt: string
      Timestamp: number
    }) => {
      
      let comment = new Comment()
      comment.SetPrivateName(parseItem.Name)
      comment.SetPrivateUnic(parseItem.Unic)
      comment.SetPrivateIcon(parseItem.Icon)
      comment.SetPrivateTimestamp(parseItem.Timestamp)
      comment.SetPrivateCreateAt(parseItem.CreateAt)
      comment.SetPrivateText(parseItem.Text)
      comment.SetPrivateLikes(parseItem.Likes)
      comment.SetPrivateFavorite(parseItem.Favorite)
      if (parseItem.Answers) {
        parseItem.Answers.forEach(ans => {
          let answer = new Answer()
          answer.SetPrivateUnic(ans.Unic)
          answer.SetPrivateText(ans.Text)
          answer.SetPrivateIcon(ans.Icon)
          answer.SetPrivateName(ans.Name)
          answer.SetPrivateLikes(ans.Likes)
          answer.SetPrivateFavorite(ans.Favorite)
          answer.SetPrivateCreateAt(ans.CreateAt)
          answer.SetPrivateTimestamp(ans.Timestamp)
          answer.SetPrivateCommentLink(ans.Unic)
          answers.push(answer)
        });
      }
      comment.SetPrivateAnswers(answers)
      comments.push(comment)
    });
    return comments
  }

  public Save(data: string): void {
    localStorage.setItem("comments", data)
  }
}

export default Storage
