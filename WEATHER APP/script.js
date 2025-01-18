// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', getWeather);

async function getWeather() {
  const city = document.getElementById('city-input').value;
  const apiKey = 'a406ecbae33271ee688840efc601d3f0'; // Replace with your OpenWeatherMap API key

  // If the input is empty, show an error message
  if (!city) return document.getElementById('error-message').innerText = 'Please enter a city name.';
  
  // API endpoint for OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  try {
    // Fetch weather data from the API
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    // Display error message if the city is not found or any other issue occurs
    document.getElementById('error-message').innerText = error.message;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name, main: { temp }, weather } = data;
  const weatherDescription = weather[0].description;
  const icon = weather[0].icon;

  // Determine weather type for color & emoji
  let weatherType = '';
  let emoji = '';
  
  if (weatherDescription.includes('clear')) {
    weatherType = 'sunny';
    emoji = '☀️';
  } else if (weatherDescription.includes('rain')) {
    weatherType = 'rainy';
    emoji = '🌧️';
  } else if (weatherDescription.includes('cloud')) {
    weatherType = 'cloudy';
    emoji = '☁️';
  } else if (weatherDescription.includes('snow')) {
    weatherType = 'snowy';
    emoji = '❄️';
  }

  // Add the corresponding weather class and display the data in the container
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.className = weatherType;
  weatherContainer.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>${temp}°C ${emoji}</p>
    <p><strong>${weatherDescription}</strong></p> <!-- The description is now below the temperature -->
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${weatherDescription}">
  `;

  // Make the weather container visible
  weatherContainer.style.visibility = 'visible';
}