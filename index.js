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

let days = document.querySelector("#day-li");
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

// let whatCity = document.querySelector("#city-name").innerHTML; // TODO City is not being reassigned when it changes
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

// ------- weather

/* 
    let current = document.querySelector("#current-button");
    current.addEventListener("click", showDescription);
    axios.get(url).then(showDescription);
    
    function showDescription(response) {
      let test = response;
      console.log(test);
      let description = document.querySelector("#weather-description");
      let precipitation = document.querySelector("#precipitation");
      let wind = document.querySelector("#wind");
    } */

// ------- api

function nameIdk() {
  let whatCity = document.querySelector("#city-name").innerHTML;
  tempCity = whatCity;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&units=${units}&appid=${apiKey}`;
  console.log(whatCity.innerHTML);
  console.log(url);

  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let degrees = document.querySelector("#temperature-degrees");
  degrees.innerHTML = temperature;

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Precipitation: ${response.data.clouds.all}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}
