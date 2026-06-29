const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*", // Permite que Flutter se conecte desde cualquier IP
        methods: ["GET", "POST"]
    }
});

module.exports.io = io;

require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));





server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


