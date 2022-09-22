let currentTime = new Date();

let time = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
  "December",
];
let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
time.innerHTML = `${day}, <br/> ${month} ${date}, <br/> ${hour}:${minute}`;
function getDay (unix) {
  let data = new Date (unix*1000);
  let day = data.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days [day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class = "row">`;
  forecastData.forEach(function(forecastDay, index){
    showIcon(forecastDay.weather[0].icon);
    if (index < 5) {

    forecastHTML =
      forecastHTML +
      `<div class="col">
        <ul class="forecast-list">
          <li class = "forecast-day">${getDay(forecastDay.dt)}</li>
          <li class = "day-weather-icon"><i class="fa-solid fa-${description}"></i></li>
          <li class="day"><span>${Math.round(
            forecastDay.temp.max
          )}</span><span>°C</span></li>
          <li class="night"><span>${Math.round(
            forecastDay.temp.min
          )}</span><span>°C</span></li>
        </ul>
      </div>`; 
    }
  });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let units = "metric";
  let apiKey = "a3a670287c6f4b3ee8710439a67cc382";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&q=${city}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let currentCityInput = document.querySelector("#city-input");
  search(currentCityInput.value);
}



function showWeather(response) {
  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = celsiusTemperature;

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = response.data.weather[0].main;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(response.data.wind.speed)} m/s`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${response.data.main.humidity} %`;

  let mainIcon = document.querySelector("#main-icon");
  let weatherIcon = response.data.weather[0].icon;
  let weatherImg = document.querySelector("#weather-image");

  showIcon(weatherIcon);

  let fontAw = `<i class="fa-solid fa-${description}"></i>`;
  mainIcon.innerHTML = fontAw;
  let imageSource = `<img src="images/${description}.jpg" class = "weather-img" alt="${description}" />`;
  weatherImg.innerHTML = imageSource;

  getForecast (response.data.coord);
}

function showIcon (weatherIcon) {

  if (weatherIcon === "01d") {
    description = "sun";
  } else if (weatherIcon === "01n") {
    description = "moon";
  } else if (weatherIcon === "02d") {
    description = "cloud-sun";
  } else if (weatherIcon === "02n") {
    description = "cloud-moon";
  } else if (["03d", "03n", "04d", "04n"].includes(weatherIcon)) {
    description = "cloud";
  } else if (["09d", "09n"].includes(weatherIcon)) {
    description = "cloud-rain";
  } else if (weatherIcon === "10d") {
    description = "cloud-sun-rain";
  } else if (weatherIcon === "10n") {
    description = "cloud-moon-rain";
  } else if (["11d", "11n"].includes(weatherIcon)) {
    description = "cloud-bolt";
  } else if (["13d", "13n"].includes(weatherIcon)) {
    description = "snowflake";
  } else {
    description = "smog";
  }
 
}



function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a3a670287c6f4b3ee8710439a67cc382";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}



let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", showCity);

let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", showCurrentLocation);


search("Kyiv");
