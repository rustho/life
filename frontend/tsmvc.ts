import Controller from './tsmvc/Controller';
import Model from './tsmvc/Model';
import View from './tsmvc/View';

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller <Model, View>(model, view);
});
