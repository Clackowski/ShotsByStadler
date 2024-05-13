const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: 'zips/' });

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the same directory as server.js
app.use(express.static(path.join(__dirname)));

// Handle account creation requests
app.post('/createAccount', (req, res) => {
  const newUser = req.body;
  const newUserEditted = {
    "username": newUser["username"],
    "first name": newUser["first name"],
    "last name": newUser["last name"],
    "email": newUser["email"],
    "password": newUser["password"],
    "role": "client"
  };

  // Load existing users from JSON file
  const users = JSON.parse(fs.readFileSync('userdata.json'));

  // Check if the username already exists
  if (users[newUserEditted.username]) {
    res.status(400).send('Username already exists');
  } else if (newUserEditted.username.includes(" ")) {
    res.status(400).send('Username cannot have spaces');
  } else if (users[newUser.password] != users[newUser.confirm_password]) {
    res.status(400).send('Passwords don\'t match');
  } else {
    // Add the new user to the JSON data
    users[newUserEditted.username] = newUserEditted;

    // Write the updated data back to the JSON file
    fs.writeFileSync('userdata.json', JSON.stringify(users, null, 2));

    // Redirect to login page
    res.redirect('/login.html');
  }
});

// Handle account creation requests
app.post('/uploadPhotos', upload.single('zipfile'), (req, res) => {
  const sentInfo = req.body;
  console.log(sentInfo);
  const filename = sentInfo["zipfile"]

  let formData = new FormData();
  formData.append("zip", filename);
  fetch('/zips', {method: "POST", body: formData});
  //const newUser = req.body;
  /*const newUserEditted = {
    "username": newUser["username"],
    "first name": newUser["first name"],
    "last name": newUser["last name"],
    "email": newUser["email"],
    "password": newUser["password"],
    "role": "client"
  };*/

  // Load existing users from JSON file
  /*const users = JSON.parse(fs.readFileSync('userdata.json'));

  // Check if the username already exists
  if (users[newUserEditted.username]) {
    res.status(400).send('Username already exists');
  } else if (newUserEditted.username.includes(" ")) {
    res.status(400).send('Username cannot have spaces');
  } else if (users[newUser.password] != users[newUser.confirm_password]) {
    res.status(400).send('Passwords don\'t match');
  } else {
    // Add the new user to the JSON data
    users[newUserEditted.username] = newUserEditted;

    // Write the updated data back to the JSON file
    fs.writeFileSync('userdata.json', JSON.stringify(users, null, 2));

    // Redirect to login page
    //res.redirect('/upload.html');
  }*/
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
