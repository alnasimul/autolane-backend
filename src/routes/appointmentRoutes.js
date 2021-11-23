const express = require('express');
const mongoose = require('mongoose');
const Appointments = mongoose.model('appointments');

const router = express.Router();

router.post('/appointment', async (req, res) => {
    const {date, customername, customeremail, address, phone} = req.body;

    try {
        const appointment = new Appointments({date, customeremail, customername, address, phone});

        await appointment.save();
    } catch (err) {
        return res.status(422).send(err.message);
    }
})

module.exports = router;