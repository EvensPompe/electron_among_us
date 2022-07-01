const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  const loginModal = new BrowserWindow({
    parent: win,
    modal: true,
    show: true,
    width: 500,
    height: 250,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "login-preload.js"),
      nodeIntegration: true,
    },
  });

  loginModal.loadFile("login.html");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const win = await createWindow();
      ipcMain.on("close-app", () => {
        win.hide();
      });
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
