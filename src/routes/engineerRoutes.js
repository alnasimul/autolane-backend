const express = require("express");
const mongoose = require("mongoose");
const Engineer = require("../models/Engineer");
const admin = require("firebase-admin");

const router = express.Router();

router.post("/addEngineer/:email", async (req, res) => {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer ")) {
    const token = bearer.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(token)
      .then(async (decodedToken) => {
        const tokenEmail = decodedToken.email;
        const queryEmail = req.params.email;

        if (tokenEmail === queryEmail) {
          try {
            const engineer = new Engineer(req.body);

            await engineer.save((err) => {
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

router.get("/engineers", async (req, res) => {
  try {
    const engineers = await Engineer.find({});

    res.status(200).send(engineers);
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.get("/findEngineer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const engineer = await Engineer.find({ _id: id });

    res.status(200).send(engineer[0]);
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.patch("/editEngineer/:id", async (req, res) => {
  const bearer = req.headers.authorization;

  if (bearer && bearer.startsWith("Bearer ")) {
    const token = bearer.split(" ")[1];

    admin.auth().verifyIdToken(token)
    .then( async (decodedToken) => {
        const tokenEmail = decodedToken.email;
        const queryEmail = req.query.email;
        const id = req.params.id;

        if(tokenEmail === queryEmail){
            try {
                const response = await Engineer.updateOne({_id: id}, req.body)
            
                res.status(200).send(response.acknowledged);
              } catch (error) {
                return res.status(422).send(error.message);
              }
        }
    })
  }
});

router.delete("/deleteEngineer/:id", async (req, res) => {
    const bearer = req.headers.authorization;


    if(bearer && bearer.startsWith("Bearer ")){
        const token = bearer.split(" ")[1];

        admin.auth().verifyIdToken(token)
        .then(async (decodedToken) => {
            const tokenEmail = decodedToken.email;
            const queryEmail = req.query.email;
            const id = req.params.id;

            if(tokenEmail === queryEmail){
                try {
                    const response = await Engineer.deleteOne({_id: id})

                    res.status(200).send(response.deletedCount > 0)
                } catch (error) {
                    return res.status(422).send(error.message);
                }
            }
        })

    }
})
module.exports = router;
