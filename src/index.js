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
  let formattedDate = `${day} ${month}, ${dayText}`;
  let dateSelected = document.querySelector("#selection-details-1");
  console.log(formattedDate);
  dateSelected.innerHTML = formattedDate;
}

function formatHours(timestamp, timezone) {
  let date = new Date(timestamp);
  let timestampFixDate = timestamp;

  let hours = date.getUTCHours() + timezone;
  console.log(hours)

  if(hours > 23) {
    hours = hours - 24;
    timestampFixDate = timestampFixDate + 1000*60*60*24;
    console.log("ciao")
  }

  if(hours <= 0) {
    hours = 24 - hours;
    timestampFixDate = timestampFixDate - 1000*60*60*24;
  }
  
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  console.log(timestampFixDate);
  formatDate(timestampFixDate);
  
  return `${hours}:${minutes}`;
}

//Update Date

//Default data (current)
function changeWithCurrentCity(currentCity) {
  selectionCity.innerHTML = currentCity.data.name;
  getWeather(currentCity);
}

let apiKey = "e8969904bbe7bee3107bc2409d6f2662";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Milan&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(changeWithCurrentCity);

//Getting the weather by entering a city
let cityEntered = document.querySelector(".select-city");
let selectionCity = document.querySelector(".selection.city");
let temperatureValue = null;
let feelsLikeValue = null;

function getWeather(cityWeather) {
  selectionCity.innerHTML = cityWeather.data.name;

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityWeather.data.name}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);

  let hoursSelected = document.querySelector("#selection-details-2");
  hoursSelected.innerHTML = formatHours(cityWeather.data.dt * 1000, cityWeather.data.timezone / 3600);
  console.log(cityWeather.data.dt*1000)
  
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
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  unit.innerHTML = "°C";
}

function getCity() {
  event.preventDefault();
  if (cityEntered.value !== "") {
    selectionCity.innerHTML = cityEntered.value;
  } else {
    cityEntered.value = "Milan";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
  cityEntered.value = null;
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

  for (let i=1; i<7; i++){

    forecastElement.innerHTML += `
                  <div class="row align-items-center">
                  <div class="col-4 text-left">
                    ${formatHours(city.data.list[i].dt * 1000, city.data.city.timezone / 3600)}
                  </div>
                  <div class="col-2 text-center">
                    <img class="left-icon" src= "http://openweathermap.org/img/wn/${city.data.list[i].weather[0].icon}@2x.png" alt=${city.data.list[i].weather[0].description} width="50"/>
                  </div>
                  <div class="col-6 text-right" id="forecast-temperature">
                    <span class="forecast-temp">
                      ${Math.round(city.data.list[i].main.feels_like)} </span><span class="unit-forecast"> °C</span>
                  </div>            
                </div>
                <br/>                  
    `
  }

  formatHours(city.data.list[0].dt * 1000, city.data.city.timezone / 3600);

}

//Getting the weather by clicking on one of the city on the top
function getMilanWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Milan&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

document.querySelector("#city-Milan").addEventListener("click", getMilanWeather);

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
  unit.innerHTML = "°C";

let forecastItems = document.querySelectorAll(".forecast-temp");
let forecastUnits = document.querySelectorAll(".unit-forecast");

forecastItems.forEach(function (item) {
  let forecastTemp = item.innerHTML;
  item.innerHTML = Math.round(((forecastTemp -32) * 5) / 9)
})

forecastUnits.forEach(function (item) {
  let forecastUnit = item.innerHTML;
  item.innerHTML = "°C";
})

celsius.removeEventListener("click", changeInCelsius);
fahrenheit.addEventListener("click", changeInFahrenheit);
}

function changeInFahrenheit(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperatureFahrenheit = Math.round((Number(temperatureValue) * 9/5) + 32);
  temperature.innerHTML = `${temperatureFahrenheit}`
  let feelsLikeFahrenheit = Math.round((Number(feelsLikeValue) * 9/5) + 32);
  feelsLike.innerHTML = `${feelsLikeFahrenheit}`;
  unit.innerHTML = " °F";

  let forecastItems = document.querySelectorAll(".forecast-temp");
  let forecastUnits = document.querySelectorAll(".unit-forecast");

  forecastItems.forEach(function (item) {
    let forecastTemp = item.innerHTML;
    item.innerHTML = Math.round((forecastTemp * 9) / 5 + 32);
  });

  forecastUnits.forEach(function (item) {
    let forecastUnit = item.innerHTML;
    item.innerHTML = " °F";
  })

  celsius.addEventListener("click", changeInCelsius);
  fahrenheit.removeEventListener("click", changeInFahrenheit);
}

celsius.addEventListener("click", changeInCelsius);
fahrenheit.addEventListener("click", changeInFahrenheit);