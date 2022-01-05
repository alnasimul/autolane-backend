const express = require("express");
const mongoose = require("mongoose");
const Appointment = mongoose.model("Appointment");
const admin = require("firebase-admin");

const router = express.Router();

const serviceAccount = require("../../config/autolane-nextjs-firebase-adminsdk-6qrsm-283637cf61.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post("/appointment", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    await appointment.save((err) => {
      if (err) res.send("Failed to save !");
      res.status(200).send(true);
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/appointments", async (req, res) => {
  const appointments = await Appointment.find({});

  res.status(200).send(appointments);
});

router.get("/findAppointment/:id", async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointment.find({ _id: id });

  res.status(200).send(appointment[0]);
});

router.get("/appointmentsByDate/:date", async (req, res) => {
  const date = req.params.date;
  const appointments = await Appointment.find({ date });

  res.status(200).send(appointments);
});

router.patch("/updateCompletion/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  try {
    const response = await Appointment.updateOne({ _id: id }, status);

    const data = response.acknowledged;

    res.status(200).send(data);
  } catch (error) {}
});

router.patch("/updatePayment/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  try {
    const response = await Appointment.updateOne({ _id: id }, status);

    const data = response.acknowledged;

    res.status(200).send(data);
  } catch (error) {}
});

router.patch("/updateDelivery/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body;

  try {
    const response = await Appointment.updateOne({ _id: id }, status);

    const data = response.acknowledged;

    res.status(200).send(data);
  } catch (error) {}
});

router.patch("/editAppointment/:id", async (req, res) => {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer ")) {
    const token = bearer.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then( async (decodedToken) => {
        const tokenEmail = decodedToken.email;
        const queryEmail = req.query.email;

        if (tokenEmail === queryEmail) {
          const id = req.params.id;
          const data = req.body;

          try {
            const response = await Appointment.updateOne({ _id: id }, data);

            const acknowledged = response.acknowledged;

            res.status(200).send(acknowledged);
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  // console.log({token, data});
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Appointment.deleteOne({ _id: id });

    const data = response;

    console.log(data.deletedCount > 0);

    res.status(200).send(data.deletedCount > 0);
  } catch (error) {}
});

router.get("/userAppointments/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const appointments = await Appointment.find({ customeremail: email });

    res.status(200).send(appointments);
  } catch (error) {}
});

router.post("/searchAppointments", async (req, res) => {
  const query = req.body;

  if (query.customeremail) {
    try {
      const appointments = await Appointment.find({
        customeremail: query.customeremail,
      });

      res.status(200).send(appointments);
    } catch (error) {}
  } else if (query.customername) {
    try {
      const appointments = await Appointment.find({
        customername: query.customername,
      });

      res.status(200).send(appointments);
    } catch (error) {}
  } else if (query.phone) {
    try {
      const appointments = await Appointment.find({ phone: query.phone });

      res.status(200).send(appointments);
    } catch (error) {}
  } else {
    try {
      const appointments = await Appointment.find({ regNo: query.regNo });

      res.status(200).send(appointments);
    } catch (error) {}
  }
});



module.exports = router;
