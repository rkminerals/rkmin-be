const json2xls = require('json2xls');
const fs = require('fs');

const jx = (json) => {
    json = JSON.parse(json);
    if(json[0].composition){
        json.map((grindingEntry) => {
            grindingEntry.composition = JSON.stringify(grindingEntry.composition);
        })
    }
    // var arr = [];
    // json.map((mineral) => {
    //     var q=0; 
    //     mineral.rockTypes.map((rockType) => {
    //         q += rockType.typeBalance; 
    //     })
    //     arr.push({mineral: mineral.mineralName, balance: q});
    // })
    // console.log(arr);

var xls = json2xls(json); 
fs.writeFileSync(`${__dirname}/reports/data.xlsx`, xls, 'binary');
const file = `${__dirname}/reports/data.xlsx`;  
return file;
}

module.exports = {
    json_to_xls: jx
}