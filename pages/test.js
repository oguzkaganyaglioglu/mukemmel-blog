
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://dbUser:opIwDkg6fjyWY9e4@mukemmelblog-cewxh.gcp.mongodb.net/users?retryWrites=true&w=majority', {useNewUrlParser: true});



const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }) )
    server.use(bodyParser.json())

    const Cat = mongoose.model('Cat', { name: String });

    server.get('/testpage', (req, res) => res.send('Merhaba Dünya!'))

    server.post('/testpage', (req, res) => {
        const kitty = new Cat({ name: 'Zildjian' });
        kitty.save().then((data) => res.send(data));
      })

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });