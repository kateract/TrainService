const express  = require('express');
const serial  = require('serialport');

const app = express();

var port = new serial('/dev/ttyACM0', {
    baudRate: 9600
});

port.on('error', (err) => {
    console.log('SerialPort Error: ' + err.message);
});

port.on('readable', () => console.log('Serial Data: ' + port.read()));

app.get('/', (req, res) => res.send('Hello World'));
app.get('/faster', (req, res)=> {
    port.write('f');
    res.send('Speeding Up!');
});

app.get('/slower', (req, res) => {
    port.write('s');
    res.send('Slowing Down!');
});

app.get('/reverse', (req, res) => {
    port.write('r');
    res.send('reversing!');
});

app.get('/stop', (req, res) => {
    port.write('q');
    res.send('emergency stop!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
