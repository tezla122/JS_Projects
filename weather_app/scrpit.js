const weatherAPI = {
  key: "cb8f23aeb1b1b43258f52cdd0fe67bf4",
  baseURL: "https://api.openweathermap.org/data/2.5/weather"
}
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const searchInputBox = document.getElementById('input-box');
const weatherBody = document.querySelector('.weather-body');
const dateElem = document.querySelector('#date'); 
const humidityElem = document.querySelector('#humidity');
const windElem = document.querySelector('#wind');


window.addEventListener('load', () => {


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const apiURL = `${weatherAPI.baseURL}?lat=${lat}&lon=${long}&appid=${weatherAPI.key}&units=metric`;
      fetchWeather(apiURL);
    }, (error) => {
      console.warn("Location error: ", error.message);
        const defaultCity = "London";
        const apiURL = `${weatherAPI.baseURL}?q=${defaultCity}&appid=${weatherAPI.key}&units=metric`;
        fetchWeather(apiURL);
    });
  }else {
    const defaultCity = "London";
    const apiURL = `${weatherAPI.baseURL}?q=${defaultCity}&appid=${weatherAPI.key}&units=metric`;
    fetchWeather(apiURL);
  }
});

searchInputBox.addEventListener('keyup', (event) => {
  console.log("Key released: ", event.key);
  if(event.key === "Enter"){
    console.log("detected start search");
    const city = searchInputBox.value;
    if(city === ""){
      alert("Please type a city name first!");
      return;
    }
  const apiURL = `${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`;
            fetchWeather(apiURL);
  }
});

function fetchWeather(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        alert("City not found");
        throw new Error("Network response was not ok");
      }
      return response.json(); 
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => console.error("Error fetching data: ", error));
}
function displayWeather(data) {
  const { temp, humidity } = data.main;
  const place = data.name;
  const { description, main } = data.weather[0];
  const { speed } = data.wind;

  loc.textContent = place;
  desc.textContent = description;
  tempC.textContent = `${temp.toFixed(2)}°C`;
  humidityElem.textContent = `${humidity}%`;
  windElem.textContent = `${speed} km/h`;
  const today = new Date();
  dateElem.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  updateBackground(main);
  weatherBody.style.display = "block";
}
function updateBackground(weatherCondition) {
  let imageUrl = "";

  switch (weatherCondition) {
    case "Clear":
      imageUrl = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    case "Clouds":
      imageUrl = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    case "Rain":
    case "Drizzle":
      imageUrl = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    case "Thunderstorm":
      imageUrl = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    case "Snow":
      imageUrl = "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    case "Mist":
    case "Haze":
    case "Fog":
      imageUrl = "https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      break;
    default:
      imageUrl = "https://images.unsplash.com/photo-1558486012-817176f84c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
  }

  document.body.style.backgroundImage = `url('${imageUrl}')`;
}
