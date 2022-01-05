const express = require("express");
const mongoose = require("mongoose");
const Member = require('../models/Member');

const router = express.Router();

router.post("/addMember", async (req, res) => {
    try {
        
        const member = new Member(req.body);

        await member.save((err) =>{
            if(err) res.send("Failed to save !");
            res.status(200).send(true);
        })
    } catch (error) {
        return res.status(422).send(error.message);
    }
})

router.get("/checkAdmin/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const response = await Member.find({role:'admin', email})

        res.status(200).send(response.length > 0);

    } catch (error) {
        return res.status(422).send(error.message);
    }
})

module.exports = router;