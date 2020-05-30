const weatherForm = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const messageThree = document.querySelector('#message-three');

const fetchWeather = async area => {
  try{
    const response = await fetch(`/weather?area=${encodeURIComponent(area)}`);
    // when heroku is runing the app, url is not local host!
    const weatherData = await response.json();

    if(weatherData.error) {
      messageOne.textContent = 'Error has occured';
      messageTwo.textContent = weatherData.error;
      messageThree.textContent = '';
      return;
    }

    messageOne.textContent = `Location: ${weatherData.location}`;
    messageTwo.textContent = `${weatherData.weather}, The temperature is ${weatherData.temperature} degrees, feels like ${weatherData.feelsLike} degrees.`;
    messageThree.textContent = `The humidity is ${weatherData.humidity}% and the UV index is ${weatherData.uvIndex}.`
  } catch(error) {
    messageOne.textContent = 'Error has occured';
    messageTwo.textContent = error.message;
    messageThree.textContent = '';
  }
}

weatherForm.addEventListener('submit', async event => {
  event.preventDefault()

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';

  const area = searchInput.value;
  await fetchWeather(area);
  searchInput.value = '';
})

