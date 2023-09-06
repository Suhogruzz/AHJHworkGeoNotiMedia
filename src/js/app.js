import Controller from "./Controller";

const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller(container);

  container.addEventListener("click", controller.onClick);
});