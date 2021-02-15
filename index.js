const express = require ('express');
// const fs = require('fs');
const Datastore = require('nedb');


const app = express();
app.listen(3000, () => console.log('Listening to Port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));


const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {

  // ---->
  // to be shown in TERMINAL as the server's console
  console.log(request.body);
  // <-----

  // response.end();
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  // database.remove({}, { multi: true}, function(err, numDeleted) {
  //   console.log('Deleted', numDeleted, 'entries');
  // });
  
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

    // ----> to be shown in BROWSER's console as javascript Object {}:
    status: 'success',
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon
    // <-----

  });
});