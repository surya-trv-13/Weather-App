var yargs = require('yargs');
var axios = require('axios');

var argv = yargs
  .options({
    a:{
      alias : 'address',
      description : 'Enter Address',
      demand : true,
      string : true
    }
  })
  .help()
  .alias('help','h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyAP5ok1NNeFf8uKqgd6bFg9whzdR4dSFUY';

  //Axios is a npm package which provide promise based http client to send request.
  //get is use for sending request and we will get the response from it where we will get res of the data
  //get does not require for the json: true as it decide on its own to what to return.
  axios.get(geocodeURL)
  .then((response) => {
    //data is used in this library as body.
    if(response.data.status !== 'OK'){
      //This is how yo throw the r=error in node JS... much simsilar to the JAVA <3
      throw new Error('Due to some issue we are unable to send the request, Please try after sometime :-)');
    }else{
      var latitude = response.data.results[0].geometry.location.lat;
      var longitude = response.data.results[0].geometry.location.lng;

      var weatherURL = 'https://api.darksky.net/forecast/863a5bf93e4279054106ff84227636f3/'+latitude+','+longitude+'?units=si&language=el';

      console.log('Address : '+response.data.results[0].formatted_address);

      //returned again a axios.get() for waether request
      return axios.get(weatherURL);
    }
  })
  .then((response) =>{
    var summary = response.data.currently.summary;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(` ${summary}.\n The Current Temperature is ${temperature} but it feels like ${apparentTemperature}!!`)
  })
  .catch((e) => {
    console.log(e.message);
  });
