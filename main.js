const { app, BrowserWindow, ipcMain, shell } = require('electron');
let win;
const TRACKER_URL = 'https://flexytracker.netlify.app/';
function createWindow() {
  win = new BrowserWindow({
    width: 500, height: 760, minWidth: 360, minHeight: 420,
    frame: false, transparent: true, backgroundColor: '#00000000',
    resizable: true, movable: true, alwaysOnTop: true, skipTaskbar: false,
    autoHideMenuBar: true,
    webPreferences: { preload: __dirname + '/preload.js', contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.loadFile('index.html');
  win.on('closed', () => { win = null; });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (!win) createWindow(); });
ipcMain.on('window:minimize', () => win?.minimize());
ipcMain.on('window:close', () => win?.close());
ipcMain.on('window:toggle-top', () => { if (win) win.setAlwaysOnTop(!win.isAlwaysOnTop(), 'screen-saver'); });
ipcMain.on('window:reload', () => win?.webContents.send('tracker:reload'));
ipcMain.on('window:open-browser', () => shell.openExternal(TRACKER_URL));
