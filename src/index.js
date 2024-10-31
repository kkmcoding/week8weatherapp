function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature-now");
  temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humid");
  let windSpeedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let dayElement = document.querySelector("#today");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="smoji" />`;
  dayElement.innerHTML = formatDate(date);
  timeElement.innerHTML = formatTime(date);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}
function searchCity(city) {
  let apiKey = "6td3328233211ee5oa4079e6eef2f07b";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  searchCity(searchInput.value);
}
function formatDay(timestamp){
let date= new Date(timestamp * 1000);
let days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
return days[date.getDay()];
}
function getForecast(city){
  let apiKey = "6td3328233211ee5oa4079e6eef2f07b";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response){
  console.log(response.data);

let forecastHtml ="";

response.data.daily.forEach(function(day, index){
  if (index < 5){
  forecastHtml =
    forecastHtml +
    `
  <div id="weather-forecast-day">
          <div id="weather-forecast-date">${formatDay(day.time)}</div> 
          <div>
          <img src = "${day.condition.icon_url}" id="weather-forecast-icon"/>
          </div>
          <div id="weather-forecast-temperatures">
            <div id="temperature-max">${Math.round(
              day.temperature.maximum
            )}°</div>
            <div id="temperature-min">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
  </div>
  `;}
});
  let forecastElement=document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormInput = document.querySelector("#search-form");
searchFormInput.addEventListener("submit", search);

searchCity("London");