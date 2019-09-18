const {app, BrowserWindow, TouchBar} = require('electron')
const player = require('play-sound')(opts = {})

const {TouchBarLabel, TouchBarButton} = TouchBar

let window

function musicPlayer() {
  return player.play('music/mexinyan.mp3', {afplay: ['-v', 1 ]}, function(err){
    if (err) throw err
  })
}

let music = musicPlayer()

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
    if (!music.killed) {
      music.kill()
      stopMusicTouchBarButton.label = 'Play'
    } else {
      music = musicPlayer()
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
    width: 80,
    height: 30,
    backgroundColor: '#0000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
  animateFrames()
})


app.on('window-all-closed', () => {
  music.kill()
  app.quit()
})
