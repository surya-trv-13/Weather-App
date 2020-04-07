//request npm package is required
var request = require('request');

var geocodeAdress = (address,callb) => {
  var encodedAddress = encodeURIComponent(address);

  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodedAddress+'.json?access_token=pk.eyJ1Ijoic3VyeWEtdHJ2LTEzIiwiYSI6ImNrOG9obWZlejE0dWMzZm1paHdoNXQ5NmsifQ.13uh-J0C3eZn8i4ptYTdsQ';
  //var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyAP5ok1NNeFf8uKqgd6bFg9whzdR4dSFUY';

  // console.log(url);
// request is made for the Geo Code that will return the Longitude and Latitude
  request({
    url : url,
    json : true,
    },(error,response,body)=>{
      if(error){
        callb('Unable to Connect, Please Connect to a stable connection',undefined);
      }else if(body.status === 'ZERO_RESULTS')
      {
        callb('Pin Code Not Found!',undefined);
      }else if(response.body.features !== 0){
        callb(undefined,{
          // address :body.results[0].formatted_address,
          // Longitude :body.results[0].geometry.location.lng,
          // Latitude :body.results[0].geometry.location.lat
          address : body.features[0].place_name,
          Longitude : body.features[0].center[0],
          Latitude : body.features[0].center[1]
        });
      }else{
        callb('OVER Query Limit'+response.body.features[0].place_name,undefined);
      }
    });
  };


//Exporting the function to app.js
module.exports={
  geocodeAdress
}
