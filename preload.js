const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('overlayControls', {
  minimize: () => ipcRenderer.send('window:minimize'),
  close: () => ipcRenderer.send('window:close'),
  toggleAlwaysOnTop: () => ipcRenderer.send('window:toggle-top'),
  reload: () => ipcRenderer.send('window:reload'),
  onReload: (callback) => ipcRenderer.on('tracker:reload', callback)
});
