import Controller from "./tsmvc/controller";
import Model from "./tsmvc/model";
import View from "./tsmvc/view";

document.addEventListener("DOMContentLoaded", () => {
    const model = new Model();
    const view = new View();
    const controller = Controller(model, view);
});
