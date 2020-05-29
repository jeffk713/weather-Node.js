console.log('client side JS is loaded');

const weatherForm = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

const fetchWeather = async area => {
  try{
    const response = await fetch(`http://localhost:3000/weather?area=${encodeURIComponent(area)}`);
    const weatherData = await response.json();

    if(weatherData.error) {
      messageOne.textContent = 'Error has occured';
      messageTwo.textContent = weatherData.error;
      return;
    }

    messageOne.textContent = `Location: ${weatherData.location}`;
    messageTwo.textContent = `${weatherData.weather}, current temperature is ${weatherData.temperature} degrees, feels like ${weatherData.feelsLike} degrees.`;
  } catch(error) {
    messageOne.textContent = 'Error has occured';
    messageTwo.textContent = error.message;
  }
}

weatherForm.addEventListener('submit', async event => {
  event.preventDefault()

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const area = searchInput.value;
  await fetchWeather(area);
  searchInput.value = '';
})

