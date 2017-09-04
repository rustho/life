import Model from "./tsmvc/model";
import View from "./tsmvc/view";
import Controller from "./tsmvc/controller";

document.addEventListener("DOMContentLoaded",function(){
    var model = new Model;
    var view = new View;
    var controller = Controller(model,view);
})