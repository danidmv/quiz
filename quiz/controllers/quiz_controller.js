/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//GET /quizes/question
exports.question = function(req, res){
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

//GET /quizes/answer
exports.answer = function(req, res){
    if( req.query.respuesta === "Roma" ){
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } 
    else {
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
};

//GET /author
exports.author = function(req, res){
    res.render('author');
};