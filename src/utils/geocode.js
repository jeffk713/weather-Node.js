const request = require('request');

const areaURL = area => `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(area)}.json?access_token=pk.eyJ1IjoiMTIxMTAxNzgiLCJhIjoiY2thcHBvdXRqMDFtMzJ0bnJzMzNjMGo5NyJ9.r5XpAoyzRts4BSMgTh2e8A&limit=1`;

const geocode = (area, callback) => {
  const url = areaURL(area);

  request({ url, json: true }, (error, { body }) => {
    if(error){ callback('Unable to connect to location service.'); return;};
    if(body.message || body.features.length === 0){ callback('No result found.'); return;};

    const location = body.features[0].place_name;
    const longitude = body.features[0].geometry.coordinates[0];
    const latitude = body.features[0].geometry.coordinates[1];
    callback(undefined, {location, latitude, longitude});
  })
}

module.exports = geocode;