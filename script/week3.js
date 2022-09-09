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
time.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute}`;

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

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", showCity);

function showWeather(response) {
  console.log(response.data);

  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = celsiusTemperature;

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = response.data.weather[0].main;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind ${response.data.wind.speed} m/s`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity} %`;
  console.log(response.data.weather[0].id);
  console.log(Math.round(Date.now() / 1000));
  console.log(response.data.sys.sunset);

  let mainIcon = document.querySelector("#main-icon");
  let weatherIcon = response.data.weather[0].icon;
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;
  let unixTime = Math.round(Date.now() / 1000);

   //let {icon} = conds.find((x) => x.cond);
//mainIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  if (weatherIcon === "01d") {
    mainIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  else if (weatherIcon === "01n") {
     mainIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
  else if (weatherIcon === "02d") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
  }
  else if (weatherIcon === "02n") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-moon"></i>`;
  }
  else if (["03d", "03n"].includes(weatherIcon)) {
    mainIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  else if (["04d", "04n"].includes(weatherIcon)) {
    mainIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  else if (["09d", "09n"].includes(weatherIcon)) {
    mainIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  }
  else if (weatherIcon === "10d") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
  }
  else if (weatherIcon === "10n") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-moon-rain"></i>`;
  }
  else if (["11d", "11n"].includes(weatherIcon)) {
    mainIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  }
  else if (["13d", "13n"].includes(weatherIcon)) {
    mainIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
   else {
    mainIcon.innerHTML = `<i class="fa-solid fa-smog"></i>`;
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
let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", showCurrentLocation);

function changeToC(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = celsiusTemperature;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToC);

function changeToF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToF);
search("Kyiv");
