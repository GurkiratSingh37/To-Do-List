'use strict';

exports.modules = {
    TODO: "todo",
    REGISTER: "register",
    LOGIN: "login"
}

exports.responseMessages = {
    SUCCESS: "Success",
    FAILURE: "Failure",
    USER_ALREADY_REGISTERED: "User already registered with us. Try signing in",
    REGISTER_SUCCESS            : "User registered successfully",
    INVALID_CREDENTIALS         : "Invalid Credentials!",
    INVALID_AUTH_KEY            : "Invalid Token!"
}

exports.responseStatus = {
    SUCCESS: 200,
    FAILURE: 401,
    SESSION_EXPIRED             : 440
}