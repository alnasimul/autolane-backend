const express = require("express");
const mongoose = require("mongoose");
const Service = require("../models/Service");
const admin = require("firebase-admin");

const router = express.Router();

router.post("/addService/:email", async (req, res) => {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer ")) {
    const token = bearer.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then(async (decodedToken) => {
        const tokenEmail = decodedToken.email;
        const queryEmail = req.params.email;
        const data = req.body;

        if (tokenEmail === queryEmail) {
          try {
            const service = new Service(data);

            await service.save((err) => {
              if (err) res.send("Failed to save !");
              res.status(200).send(true);
            });
          } catch (error) {
            return res.status(422).send(error.message);
          }
        }
      });
  }
});

router.get('/services', async(req, res) => {
    try {
        const services = await Service.find({});

        res.status(200).send(services);
    } catch (error) {
        return res.status(422).send(error.message);
    }
})

router.delete('/deleteService/:id', async (req, res) => {
    const bearer = req.headers.authorization;

    if(bearer && bearer.startsWith('Bearer ')){
        const token = bearer.split(" ")[1]

        admin.auth().verifyIdToken(token)
        .then(async (decodedToken) => {
            const tokenEmail = decodedToken.email;
            const queryEmail = req.query.email;

            if(queryEmail === tokenEmail){
                try {
                    const id = req.params.id;

                    const response = await Service.deleteOne({_id: id})

                    res.status(200).send(response.deletedCount > 0)
                } catch (error) {
                    return res.status(422).send(error.message);
                }
            }

        })

    }
})

module.exports = router;
