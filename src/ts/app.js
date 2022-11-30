import Controllers from "./controllers/controllers.js";
import Models from "./models/models.js";
import Views from "./views/views.js";

class App {
  #privateControllers
  constructor() {
    this.#privateControllers
  }
  setPrivateControllers(controller) { this.#privateControllers = controller }

  init() { 
    console.log("------1-----------");
    this.#privateControllers.PageMain() 
  }
}

const app = new App()

// Точка входа
document.addEventListener("DOMContentLoaded", function () {
  const views = new Views()
  const models = new Models()
  const controllers = new Controllers()
  controllers.setPrivateModels(models)
  controllers.setPrivateViews(views)
  app.setPrivateControllers(controllers)
  app.init()
});


