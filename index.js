const express = require ('express');
// const fs = require('fs');
const Datastore = require('nedb');


const app = express();
app.listen(3000, () => console.log('Listening to Port 3000'));
// app.use(express.urlencoded({
//   extended: true;
// }))
app.use(express.static('public'));
app.use(express.json({limit: '100kb'}));


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
  // to database
  database.insert(data);
  // to browser
  response.json({
    // ----> to be shown in BROWSER's console as javascript Object {}:
    status: 'success',
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon
    // <-----
  });
});