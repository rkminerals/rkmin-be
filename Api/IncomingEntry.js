const express = require('express');
const mineralApi = require('./Mineral'); 
const IncomingEntry = require('../DBConnection/models/IncomingEntry'); 
const utilities = require('./utilities');
const { request } = require('express');

const router = express.Router();

const tokenVerification = require('./../middleware');

router.get('/allInReport', tokenVerification, async (req, res) => {
    var all = [];
    var all = await IncomingEntry.find();
    if(all.length != 0){
        var file = utilities.json_to_xls(JSON.stringify(all));
         res.download(file, "Incoming_Entries.xlsx"); 
    } else {
        res.send({content: [], message: 'failure'})
    }   
})

router.post('/', tokenVerification, (req, res) => {
    IncomingEntry.create(req.body).then((res) => {
        console.log(req.body.incomingType);
        if(req.body.incomingType === "Powder"){
            var targetPowderType = {
                params: {id: req.body.mineralId},
                body: {
                    rockType: req.body.rockType, 
                    quantityChange: req.body.typeQuantity, 
                    supplier: req.body.supplier
                    }
                }
                console.log(targetPowderType);
            mineralApi.updatePowderGradeBalance(targetPowderType, res, 0);
        } else if(req.body.incomingType === 'Rock'){
            var targetRockType = {
            params: {id: req.body.mineralId},
            body: {
                rockType: req.body.rockType, 
                quantityChange: req.body.typeQuantity, 
                supplier: req.body.supplier
                }
            }
        mineralApi.updateRockTypeBalance(targetRockType, res, 0);
    }
    }).then(()=>{
        res.send({message: "success"})
    }).catch(() => {
        res.send({message: "failure"})
    })
});

router.post('/deleteById/:id', tokenVerification, async (req, res) => {
    IncomingEntry.deleteOne({_id: req.params.id}).then(() => {
        var targetRockType = {
            params: {id: req.body.mineralId},
            body: {
                rockType: req.body.rockType, 
                quantityChange: -req.body.typeQuantity, 
                supplier: req.body.supplier
                }
            }
        mineralApi.updateRockTypeBalance(targetRockType, res, 0);
    }).then(() => {
        res.send({message: 'success'})
    }).catch((err) => {
        res.send({message: 'failure', info: "while deletingById incomingEntry"});
    })
})

router.get('/getLastInserted', tokenVerification, async (req, res) => {
    var latest = await IncomingEntry.find({}).sort({_id:-1}).limit(1);
    res.send({content: latest, message: "success"});
})

module.exports = router;