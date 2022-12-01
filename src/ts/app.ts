import Controllers from "./controllers/controllers.js";
import Models from "./models/models.js";
import Views from "./views/views.js";

class App {
  private privateControllers: Controllers
  constructor() {
    this.privateControllers
  }
  public SetPrivateControllers(controller: Controllers):void { this.privateControllers = controller }
  public Init():void {
    this.privateControllers.PageMain()
  }
}


// Точка входа
document.addEventListener("DOMContentLoaded", function () {
  const views: Views = new Views()
  const models: Models = new Models()
  const controllers: Controllers = new Controllers()
  controllers.SetPrivateModels(models)
  controllers.SetPrivateViews(views)
  const app: App = new App()
  
  app.SetPrivateControllers(controllers)
  app.Init()
});


