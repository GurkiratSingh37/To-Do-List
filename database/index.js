
const mysqllib = require('./mysqllib');
const mongoCon = require('./mongodlib');

async function initialize(selectedDb) {
    if(selectedDb === 'mysql'){
        console.log('inside')
        global.mysqlCon = await mysqllib.initialize();
    } 
    else{
        global.mongoCon = mongoCon.mongoConnect;
    }
}

exports.initialize                  = initialize;