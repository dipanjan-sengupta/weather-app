const form = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#p-1');
const forecast = document.querySelector('#p-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location
    message.textContent = 'Loading...';
    forecast.textContent = '';
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error;
                return;
            }
            message.textContent = data.location;
            forecast.textContent = data.forecast;
        })
    })
})