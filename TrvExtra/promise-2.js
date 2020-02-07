var request = require('request');

var geocodeAdress =(address) => {
  var encodedAddress = encodeURIComponent(address);


  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyAP5ok1NNeFf8uKqgd6bFg9whzdR4dSFUY';
return new Promise((resolve,reject) =>{
// request is made for the Geo Code that will return the Longitude and Latitude
  request({
    url : url,
    json : true,
    },(error,response,body)=>{
      if(error){
        reject('Unable to Connect, Please Connect to a stable connection',undefined);
      }else if(body.status === 'ZERO_RESULTS')
      {
        reject('Pin Code Not Found!');
      }else if(body.status === 'OK'){
        resolve({
          address :body.results[0].formatted_address,
          Longitude :body.results[0].geometry.location.lng,
          Latitude :body.results[0].geometry.location.lat
        });
      }else{
        reject('OVER Query Limit',undefined);
      }
    }); //end of request
  }); //end of Promise
}

geocodeAdress('00000')
  .then((loaction) => {
  console.log(JSON.stringify(loaction,undefined,3));
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
