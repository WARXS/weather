const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherInfoDiv = document.getElementById('weather-info');
const errorMessageDiv = document.getElementById('error-message');

const API_KEY = '7c8c6bb0b55342441588a7f174379b57'; 

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        displayError('Tolong masukkan nama kota.');
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Kota tidak ditemukan. Periksa ejaanmu.');
            } else {
                throw new Error(`Terjadi kesalahan: ${response.statusText}`);
            }
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
        console.error('Ada masalah saat mengambil data cuaca:', error); 
    }
}

function displayWeather(data) {
    weatherInfoDiv.innerHTML = ''; 
    errorMessageDiv.style.display = 'none';

    const { name, main, weather, wind } = data;
    const temperature = main.temp;
    const feelsLike = main.feels_like;
    const humidity = main.humidity;
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const windSpeed = wind.speed; 

    const weatherHtml = `
        <h2>${name}</h2>
        <p><strong>Suhu:</strong> ${temperature}°C</p>
        <p><strong>Terasa seperti:</strong> ${feelsLike}°C</p>
        <p><strong>Kondisi:</strong> ${description} <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${description}"></p>
        <p><strong>Kelembaban:</strong> ${humidity}%</p>
        <p><strong>Kecepatan Angin:</strong> ${windSpeed} m/s</p>
    `;

    weatherInfoDiv.innerHTML = weatherHtml;
    weatherInfoDiv.style.display = 'block'; 
}

function displayError(message) {
    weatherInfoDiv.style.display = 'none';
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}
