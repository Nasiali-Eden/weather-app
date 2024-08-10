const apiKey = "7c90a0e9dd4e41ddd4e93b768bd1bfef";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Check if the main data and weather array are present
      if (data.main && data.weather && data.weather.length > 0) {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
      } else {
        console.error('Weather data not available.');
        locationElement.textContent = 'Location not found';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      locationElement.textContent = 'Error fetching data';
      temperatureElement.textContent = '';
      descriptionElement.textContent = '';
    });
}


