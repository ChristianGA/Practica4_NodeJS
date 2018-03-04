'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.get('/',(req,res,next)  => { 

    Anuncio.lista_tags(filter).then(lista => {     
        res.render('tags',{lista});
    }).catch( err => {
            console.log('Error ',err);
            next(err);
            return;        
    });
});

module.exports = router;