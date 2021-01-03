//Formatting date
let currentDate = new Date();

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

let currentDayText = days[currentDate.getDay()];
let currentHours = currentDate.getUTCHours();

if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = currentDate.getUTCMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentDay = currentDate.getDate();
let currentMonth = months[currentDate.getMonth()];

let selectionDetails1 = document.querySelector("#selection-details-1");
selectionDetails1.innerHTML = `${currentDayText}, ${currentHours}:${currentMinutes}`;

let selectionDetails2 = document.querySelector("#selection-details-2");
selectionDetails2.innerHTML = `${currentDay} ${currentMonth}`;

//Update Date
let apiKey = "e8969904bbe7bee3107bc2409d6f2662";

//Default data (current)
function changeWithCurrentCity(currentCity) {
  selectionCity.innerHTML = currentCity.data.name;
  getWeather(currentCity);
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(changeWithCurrentCity);

//Changing city
let cityEntered = document.querySelector(".select-city");
let selectionCity = document.querySelector(".selection.city");

function changeCity(){
  if (cityEntered.value !== "") {
    selectionCity.innerHTML = cityEntered.value;
  } else {
    cityEntered.value = "Rimini";
  }
}

document.querySelector("#search").addEventListener("click", changeCity)

//Changing unit of measure
let temperature = document.querySelector("#temperature")

function changeInCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperatureCelsius = Math.round((Number(temperature.innerHTML) - 32) * 5/9);
  temperature.innerHTML = `${temperatureCelsius}`;
}

function changeInFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperatureFahrenheit = Math.round((Number(temperature.innerHTML) * 9/5) + 32);
  temperature.innerHTML = `${temperatureFahrenheit}`
}

celsius.addEventListener("click", changeInCelsius);
fahrenheit.addEventListener("click", changeInFahrenheit);

//Getting the weather by entering a city
function getWeather(cityWeather) {
  selectionCity.innerHTML = cityWeather.data.name;
  temperature.innerHTML = Math.round(cityWeather.data.main.temp);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = cityWeather.data.weather[0].description;
  humidity.innerHTML = `${cityWeather.data.main.humidity}%`;
  windSpeed.innerHTML = `${cityWeather.data.wind.speed} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${cityWeather.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", cityWeather.data.weather[0].description);
}

function getCity() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeather);
}

document.querySelector("#search").addEventListener("click", getCity);

//Getting current location weather
function changeWithCurrentCity(currentCity) {
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