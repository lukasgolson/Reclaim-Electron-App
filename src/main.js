const {app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, dialog} = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Reclaim',
        icon: 'images/favicon.ico',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            partition: 'persist:ReclaimElectronApp',
            contextIsolation: true,
        }
    });

    mainWindow.loadURL("https://app.reclaim.ai/planner?range=DAY").catch(err => {
        dialog.showErrorBox('Error loading the URL', err.message);
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    mainWindow.webContents.on('did-fail-load', () => {
        dialog.showErrorBox('Error loading the URL', 'Please check your internet connection.');
    });

    mainWindow.webContents.openDevTools();
}

ipcMain.handle('get-html', async (event) => {
    const htmlFilePath = path.join(__dirname, 'sidebar.html');
    return fs.readFileSync(htmlFilePath, 'utf8');
});




function createTray() {
    tray = new Tray(nativeImage.createFromPath('images/favicon.ico'));
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

function createMainMenu() {
    Menu.setApplicationMenu(null);
}

app.on("ready", () => {
    createWindow();
    createMainMenu();
    createTray();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Ensuring single instance of the app
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // When another instance is launched, restore and focus the window
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}
