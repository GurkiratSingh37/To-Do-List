'use strict';

const bodyParser=require('body-parser');

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());