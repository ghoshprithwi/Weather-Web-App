const api = {
  key: //ENTER OPENWEATHERMAP API KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

//getting current location on loading
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      getCurrentLocationWeather(pos);
    });
  }
};

//getting weather data using coordinates
function getCurrentLocationWeather(position) {
  fetch(
    `${api.baseUrl}weather?lat=${position.lat}&lon=${position.long}&units=metric&APPID=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

//getting weather data using cityName
function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

//parsing JSON to display results
function displayResults(weather) {
  console.log(JSON.stringify(weather));
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let wind = document.querySelector(".current .wind-value");
  wind.innerHTML = `${Math.round(weather.wind.speed) * 3.6} km/h`;

  let humidity = document.querySelector(".current .humidity-value");
  humidity.innerHTML = `${Math.round(weather.main.humidity)} %`;

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `<span>MIN</span> ${Math.round(
    weather.main.temp_min
  )}°c | ${Math.round(weather.main.temp_max)}°c <span>MAX</span>`;

  let latitude = weather.coord.lat;
  let longitude = weather.coord.lon;
  dynamicIcon(weather.weather[0].main, weather.timezone, latitude, longitude);
}

//changing icon  dynamically based on weather condition
function dynamicIcon(weatherDescp, timezone, lat, long) {
  let weatherIcon = document.querySelector("#weather-icon-img");
  let weatherCondition = weatherDescp.toLowerCase();
  let body = document.querySelector("body");
  console.log(weatherDescp);
  console.log(timezone);

  if (weatherCondition === "sunny" || weatherCondition === "clear") {
    weatherIcon.src = "./icons/sunny-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #ffb75e, #ed8f03)";
  } else if (weatherCondition === "rain") {
    weatherIcon.src = "./icons/rain-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #3a7bd5, #00d2ff)";
  } else if (weatherCondition === "haze") {
    weatherIcon.src = "./icons/haze-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #bdc3c7, #2c3e50)";
  } else if (weatherCondition === "clouds") {
    weatherIcon.src = "./icons/cloudy-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #ece9e6, #ffffff)";
  } else if (weatherCondition === "smoke") {
    weatherIcon.src = "./icons/smoke-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #bdc3c7, #2c3e50)";
  } else if (weatherCondition === "mist") {
    weatherIcon.src = "./icons/mist-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #3a7bd5, #00d2ff)";
  } else if (weatherCondition === "drizzle") {
    weatherCondition.src = "./icons/drizzle-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #3a7bd5, #00d2ff)";
  } else if (weatherCondition === "snow") {
    weatherCondition.src = "./icons/snow-icon.png";
    body.style.backgroundImage = "linear-gradient(to left, #ece9e6, #ffffff)";
  } else if (weatherCondition === "thunderstorm") {
    weatherCondition.src = "./icons/thunderstorm-icon.png";
    body.style.backgroundImage =
      "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  }
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
