const { io } = require('../index');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand(new Band('Ns'))
bands.addBand(new Band('Nv'))
bands.addBand(new Band('Nq'))
bands.addBand(new Band('Np'))



// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');


    client.emit('active-bands', bands.getBands());
    client.on('vote-band', (payload) => {


        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.band))
        io.emit('active-bands', bands.getBands());
    });


    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands());
    });
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });


    client.on('emitir-mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', payload)
    })


});
