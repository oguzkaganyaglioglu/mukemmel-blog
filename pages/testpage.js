
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://dbUser:opIwDkg6fjyWY9e4@mukemmelblog-cewxh.gcp.mongodb.net/users?retryWrites=true&w=majority', {useNewUrlParser: true});




const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }) )
app.use(bodyParser.json())

const Cat = mongoose.model('Cat', { name: String });



app.get('/testpage', (req, res) => res.send('Merhaba Dünya!'))

app.post('/testpage', (req, res) => {
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then((data) => res.send(data));
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// var newUser = new User(
//   email = "test@test.com",
//   firstName = "Oğuz Kağan",
//   lastName = "Yağlıoğlu",
//   password = "123456",
//   dateCreated = new Date(),
//   dateModified = newUser.dateCreated
// );
// newUser.save().then((data) => {
  
//   res.send(data);
// )}