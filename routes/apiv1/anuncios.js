'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const fs = require('fs');

router.get('/', (req, res, next) => {
    try{

    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const tags = req.query.tags;
    const precio = req.query.precio;  
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const includeTotal = true;
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
    
          const {total, rows} = await Anuncio.list(filter, skip, limit, sort, includeTotal);
          res.render('anuncios', { total, anuncios: rows });
        } catch(err) { return res.next(err); }   
});

module.exports = router;