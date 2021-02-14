const express = require ('express');
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
  response.json({
    status: 'success',
    latitude: data.lat,
    longitude: data.lon
  });
});