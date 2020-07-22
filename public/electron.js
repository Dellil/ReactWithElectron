const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const os = require("os");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: { nodeIntegration: true },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`,
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("ready", () => {
	/**
	 * will be needed to change file directory depends on your OS
	 */
    // react
    BrowserWindow.addDevToolsExtension(
        path.join(
            os.homedir(),
            "AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.8.2_0",
        ),
    );
    // redux
    BrowserWindow.addDevToolsExtension(
        path.join(
            os.homedir(),
            "AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.17.0_0",
        ),
    );
});

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
