const express = require('express');
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

const router = express.Router();

router.post('/appointment', async (req, res) => {
    const {date, customername, customeremail, address, phone, regNo} = req.body;

    try {
        const appointment = new Appointment({date, customeremail, customername, phone, regNo, address});

        await appointment.save((err) => {
            if(err) res.send('Failed to save !')
            res.status(200).send(true);
        })
     


    } catch (err) {
        return res.status(422).send(err.message);
    }
})

module.exports = router;