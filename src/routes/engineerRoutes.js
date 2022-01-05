const express = require("express");
const mongoose = require("mongoose");
const Engineer = require('../models/Engineer');
const admin = require("firebase-admin");


const router = express.Router();



router.post('/addEngineer/:email', async (req, res) => {
    const bearer = req.headers.authorization;

    if(bearer && bearer.startsWith('Bearer ')){
        const token = bearer.split(' ')[1]

        admin.auth().verifyIdToken(token)
        .then(async (decodedToken) => {
            const tokenEmail = decodedToken.email;
            const queryEmail = req.params.email;

            console.log(req.body)
            console.log({tokenEmail, queryEmail})
            if( tokenEmail === queryEmail ){
               try {
                const engineer = new Engineer(req.body);

                await engineer.save((err) => {
                    if(err) res.send("Failed to save !");
                    res.status(200).send(true);
                })
               } catch (error) {
                return res.status(422).send(error.message);
               }
            }
        })
    }
})

module.exports = router;