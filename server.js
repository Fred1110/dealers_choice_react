const express = require('express');
const {syncAndSeed, models: {Console, Game, Exclusives}, conn} = require('./db');
const path = require('path');

const app = express();

app.use(express.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/api', require('./api'));



const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
};

init();
