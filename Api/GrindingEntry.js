const express = require('express');
const GrindingEntry = require('../DBConnection/models/GrindingEntry');
const Mineral = require('../DBConnection/models/Mineral');

const mineralApi = require('./Mineral');

const utilities = require('./utilities');

const router = express.Router();

router.get('/allInReport', async (req, res) => {
    var all = [];
    var all = await GrindingEntry.find();
    
    if(all.length != 0){
         var file = utilities.json_to_xls(JSON.stringify(all));
         res.download(file, "Grinding_Entries.xlsx"); 
    } else {
        res.send({content: [], message: 'failure'})
    }   
})

router.post('/', (req, res) => {
    var resObj = {};
    GrindingEntry.create(req.body).then((resa)=>{
        resObj.GrindingEntrySaved = "done";
        //console.log(resa);

        //updatePowderBalance
        var updatePowderBalanceData = {
            params: {id: req.body.mineralId},
            body: {
                gradeName: req.body.gradeName, 
                quantityChange: req.body.quantityProduced, 
                //supplier: req.body.supplier
                }
            }
        mineralApi.updatePowderGradeBalance(updatePowderBalanceData, res, 0);

        }).then(()=>{
        resObj.updatePowderBalance = "done";
        
        //updateRockTypeBalance 
        var comLen = req.body.composition.length;
        var counter = {value: 0}; 
        var lCounter = 0;  
            var timer = setInterval(()=>{
                 console.log(counter); 
                 console.log(lCounter); 
                 if((lCounter >= comLen) && (counter.value == lCounter)){
                     clearInterval(timer);
                 }
                if(counter.value == lCounter && lCounter < comLen){  
                    var constituentRock = req.body.composition[lCounter++]; //2
 
                    var quantityUsed = (constituentRock.inputPartRatio)*req.body.quantityProduced;
                    if(constituentRock.constituentType === 'Rock'){
                    var updateRockTypeBalanceData = {
                        params: {id: req.body.mineralId},
                        body: {
                            rockType: constituentRock.rockType, 
                            quantityChange: -quantityUsed, 
                            supplier: constituentRock.supplier
                            }
                        }
                  mineralApi.updateRockTypeBalance(updateRockTypeBalanceData, res, counter);
                } else if(constituentRock.constituentType === 'Powder'){
                    var updatePowderGradeBalanceData = {
                        params: {id: req.body.mineralId},
                        body: {
                            rockType: constituentRock.grade, 
                            quantityChange: -quantityUsed, 
                            supplier: constituentRock.supplier
                            }
                        }
                  mineralApi.updatePowderGradeBalance(updatePowderGradeBalanceData, res, counter);
                }
            }
            }, 100)   
    }).then(()=>{
        resObj.updateRockTypeBalance = "done";
        if(resObj.updateRockTypeBalance == "done" && resObj.updatePowderBalance == "done" && resObj.GrindingEntrySaved == "done"){
            resObj.message = "success"
        }
        res.send(resObj);
    }).catch((err)=>{
        resObj.message = "failure";
        res.send(resObj);
    })
});

router.post('/deleteById/:id', async (req, res) => {
    console.log(req);
    GrindingEntry.deleteOne({_id: req.params.id}).then(() =>{
        //updatePowderBalance
        var updatePowderBalanceData = {
            params: {id: req.body.mineralId},
            body: {
                gradeName: req.body.gradeName, 
                quantityChange: -req.body.quantityProduced, 
                supplier: req.body.supplier
                }
            }
        mineralApi.updatePowderGradeBalance(updatePowderBalanceData, res, 0);
    }).then(() => {
        //updateRockTypeBalance 
        var comLen = req.body.composition.length;
        var counter = {value: 0}; 
        var lCounter = 0;  
            var timer = setInterval(()=>{
                 console.log(counter); 
                 console.log(lCounter); 
                 if((lCounter >= comLen) && (counter.value == lCounter)){
                     clearInterval(timer);
                 }
                if(counter.value == lCounter && lCounter < comLen){  
                    var constituentRock = req.body.composition[lCounter++]; //2
 
                    var quantityUsed = (constituentRock.inputPartRatio)*req.body.quantityProduced;
                    if(constituentRock.constituentType === 'Rock'){
                        var updateRockTypeBalanceData = {
                            params: {id: req.body.mineralId},
                            body: {
                                rockType: constituentRock.rockType, 
                                quantityChange: quantityUsed, 
                                supplier: constituentRock.supplier
                                }
                            }
                      mineralApi.updateRockTypeBalance(updateRockTypeBalanceData, res, counter);
                    } else if(constituentRock.constituentType === 'Powder'){
                        var updatePowderGradeBalanceData = {
                            params: {id: req.body.mineralId},
                            body: {
                                rockType: constituentRock.grade, 
                                quantityChange: quantityUsed, 
                                supplier: constituentRock.supplier
                                }
                            }
                      mineralApi.updatePowderGradeBalance(updatePowderGradeBalanceData, res, counter);
                    }
                }
            }, 100); 
    }).then(() => {
        res.send({message: 'success'})
    }).catch((err) => {
        res.send({message: 'failure', info: "while deletingById grindingEntry"});
    })
});

router.get('/getLastInserted', async (req, res) => {
    var latest = await GrindingEntry.find({}).sort({_id:-1}).limit(1);
    res.send({content: latest, message: "success"});

})


module.exports = router;