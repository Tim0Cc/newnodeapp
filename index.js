const express = require ('express');
const fs = require('fs');
const Datastore = require('nedb');


const app = express();
app.listen(3000, () => console.log('Listening to Port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


const database = new Datastore('database.db');
database.loadDatabase();
database.insert({ name: 'TimCc', status: 'learning to store on nedb' });
database.insert({ name: 'Fk', status: 'Fotos' });

app.post('/api', (request, response) => {
  console.log(request.body);
  // response.end();
  const data = request.body;
  // console.log("\nFile Contents of file before append:", 
  //   fs.readFileSync("submittedGeolocation.txt", "utf8")); 
  // fs.appendFile('submittedGeolocation.txt', `${data}`, 'utf8',
  //   (err) => {
  //     if (err) { 
  //       console.log(err);
  //     } else {
  //     console.log("The file \"submittedGeolocation.json\" was created or updated",
  //       fs.readFileSync("submittedGeolocation.txt", "utf8"));
  //   });
  response.json({
    status: 'success',
    latitude: data.lat,
    longitude: data.lon
  });
});