
// ********     SELECT ELEMENTS     *********

const form = document.querySelector('.item-form');
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit-btn');
const formControl = document.querySelector('.form-control');
const itemContainer = document.querySelector('.item-container');
const alert = document.querySelector('.alert');

let latitude;
let longitude;
let weatherUrl;

// *********    EVENT LISTENERS     ***********


form.addEventListener('submit', getWeatherForecast);

// get location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// *********    FUNCTIONS   *************

// success callback
function successCallback(position, e) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeatherForecast(e);
}

// error callback
function errorCallback(e) {
    latitude = 38.89511;
    longitude = -77.03637;
    getWeatherForecast(e);
} 

// show weather forecast
async function getWeatherForecast(e) {
    const inputValue = input.value;
    const apiKey = '69846c1d19268b13befd58c6a1aec822';
    if (latitude && longitude) {
        weatherUrl = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        latitude = '';
        longitude = '';
    } else if (Number(inputValue)) {
        weatherUrl = new URL(`http://api.openweathermap.org/data/2.5/weather?zip=${inputValue},US&appid=${apiKey}&units=metric`);
        e.preventDefault();
    } else {
        weatherUrl = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
        e.preventDefault();
    }
    const response = await fetch(weatherUrl);
    if (response.ok) {
        itemContainer.replaceChildren();
    } else if (!inputValue) {
        displayAlert('Please enter City or Zip-code(US)', 'danger');
    }
    const data = await response.json();
    const img = data.weather[0].icon;
    const city = data.name;
    const condition = data.weather[0].main;
    const temp = Math.floor(data.main.temp) + '°c';
    const maxTemp = Math.floor(data.main.temp_max);
    const minTemp = Math.floor(data.main.temp_min);
    const humidity = data.main.humidity;
    const feelsLike = Math.floor(data.main.feels_like);
    const imgUrl = new URL(`https://openweathermap.org/img/wn/${img}@2x.png`);
    console.log(data);
    console.log(imgUrl);
    showWeather(city, condition, imgUrl, temp, feelsLike, maxTemp, minTemp, humidity);
    input.value = '';
}

function showWeather(city, condition, img, temp, feelsLike, maxTemp, minTemp, humidity) {
    const tempElement = document.createElement('p');
    tempElement.classList.add('main-temp');
    const cityElement = document.createElement('p');
    cityElement.classList.add('city');
    const conditionElement = document.createElement('p');
    conditionElement.classList.add('conditions');
    const maxTempElement = document.createElement('span');
    maxTempElement.classList.add('max-min-conditions');
    const minTempElement = document.createElement('span');
    minTempElement.classList.add('max-min-conditions');
    const imgElement = document.createElement('img');
    imgElement.classList.add('image');
    const humidityElement = document.createElement('p');
    humidityElement.classList.add('humidity');
    const feelsLikeElement = document.createElement('p');
    feelsLikeElement.classList.add('feels-like');
    const p1 = document.createElement('p');
    p1.classList.add('span1');
    const p2 = document.createElement('p');
    p2.classList.add('span1');
    itemContainer.appendChild(imgElement);
    itemContainer.appendChild(cityElement);
    itemContainer.appendChild(conditionElement);
    imgElement.src = img;
    itemContainer.appendChild(tempElement);
    itemContainer.appendChild(minTempElement);
    itemContainer.appendChild(maxTempElement);
    itemContainer.appendChild(p2);
    itemContainer.appendChild(feelsLikeElement);
    itemContainer.appendChild(p1);
    itemContainer.appendChild(humidityElement);
    cityElement.innerHTML = city;
    feelsLikeElement.innerHTML = feelsLike + '°c';
    conditionElement.innerHTML = condition;
    tempElement.innerHTML = temp;
    minTempElement.innerHTML = '↓ ' + minTemp + '°c' + ' | ';
    maxTempElement.innerHTML = '↑ ' + maxTemp + '°c';
    humidityElement.innerHTML = humidity + '%';
    p1.innerHTML = 'humidity';
    p2.innerHTML = 'feels like';
}



function setBackToDefault() {
    latitude = '';
    longitude = '';
    weatherUrl = '';
    input.value = '';
}


// display alert
function displayAlert(text, action) {
    if (action === 'danger') {
        alert.innerHTML = text;
        alert.classList.add('alert-danger');
        setTimeout(() => {
            alert.classList.remove('alert-danger');
        }, 1250);
    } else if (action === 'success') {
        alert.innerHTML = text;
        alert.classList.add('alert-success');
        setTimeout(() => {
            alert.classList.remove('alert-success');
        }, 1250);
    }
}
