const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton} = TouchBar

let window

let music = true

const nyanTouchBarButton =  new TouchBarButton ({
  label:'',
  backgroundColor: '#000000',
  icon: 'images/mexinyan/mexinyan1.png',
})

const touchBarLabel = new TouchBarLabel({
  label: ' ',
  backgroundColor: '#000000',
})

const stopMusicTouchBarButton = new TouchBarButton({
  label: 'Stop',
  backgroundColor: '#000000',
  click: () => {
    if (music) {
      music = false
      window.loadURL('about:blank')
      stopMusicTouchBarButton.label = 'Play'
    } else {
      music = true
      window.loadURL('http://www.nyan.cat/index.php?cat=mexinyan')
      stopMusicTouchBarButton.label = 'Stop'
    }
  }
})

const touchBar = new TouchBar({
  items: [touchBarLabel, nyanTouchBarButton],
  escapeItem: stopMusicTouchBarButton,
})

let frame = 0;

const updateFrames = () => {
  if (frame === 12) {
    frame = 1;
  } else {
    frame += 1;
  }
  const nyanPath = `images/mexinyan/mexinyan${frame}.png`;
  nyanTouchBarButton.icon = nyanPath;
  touchBarLabel.label = touchBarLabel.label + ' '
  if (touchBarLabel.label.length === 180) {
    touchBarLabel.label = ''
  } 
}

const animateFrames = () => {
  setInterval(updateFrames, 80)
};

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#0000'
  })
  window.loadURL('http://www.nyan.cat/index.php?cat=mexinyan')
  window.setTouchBar(touchBar)
  animateFrames()
})


app.on('window-all-closed', () => {
  app.quit();
});