'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.post('/',(req,res, next) =>{
    
    const anuncio = new Anuncio(req.body);

    anuncio.save((err,anuncioSaved) =>{
        if(err){
            console.log('Error ',err);
            next(err);
            return;
        }
        res.json({success: true, result: anuncioSaved});
    });   
});

module.exports = router;