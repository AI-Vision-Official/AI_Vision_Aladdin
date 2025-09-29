const { app, BrowserWindow } = require("electron");
const path = require("path");

// eigen cache/map voor Electron
app.setPath("userData", path.join(__dirname, "userdata"));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // optioneel
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, "public", "index.html"));
  // win.webContents.openDevTools(); // optioneel
}

// electron ready
app.whenReady().then(createWindow);

// sluit app netjes
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// macOS activate
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

