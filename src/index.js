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
  let temperatureCelsius = Math.round((Number(temperature.innerHTML) - 32) * 5/9);
  temperature.innerHTML = `${temperatureCelsius}`;
}

function changeInFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = Math.round((Number(temperature.innerHTML) * 9/5) + 32);
  temperature.innerHTML = `${temperatureFahrenheit}`
}

document.querySelector("#celsius").addEventListener("click", changeInCelsius);
document.querySelector("#fahrenheit").addEventListener("click", changeInFahrenheit);

//Changing temperature
function changeWeatherDetails(cityWeather) {
  temperature.innerHTML = cityWeather.data.main.temp;
  //precipitation.innerHTML = 
  humidity.innerHTML = cityWeather.data.main.humidity;
  windSpeed.innerHTML = cityWeather.data.wind.speed;
}

let apiKey = "e8969904bbe7bee3107bc2409d6f2662";

function getCityWeather() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(changeWeatherDetails);
}

document.querySelector("#search").addEventListener("click", getCityWeather);

//Getting current location weather
function showCurrentLocationWeather(currentWeather) {
  selectionCity.innerHTML = currentWeather.data.name;
  temperature.innerHTML = currentWeather.data.main.temp;
  //precipitation = currentWeather.
  humidity.innerHTML = currentWeather.data.main.humidity;
  windSpeed.innerHTML = currentWeather.data.wind.speed; 
}

function getCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentLocationWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather);
}

document.querySelector("#current-location").addEventListener("click", getCurrentLocation);