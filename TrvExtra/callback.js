var user =(id,callback) =>{
  userID = {
    name : 'Surya',
    id : id
  };
  
  setTimeout(()=>{
    callback(userID);
  },2000);

};

console.log('Surya');


user(13,(userObj)=>{
  console.log('Value is ',userObj);
});
console.log('end');
