const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: 'process.execPath',
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      minWidth: 800, 
      minHeight: 600,
      width: 800, 
      height: 600,
      icon: path.join(__dirname, 'assets\\icons\\png\\tree.png'),
      webPreferences:{
        nodeIntegration: true
      }
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
app.on('ready', createWindow)



app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})