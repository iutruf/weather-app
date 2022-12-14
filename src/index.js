function formatDate() {
  let todayDate = new Date();
  let todayDayBig = todayDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let todayMonthBig = todayDate.getMonth();
  let months = [
    "Jan",
    "Fab",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let todayDateBig = todayDate.getDate();
  return `${days[todayDayBig]}, ${months[todayMonthBig]} ${todayDateBig}`;
}
let dateNow = document.querySelector("#current-date");
dateNow.innerHTML = formatDate();

function changeTheme() {
  let time = new Date();
  let link = document.querySelector("#weather-stylesheet");
  if (time.getHours() >= 6 && time.getHours() < 18) {
    link.setAttribute(`href`, `src/styles-day.css`);
  } else {
    link.setAttribute(`href`, `src/styles.css`);
  }
}
changeTheme();

function formatTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours} : ${minutes}`;
}
let timeNow = document.querySelector("#current-time");
timeNow.innerHTML = formatTime();

function formatDay(timestamp, index) {
  let currentDate = new Date(timestamp * 1000);

  let day = currentDate.getDay();
  let date = currentDate.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (index === 0) {
    return `Today`;
  } else {
    return `${days[day]}, ${date}`;
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    let direction = forecastDay.wind_deg;
    if (
      forecastDay.wind_deg >= 337.5 &&
      forecastDay.wind_deg <= 360 &&
      forecastDay.wind_deg >= 0 &&
      forecastDay.wind_deg < 22.5
    ) {
      direction = `<img src="src/images/wind_w.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 22.5 && forecastDay.wind_deg < 67.5) {
      direction = `<img src="src/images/wind_sw.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 67.5 && forecastDay.wind_deg < 112.5) {
      direction = `<img src="src/images/wind_s.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 112.5 && forecastDay.wind_deg < 157.5) {
      direction = `<img src="src/images/wind_se.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 157.5 && forecastDay.wind_deg < 202.5) {
      direction = `<img src="src/images/wind_e.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 202.5 && forecastDay.wind_deg < 247.5) {
      direction = `<img src="src/images/wind_ne.svg" alt="" />`;
    } else if (forecastDay.wind_deg >= 247.5 && forecastDay.wind_deg < 292.5) {
      direction = `<img src="src/images/wind_n.svg" alt="" />`;
    } else {
      direction = `<img src="src/images/wind_nw.svg" alt="" />`;
    }

    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
<div class="row week-weather">
        <div class="col week-weather-col">
          <span class="day-text">${formatDay(forecastDay.dt, index)}</span>
        </div>
        <div class="col week-weather-col">
          <span class="day-temperature-max">${Math.round(
            forecastDay.temp.max
          )}??</span
          ><span class="day-temperature-min">/${Math.round(
            forecastDay.temp.min
          )}??</span>
        </div>
        <div class="col week-weather-col icon-small">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
   alt="" width ="42"/>
        </div>

        <div class="col week-weather-col">${direction}
         
          <span
            class="wind-number"
            >${Math.round(forecastDay.wind_speed)}
            </span
          ><span class="wind-dimension"> m/s</span>
        </div>
      </div>
      <hr />
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTempPlace(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElementBig = document.querySelector("#big-number");
  temperatureElementBig.innerHTML = celsiusTemperature;

  let cityElement = document.querySelector("#city");
  let city = response.data.name;
  let country = response.data.sys.country;
  cityElement.innerHTML = `${city}, ${country}`;
  let windElement = document.querySelector("#wind_number");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity} %`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon-big");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "03f8830aae56ae7c397e8b2714e3ba3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempPlace);
}

navigator.geolocation.getCurrentPosition(showPosition);

function searchCity(city) {
  let apiKey = "03f8830aae56ae7c397e8b2714e3ba3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempPlace);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
