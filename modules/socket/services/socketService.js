'use strict';

const socketConstants = require('../properties/socketConstants');
const logging = require('../../../logging/logging');

const addingToRoom = async(apiReference, opts)=>{
    const tokenData = opts.decodedToken;
    const roomName = socketConstants.ROOM_PREFIX + tokenData.user_id;

    logging.log(apiReference, {RESPONSE: (tokenData.name || 'Customer XXX')+ `adding to room ${roomName}`+`with socket Id ${opts.socket.id}`});

    opts.socket.join(roomName);
}

exports.addingToRoom = addingToRoom;