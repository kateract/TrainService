const express  = require('express');
const serial  = require('serialport');

const app = express();

var links = `<!doctype html><html><head><title>Train Control!</title></head>
	<body>
	<a href='./faster'>faster</a><br />
	<a href='./slower'>slower</a><br />
	<a href='./reverse'>reverse</a><br />
	<a href='./stop'>stop</a><br />
	`;
var close = `</body>`;
var message = (res, message) => {
    res.send(links + message + close);
}
var port = new serial('/dev/ttyACM0', {
    baudRate: 9600
});

port.on('error', (err) => {
    console.log('SerialPort Error: ' + err.message);
});

port.on('readable', () => console.log('Serial Data: ' + port.read()));

app.get('/', (req, res) => res.send(links));
app.get('/faster', (req, res)=> {
    port.write('f');
    message(res, 'Speeding Up!');
});

app.get('/slower', (req, res) => {
    port.write('s');
    message(res, 'Slowing Down!');
});

app.get('/reverse', (req, res) => {
    port.write('r');
    message(res, 'reversing!');
});

app.get('/stop', (req, res) => {
    port.write('q');
    message(res, 'emergency stop!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
