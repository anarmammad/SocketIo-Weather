var http = require('http');
var URL = require('url').URL;
var socket_io = require('socket.io')();

const API_KEY = '6adbbfa23599d6234ced675985894f32';
// const API_KEY = 'YOUR-API-KEY';

var api_url =  new URL('http://api.openweathermap.org/data/2.5/weather');
api_url.searchParams.set('APPID', API_KEY);
api_url.searchParams.set('mode','html');

socket_io.on('connection', (socket) => {
    console.log(`Socket: ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Socket: ${socket.id} disconnected`);
    });
    socket.on('request-weather', (city) => {
        console.log(`Got ${city} from ${socket.id}`);
        api_url.searchParams.set("q", city);

        http.get(api_url.toString(), res => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if(res.statusCode === 404)
                    socket.emit('response-weather', '<h4>City cannot be found!</h4>');
                else if(res.statusCode === 400)
                    socket.emit('response-weather', '<h4>Nothing to geocode!</h4>');
                else
                    socket.emit('response-weather', data);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
});


module.exports = socket_io;

