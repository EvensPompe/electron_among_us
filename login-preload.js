const { io } = require("socket.io-client");
const socket = io(`http://localhost:${3002}`);
const { ipcRenderer } = require("electron");
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#name");
  const messagectn = document.querySelector("#messagectn");
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() !== "") {
      socket.emit("client:user:new", { name: input.value, id: socket.id });
    } else {
      input.value = "";
      messagectn.classList.add("error");
      messagectn.classList.remove("hide");
      messagectn.innerText = "Veuillez entrer un nom d'utilisateur";
    }
  });
});

socket.on("server:auth:login", ({ success, message }) => {
  if (success) {
    ipcRenderer.send("close-app");
    window.close();
  } else {
    const messagectn = document.querySelector("#messagectn");
    messagectn.classList.add("error");
    messagectn.classList.remove("hide");
    messagectn.innerText = message;
  }
});
