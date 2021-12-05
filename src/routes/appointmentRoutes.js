const express = require('express');
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

const router = express.Router();

router.post('/appointment', async (req, res) => {
    const {title, price, status, assigned, completed, date, customername, customeremail, address, phone, regNo} = req.body;

    try {
        const appointment = new Appointment({title, price, status, assigned, completed, date, customeremail, customername, phone, regNo, address});

        await appointment.save((err) => {
            if(err) res.send('Failed to save !')
            res.status(200).send(true);
        })
     


    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find({})

     res.status(200).send(appointments)

    // console.log(appointments)

    // Appointment.find({})
    // .toArray((err, documents) => {
    //     res.status(200).send(documents)
    // })
})

module.exports = router;