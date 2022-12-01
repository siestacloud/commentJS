import Models from "../models/models.js";
import Views from "../views/views.js";
class Controllers {
  private privateModels:Models
  private privateView:Views
  constructor() {
    this.privateModels
    this.privateView
  }
  public SetPrivateModels(el:Models):void { this.privateModels = el }
  public SetPrivateViews(el:Views):void { this.privateView = el }

  //? Отображение главной страницы 
  public PageMain():void {
    this.privateModels.GetPreviosComments();
    this.privateView.DisplayMain(); //* отображение раздела комментарии (подключение функционала)
  }
}
export default Controllers;