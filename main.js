const { app, BrowserWindow } = require('electron');
const path = require('node:path')

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(`https://m.rvc.ac.uk/campusm/home#menu`);
  //win.loadFile('index.html');

  const ses = win.webContents.session;

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform!== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});