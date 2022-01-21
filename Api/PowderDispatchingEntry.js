const express = require('express');
const PowderDispatchingEntry = require('../DBConnection/models/PowderDispatchingEntry');
const mineralApi = require('./Mineral');

const utilities = require('./utilities');

const router = express.Router();

router.get('/allInReport', async (req, res) => {
    var all = [];
    var all = await PowderDispatchingEntry.find();
    if(all.length != 0){
        var file = utilities.json_to_xls(JSON.stringify(all));
         res.download(file, "P_Dispatcing_Entries.xlsx"); 
    } else {
        res.send({content: [], message: 'failure'})
    }   
})

router.post('/', (req, res) => {
    PowderDispatchingEntry.create(req.body).then(() => {
        //updatePowderBalance
        var updatePowderBalanceData = {
            params: {id: req.body.mineralId},
            body: {
                rockType: req.body.gradeName, //rockType corresponds to gradeName
                quantityChange: -req.body.quantityDispatched, 
                supplier: req.body.supplier
                }
            }
        mineralApi.updatePowderGradeBalance(updatePowderBalanceData, res, 0);
    }).then(() => {
        res.send({message: 'success'})
    }).catch(() => {res.send({message: "failure", info: "in creating powderDispatchingEntry"})});
});

router.post('/deleteById/:id', async (req, res) => {
    PowderDispatchingEntry.deleteOne({_id: req.params.id}).then(() => {
        //updatePowderBalance
        var updatePowderBalanceData = {
            params: {id: req.body.mineralId},
            body: {
                rockType: req.body.gradeName, 
                quantityChange: req.body.quantityDispatched,
                supplier: req.body.supplier
                }
            }
        mineralApi.updatePowderGradeBalance(updatePowderBalanceData, res, 0);
    }).then(()=>{
        res.send({message: 'success'})
    }).catch((err) => {
        res.send({message: 'failure', info: "while deletingById powderDispatchingEntry"});
    })
});

router.get('/getLastInserted', async (req, res) => {
    var latest = await PowderDispatchingEntry.find({}).sort({_id:-1}).limit(1);
    res.send({content: latest, message: "success"});
});

module.exports = router;