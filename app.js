const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path')

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://kumar_rohan:kumarrohan74@cluster0.myb1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port,console.log(`server started on ${port}`));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(cors());
app.use(router);