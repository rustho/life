const Model = require ("./mvc/model.js");
const View = require ("./mvc/view.js");
const Controller = require ("./mvc/controller.js");

document.addEventListener("DOMContentLoaded",function(){
    var model = Model();
    var view = View();
    var controller = Controller(model,view);
    /* model.startLife(); */
})