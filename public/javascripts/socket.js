var socket = io();

var button = document.getElementById('getWeatherBtn');
var cityForm = document.getElementById('cityForm');
var weatherContainer = document.getElementById('weatherContainer');

button.addEventListener('click', () => {
    weatherContainer.innerHTML =
        '<div class="spinner-border text-primary" role="status">\n' +
        '  <span class="sr-only">Loading...</span>\n' +
        '</div>';
    socket.emit('request-weather', cityForm.value );
});

socket.on('response-weather', (city) => {
    weatherContainer.innerHTML = city;
});