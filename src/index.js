require('./models/Appointment');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('../src/routes/appointmentRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(appointmentRoutes);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.66naq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
    res.send('Hello from autolane server')
})

app.listen(4000, () => {
    console.log('server is ready')
})