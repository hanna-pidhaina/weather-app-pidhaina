
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


  let units = "metric";
  let apiKey = "a3a670287c6f4b3ee8710439a67cc382";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}`;
  let apiUrlDisplayed = `${apiUrl}&q=Kyiv`;
  axios.get(apiUrlDisplayed).then(showWeather);



function showCity(event) {
  event.preventDefault();
  let currentCityInput = document.querySelector("#city-input");
  let apiUrlSearch = `${apiUrl}&q=${currentCityInput.value}`;
  axios.get(apiUrlSearch).then(showWeather);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", showCity);



function showWeather (response){

  let cityName = document.querySelector("h3");
  cityName.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = response.data.weather[0].main;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind ${response.data.wind.speed} m/s`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity} %`;
}

function getPosition (position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `${apiUrl}&lat=${latitude}&lon=${longitude}`;
  axios.get(apiUrlCurrent).then(showWeather);

}
function showCurrentLocation (){
navigator.geolocation.getCurrentPosition(getPosition);
}
let currentLocation = document.querySelector(".current-location-button");
currentLocation.addEventListener("click", showCurrentLocation);


