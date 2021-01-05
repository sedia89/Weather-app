//Formatting date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"  
  ];
  
  let dayText = days[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  return `${day} ${month}, ${dayText}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Update Date

//Default data (current)
function changeWithCurrentCity(currentCity) {
  selectionCity.innerHTML = currentCity.data.name;
  getWeather(currentCity);
}

let apiKey = "e8969904bbe7bee3107bc2409d6f2662";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(changeWithCurrentCity);

//Getting the weather by entering a city
let cityEntered = document.querySelector(".select-city");
let selectionCity = document.querySelector(".selection.city");
let temperatureValue = null;
let feelsLikeValue = null;

function getWeather(cityWeather) {
  selectionCity.innerHTML = cityWeather.data.name;
  
  let dateSelected = document.querySelector("#selection-details-1");
  dateSelected.innerHTML = formatDate(cityWeather.data.dt * 1000);

  let hoursSelected = document.querySelector("#selection-details-2");
  hoursSelected.innerHTML = formatHours(cityWeather.data.dt * 1000);
  
  temperatureValue = cityWeather.data.main.temp;
  temperature.innerHTML = Math.round(temperatureValue);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = cityWeather.data.weather[0].description;
  humidity.innerHTML = `${cityWeather.data.main.humidity}%`;
  windSpeed.innerHTML = `${cityWeather.data.wind.speed} km/h`;
  feelsLikeValue = cityWeather.data.main.feels_like;
  feelsLike.innerHTML = Math.round(feelsLikeValue);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${cityWeather.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", cityWeather.data.weather[0].description);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather.data.name}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
}

function getCity() {
  event.preventDefault();
  if (cityEntered.value !== "") {
    selectionCity.innerHTML = cityEntered.value;
  } else {
    cityEntered.value = "Rome";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#search").addEventListener("click", getCity);

//Getting current location weather
function changeWithCurrentCity(currentCity) {
  event.preventDefault();
  selectionCity.innerHTML = currentCity.data.name;
  getWeather(currentCity);
}

function getCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWithCurrentCity);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather);
}

document.querySelector("#current-location").addEventListener("click", getCurrentLocation);

//Getting the forecast
function getForecast(city) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let i=0; i<5; i++){
    forecastElement.innerHTML += `
                  <div class="row align-items-center">
                  <div class="col-4 text-left">
                    ${formatHours(city.data.list[i].dt * 1000)}
                  </div>
                  <div class="col-2 text-center">
                    <img class="left-icon" src= "http://openweathermap.org/img/wn/${city.data.list[i].weather[0].icon}@2x.png" alt=${city.data.list[i].weather[0].description} width="50"/>
                  </div>
                  <div class="col-6 text-right">
                    ${Math.round(city.data.list[i].main.feels_like)} °C</span>
                  </div>            
                </div>
                <br/>                  
    `
  }
}

//Getting the weather by clicking on one of the city on the top
function getRomeWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-Rome").addEventListener("click", getRomeWeather);

function getLondonWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-London").addEventListener("click", getLondonWeather);

function getTokyoWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-Tokyo").addEventListener("click", getTokyoWeather);

function getNewYorkWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-NeWYork").addEventListener("click", getNewYorkWeather);

function getSidneyWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sidney&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-Sidney").addEventListener("click", getSidneyWeather);

function getBuenosAiresWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-BuenosAires").addEventListener("click", getBuenosAiresWeather);

//Changing unit of measure
let temperature = document.querySelector("#temperature")
let feelsLike = document.querySelector("#feels-like");
let unit = document.querySelector("#unit");

function changeInCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  temperature.innerHTML = Math.round(temperatureValue);
  let feelsLikeCelsius = Math.round((Number(feelsLike.innerHTML) - 32) * 5/9);
  feelsLike.innerHTML = Math.round(feelsLikeValue);
}

function changeInFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperatureFahrenheit = Math.round((Number(temperatureValue) * 9/5) + 32);
  temperature.innerHTML = `${temperatureFahrenheit}`
  let feelsLikeFahrenheit = Math.round((Number(feelsLikeValue) * 9/5) + 32);
  feelsLike.innerHTML = `${feelsLikeFahrenheit}`;
  unit.innerHTML = "°F";
}

celsius.addEventListener("click", changeInCelsius);
fahrenheit.addEventListener("click", changeInFahrenheit);