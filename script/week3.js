
let currentTime = new Date();

let time = document.querySelector("#current-time");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

function search (city){
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

///let celsiusTemperature = null;


function showWeather (response){
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
  console.log (response.data.weather[0].id);
  console.log (Math.round(Date.now()/1000));
  console.log(response.data.sys.sunset);

  let mainIcon = document.querySelector("#main-icon");
  let weatherDescription = response.data.weather[0].main;
  let weatherId = response.data.weather[0].id;
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;
  let unixTime = Math.round(Date.now()/1000);
  console.log(mainIcon.innerHTML);

   if (weatherDescription === "Thunderstorm" && sunrise < unixTime < sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
   }
   else if (weatherDescription === "Thunderstorm" && unixTime > sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt-moon"></i>`;
   }
   else if (weatherDescription === "Drizzle") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-drizzle"></i>`;
   }
   else if ([500, 501].includes(weatherId) && sunrise < unixTime < sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
   }
   else if ([500, 501].includes(weatherId) && unixTime > sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-moon-rain"></i>`;
   }
   else if ([502, 503, 504, 511].includes(weatherId)) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
   }
   else if ([520, 521].includes(weatherId)) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-showers"></i>`;
   }
   else if ([522, 531].includes(weatherId)) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
   }
   else if (weatherDescription === "Snow") {
     mainIcon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
   }

   else if (["Mist", "Fog"].includes(weatherDescription)) {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud-fog"></i>`;
   }
   else if (weatherDescription === "Smoke") {
     mainIcon.innerHTML = `<i class="fa-solid fa-smoke"></i>`;
   }
   else if (weatherDescription === "Haze") {
     mainIcon.innerHTML = `<i class="fa-solid fa-sun-haze"></i>`;
   }
   else if (["Dust", "Sand", "Ash"].includes(weatherDescription)) {
     mainIcon.innerHTML = `<i class="fa-solid fa-sun-dust"></i>`;
   }
   else if (weatherDescription === "Squall") {
     mainIcon.innerHTML = `<i class="fa-solid fa-wind-warning"></i>`;
   }
   else if (weatherDescription === "Tornado") {
     mainIcon.innerHTML = `<i class="fa-sharp fa-solid fa-tornado"></i>`;
   }
   else if (weatherDescription === "Clear" && sunrise < unixTime < sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-sun-cloud"></i>`;
   }
   else if (weatherDescription === "Clear" && unixTime > sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`;
   }
   else if (weatherId === "801" && sunrise < unixTime < sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-clouds-sun"></i>`;
   }
   else if (weatherId === "801" && unixTime > sunset) {
     mainIcon.innerHTML = `<i class="fa-solid fa-clouds-moon"></i>`;
   }
   else if (weatherId === "803") {
     mainIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
   }
   else if (weatherId === "804") {
     mainIcon.innerHTML = `<i class="fa-solid fa-clouds"></i>`;
   }
}

function getPosition (position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a3a670287c6f4b3ee8710439a67cc382";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  
}
function showCurrentLocation (){
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

search ("Kyiv");



