'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.get('/', (req, res, next) => {

    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const tags = req.query.tags;
    const precio = req.query.precio;  
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const filter = {};
    
    if (nombre){
        filter.nombre = new RegExp('^'+req.query.nombre,"i");;
    }
    if (venta){
        filter.venta = venta;
    }
    if (tags){
        filter.tags = tags;
    }
    if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
        if (req.query.precio.indexOf('-') !== -1) {
            filter.precio = {};
            let rango = req.query.precio.split('-');
            if (rango[0] !== '') {
                filter.precio.$gte = rango[0];
            }
            if (rango[1] !== '') {
                filter.precio.$lte = rango[1];
            }
            } else {
              filter.precio = req.query.precio;
            }
          }
    
    Anuncio.lista(filter, skip, limit).then(lista => {
        res.render('anuncios',{lista,ruta});
        }).catch( err => {
            console.log('Error ',err);
            next(err);
            return;        
    });
});

module.exports = router;