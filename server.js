const express = require('express');
const connectDB = require('./DBConnection/Connection');
const cors = require('cors');
const json2xls = require('json2xls');

const app = express();
app.use(cors());

connectDB();

app.use(express.json({extended: false}));
app.use(json2xls.middleware);

app.use('/api/mineralModel', require('./Api/Mineral').router);
app.use('/api/incomingEntryModel', require('./Api/IncomingEntry'));
app.use('/api/grindingEntryModel', require('./Api/GrindingEntry'));
app.use('/api/powderDispatchingEntryModel', require('./Api/PowderDispatchingEntry'));

const Port = process.env.PORT || 3001;

app.listen(Port, () => console.log(`Our app is running on port ${ Port }`));
