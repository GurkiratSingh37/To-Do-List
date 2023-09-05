'use strict';

const socketIo = require('socket.io');
const redisAdapter = require('socket.io-redis');
const dbProperties = require('../../database/dbProperties');
const jwtService = require('../../services/jwtService');
const socketService = require('./services/socketService');
const onService = require('./services/onService');
const logging = require('../../logging/logging');

const initializeSocket = async(apiReference, server)=>{

    logging.log(apiReference, {EVENT: "STARTING SOCKET CONNECTION @ - Socker Initialization"})

    let accessToken;
    let decodedToken;

    const io = socketIo(server, {
        cors: {
            origin: '*'
        }
    })

    try{
        io.adapter(redisAdapter({
            host: dbProperties.redisdb.host,
            port: dbProperties.redisdb.port,
            password: dbProperties.redisdb.password,
            prefix: dbProperties.redisdb.prefix
        }))
    }
    catch(err){
        logging.error(err);
    }

    io.use(function(socket, next){
        if(socket.handshake.query && socket.handshake.auth.access_token){
            accessToken = socket.handshake.query.access_token;
            decodedToken = jwtService.verifyJwt(apiReference, accessToken);

            logging.log(apiReference, {EVENT: 'INSIDE io.use - Middlewware', handshake: socket.handshake.query});

            if(!decodedToken) {
                return next(new Error('Authentication Error - Decoded token is not valid'));
            }
            next();
        }
        else{
            return next(new Error('Authentication Error - Query token is invalid/empty'));
        }
    });

    io.on('connection', async (socket)=>{
        console.log(socket.id);

        // creating a room for the user.
        await socketService.addingToRoom(apiReference, {socket, accessToken, decodedToken});

        await onService.socketOnServices(apiReference, io, socket)

    })

}

exports.initializeSocket = initializeSocket;