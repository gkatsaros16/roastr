const cv = require('opencv4nodejs');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const FPS = 60;
const wCap = new cv.VideoCapture(0);
// wCap.set(cv.CAP_PROP_FRAME_WIDTH)
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image)
}, 1000 / FPS);

http.listen(4447, () => {
console.log('Listening on port 4447');
});

