function showTempPlace(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElementBig = document.querySelector("#big-number");
  temperatureElementBig.innerHTML = temperature;
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

  console.log(response);
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

let dateNow = document.querySelector("#current-date");
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
dateNow.innerHTML = `${days[todayDayBig]}, ${months[todayMonthBig]} ${todayDateBig}`;

let timeNow = document.querySelector("#current-time");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeNow.innerHTML = `${hours} : ${minutes}`;

//function search(event) {
event.preventDefault();
let cityElement = document.querySelector("#city");
let cityInput = document.querySelector("#city-input");
cityElement.innerHTML = cityInput.value;

//}
//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", search);