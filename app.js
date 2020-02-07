var geocode = require('./geocode/geocode');
var weather = require('./weather/weather');

var yargs = require('yargs');

var argv = yargs
  .options({
    a:{
      alias : 'address',
      description : 'Enter Address',
      demand : true,
      string : true
    }
  })
  .default('a','751006','Addess is entered here...')//Ths is the default of yargs when no parameter/arguments is passed to setInterval(function () {
                                                    //this work as..
                                                    //.default('key','value','description')
  .help()
  .alias('help','h')
  .argv;

//Chaining Call Back is done here
geocode.geocodeAdress(argv.a,(errorM,results) => {
  if(errorM)
  {
    console.log(errorM);
  }else{
    console.log(` Address : ${results.address}`);
    // getWeather Function is called here...
    weather.getWeather(results.Latitude,results.Longitude,(errorMessage,resultMessage) => {
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(` ${resultMessage.summary}.\n The Current Temperature is ${resultMessage.RealTemp} but it feels like ${resultMessage.actualTemp}!!`);
      }
    })
  }
});
