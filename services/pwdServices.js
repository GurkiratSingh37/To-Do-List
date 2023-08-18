'use strict';

const bcrypt = require('bcrypt');

const encrypt = (password)=>{
    return bcrypt.hashSync(password, 10);
};

const compare = (password, hash) => { // 'hash' - stored in our database
    return bcrypt.compare(password, hash)
};

exports.encrypt = encrypt;
exports.compare = compare;