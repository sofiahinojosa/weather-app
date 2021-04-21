let now = new Date();
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();

let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day = daysOfTheWeek[now.getDay()];

let days = document.querySelector("#day-description");
days.innerHTML = `${day} ${hours}:${minutes}`;

// search engine

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;
  nameIdk();
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", city);

// change c to f and api

let change = 0;
let apiKey = "4b314f77d77d39ad00e3f1ae01186f3d";
let units = "metric";
let tempCity;
let url;

function changeTheSystem() {
  if (change === 0) {
    units = "imperial";
    change = 1;
  } else {
    units = "metric";
    change = 0;
  }
  nameIdk();
}
let changeSystem = document.querySelector("#changeToF");
changeSystem.addEventListener("click", changeTheSystem);

// ------- api

function nameIdk() {
  let whatCity = document.querySelector("#city-name").innerHTML;
  tempCity = whatCity;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4b314f77d77d39ad00e3f1ae01186f3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature-degrees");
  degrees.innerHTML = temperature;
  
  let precipitation = document.querySelector("#precipitation-description");
  precipitation.innerHTML = `Precipitation: ${response.data.clouds.all}%`;
  
  let wind = document.querySelector("#wind-description");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#main-icon")
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    console.log(response.data.weather[0].icon);

    getForecast(response.data.coord);
}
nameIdk();

// forecast :3

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let dayz = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  dayz.forEach(function (date) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${date}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}
