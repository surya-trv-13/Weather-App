var request = require('request');

var getWeather = (latitude,longitude,callback) => {
  //The URL caome fron dark sky api ,Just login and you will get yours and apply longitude and latitude to get the
  //weather report as here taken.
  //units is taken si because it will show temperature in celcius by default it is Farenheit.
  //langyage is taken as germany ='el' but it is not working.
  // More can be get through docs of DarkSky website...
  var url = 'https://api.darksky.net/forecast/863a5bf93e4279054106ff84227636f3/'+latitude+','+longitude+'?units=si&language=el';

//Request is made to the url...
  request ({
    url : url,
    json : true
  },(error ,response ,body) => {
    if(!error && response.statusCode === 200){
      const data = body.currently.temperature;
      const actualData = body.currently.apparentTemperature;
      const summary = body.currently.summary;
      callback(undefined,{
        actualTemp : actualData,
        RealTemp : data,
        summary : summary
      });
    }else{
      callback(error,undefined);

    }
  });
};

module.exports = {
  getWeather
};
