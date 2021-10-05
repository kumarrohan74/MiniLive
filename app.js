const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const admin = require("firebase-admin");
const Users = require('./Users/users');
const Videos = require('./Video/videos');

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://kumar_rohan:kumarrohan74@cluster0.myb1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static("public"));
}

app.listen(port,console.log(`server started on ${port}`));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(cors());
app.use(router);

router.get('/', (req,res) => {
    res.send("Welcome to MiniLive")
});


/*-------------------------------User Api's---------------------------------------------------*/
router.post('/v1/createUser', (req,res) => {
    Users.createUsers(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editUser/:id', (req,res) => {
    Users.editUsers(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUsers', (req,res) => {
    Users.getUsers().then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUserDetails/:id', (req,res) => {
    Users.getUseById(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Video Api's---------------------------------------------------*/
router.post('/v1/postVideo', (req,res) => {
    Videos.createVideos(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUserVideo/:user_id', (req,res) => {
    Videos.getUserVideos(req.params.user_id).then((result) => res.json(result)).catch(err => res.json(err));
});


