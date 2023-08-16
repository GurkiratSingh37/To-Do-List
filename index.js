const express                     = require('express');
const router                      = express.Router();
const app                         = express();

// const mongoConnect = require('./database/mongodlib').mongoConnect;

global.app                        = app;
global.router                     = router;

require('./middlewares')
require('./modules');
require('./startup').initializeServer();

// require('./database/mongodlib').dbConn();
// mongoConnect( ()=>{
//     console.log('YESSSsss');
// })

module.exports = router;
module.exports = app;













/*
const express = require('express');
const app=new express();

const bodyParser=require('body-parser');

const router=require('./routes/items')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/items',router.router);

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});
*/