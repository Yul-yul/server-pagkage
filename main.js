
const {app, BrowserWindow} = require('electron')

let mainWindow

//创建窗口
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  //调试
  mainWindow.webContents.openDevTools()

  //连接
  mainWindow.loadURL('http://localhost:3000/home');

  //关闭
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

//加载完成后调用方法
app.on('ready', createWindow)

//没什么用的方法 1
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//没什么用的方法 2
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
