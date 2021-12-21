const express = require('express');
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

const router = express.Router();

router.post('/appointment', async (req, res) => {

    try {
        const appointment = new Appointment(req.body);

        await appointment.save((err) => {
            if (err) res.send('Failed to save !')
            res.status(200).send(true);
        })



    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find({})

    res.status(200).send(appointments)

})

router.get('/appointmentsByDate/:date', async (req, res) => {
    const date = req.params.date
    const appointments = await Appointment.find({date})

    res.status(200).send(appointments)

})

router.patch('/updateCompletion/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body;

    try {
        const response =  await Appointment.updateOne({ _id: id }, status)

        const data = response.acknowledged

        res.status(200).send(data)
    } catch (error) {
        
    }
})

router.patch('/updatePayment/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body;

    try {
        const response = await Appointment.updateOne({ _id: id }, status)

        const data = response.acknowledged

        res.status(200).send(data)
        
    } catch (error) {
        
    }
})

router.patch('/updateDelivery/:id', async (req, res) => {
    const id = req.params.id;
    const status = req.body;

    try {
        const response =  await Appointment.updateOne({ _id: id }, status)

        const data = response.acknowledged


        res.status(200).send(data)
    } catch (error) {
        
    }
})

router.delete("/delete/:id", async (req, res) =>{
    const id = req.params.id;

    try {
        const response = await Appointment.deleteOne({_id: id})

        const data = response;

        console.log( data.deletedCount > 0 )

        res.status(200).send(data.deletedCount > 0)
    } catch (error) {
        
    }
})

module.exports = router;