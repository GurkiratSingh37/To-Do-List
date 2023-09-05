'use strict';

const startAppServer = async (port)=>{
    app.listen(port,()=>{
        console.log(`Server Running on Port ${port}`);
    });
}

exports.startAppServer = startAppServer;