const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const screenshot = require("screenshot-desktop");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: { nodeIntegration: true },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  takeSreenShot();
}

ipcMain.on("takeScreenShot", (event) => {
  takeSreenShot();
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function takeSreenShot() {
  //console.log("clicked start");
  const filename = Date.now();
  screenshot({ format: "png", filename: `./screenshot/${filename}.png` })
    .then((img) => {
      console.log(img);
    })
    .catch((err) => {
      console.log(err);
    });
}
