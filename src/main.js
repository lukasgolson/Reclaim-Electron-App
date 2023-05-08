// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Reclaim',
	icon: 'images/favicon.ico',
    show: false,
    webPreferences: {
      preload: `${__dirname}/renderer.js`,
      partition: 'persist:MyAppSomethingUnique'
    }
  });

  mainWindow.on('did-start-navigation', function() {
    session.defaultSession.cookies.flushStore();
  });

  mainWindow.on('did-navigate', function() {
    session.defaultSession.cookies.flushStore();
  });

  mainWindow.loadURL("https://app.reclaim.ai/login");

  mainWindow.once('ready-to-show', () => {
  mainWindow.show()
})

  

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

function createMainMenu() {
  Menu.setApplicationMenu(null);
}


app.on("ready", () => {
  createWindow();
  createMainMenu();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.