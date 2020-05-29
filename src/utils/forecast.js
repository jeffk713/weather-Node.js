const request = require('request');

const areaWeatherURL = (latitude, longitude) => `http://api.weatherstack.com/current?access_key=ac8b8db6add2481b1154f99078a59576&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

const forecast = (latitude, longitude, callback) => {
  const url = areaWeatherURL(latitude, longitude);

  request({ url, json: true }, (error, { body }) => {
  if(error) return callback('Unable to connect to location service.');
  if(body.error) return callback('Please enter a valid location.'+ body.error.info);
  if(body.location.country===null) return callback('Please enter a valid location.');

  const location = `${body.location.name}, ${body.location.region}, ${body.location.country}`;
  const weather = body.current.weather_descriptions[0];
  const temperature = body.current.temperature;
  const feelsLike = body.current.feelslike;
  callback(undefined, {location, weather, temperature, feelsLike});
  })
}

module.exports = forecast;