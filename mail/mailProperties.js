'use strict';

const config=require('config');

exports.mailProp = {
    host        : config.get('mailSettings.host'),
    port        : config.get('mailSettings.port'),
    user        : config.get('mailSettings.auth.user'),
    pass        : config.get('mailSettings.auth.pass'),
    from        : config.get('mailSettings.from')
}