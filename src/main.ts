import App from "./app";
import { initMocks } from "./mocks";
import "./styles/global.css";

window.addEventListener("DOMContentLoaded", () => {
  initMocks().then(() => new App(document.getElementById("app")!));
});
