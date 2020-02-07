var anyPromise = new Promise((resolve,reject) => {
  resolve('Sucess');
  resolve('Successful');
  reject('Rejected');
});

anyPromise.then((message) => {
  console.log(message);
},(errorMessage) => {
  console.log(errorMessage);
})
