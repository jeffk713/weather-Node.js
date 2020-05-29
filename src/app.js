const path = require('path'); // core node module
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname); // directory that current script is located at
//console.log(__filename);// path to the directory current file is located at
//console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//====== define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewDirPath = path.join(__dirname, '../templates/views'); //create customized views path
const partialDirPath = path.join(__dirname, '../templates/partials')

//====== set up handlebars engin and views location
app.set('view engine', 'hbs'); // setting up 'handlebars', first arg is setting, secon arg is setting value
app.set('views', viewDirPath); // setting up custom view path
hbs.registerPartials(partialDirPath); // setting up partials with customized path

//====== set up static directory to serve
app.use(express.static(publicDirPath)); // express.static() finds index.html and display on home page due to 'index.html' file name 


app.get('', (req, res) => {
  res.render('index', { // no file type needed, but the file name needs to match, as first arg
    title: 'Weather', // second arg is data to use in the view file 
    name: 'Jeff Kim'
  }) 
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Jeff Kim'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jeff Kim',
    message: 'This is a help page.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.area) return res.send({error: 'You must enter a valid location'});

  const area = req.query.area;
  geocode(area, (error, {latitude, longitude}={}) => {
    if(error) return res.send({ error });

    forecast(latitude, longitude, (error, {location, weather, temperature, feelsLike}={}) => {
      if(error) return res.send({ error });

      res.send({searchArea: area, location, weather, temperature, feelsLike});
    })   
  })
});

app.get('/products', (req, res) => {
  if(!req.query.search) return res.send({error: 'You must enter an input'});

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404',
    name: 'Jeff Kim',
    messeage: 'Help article not found'
  })
})

//this route has to come last
app.get('*', (req, res) => { //* means anything except what has not been matched.
  res.render('404page', {
    title: '404',
    name: 'Jeff Kim',
    messeage: 'Page not found'
  }); 
});

app.listen(port, () => { //port 3000 is not default, it is a common port for development
  console.log('Server is up on port ' + port);
});

// app.get('', (req, res) => { // takes 2 arguments; first one is 'route', second one is 'callback'
//   res.send('<h1>WEATHER</h1>'); 
//   // upon response, this sends data back to requester
//   // this case, on the browser it shows 'Hello express!'
// });

// app.get('/help', (req, res) => {
//   res.send([{ name:'Jeff', age: 27 }, { name: 'Jane', age: 23 }]); 
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>ABOUT PAGE</h1>'); 
// });


