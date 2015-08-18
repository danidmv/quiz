/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var models = require('../models/models.js');

// autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.findById(quizId).then(function(quiz){
        if(quiz){
            req.quiz = quiz;
            next();
        }
        else{
            next( new Error('No existe quizId='+quizId));
        }
    }).catch(function(error){next(error);});
};

// get /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz: quiz,  errors: []});
};

//posts /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz ); 
  
  quiz
    .validate().then(function(err){
        if(err){
            res.render('quizes/new', {quiz: quiz, errors: err.errors });
        }
        else{
            quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
                res.redirect('/quizes');  
            });   // res.redirect: Redirección HTTP a lista de preguntas
        }
    });
};

//GET /quizes/question
exports.question = function(req, res){
    models.Quiz.findAll().then(function(quiz){
        res.render('quizes/question', {pregunta: quiz[0].pregunta});
    });
    //res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

//get /quizes/:id
exports.show = function(req, res){
    models.Quiz.findById(req.params.quizId).then(function(quiz){
        res.render('quizes/show', {quiz: req.quiz,  errors: []});
    });
}

//GET /quizes/:id/answer
exports.answer = function(req, res){
    var resultado = 'Incorrecto';
    if( req.query.respuesta === req.quiz.respuesta ){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado,  errors: []});
//    models.Quiz.findById(req.params.quizId).then(function(quiz){
//        if(req.query.respuesta === req.quiz.respuesta ){
//            res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
//        } 
//        else{
//            res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
//        }
//    });
//    models.Quiz.findAll().then(function(quiz){
//        if( req.query.respuesta === quiz[0].respuesta ){
//           res.render('quizes/answer', {respuesta: 'Correctoo'});
//        } 
//        else {
//            res.render('quizes/answer', {respuesta: 'Incorrectoo'});
//        }
//    });
};

//GET /author
exports.author = function(req, res){
    res.render('author');
};

//get /quizes
exports.index = function(req, res){
    //buscar
    var buscar = '%'
    if( req.query.buscar ){
        buscar = '%'+req.query.buscar+'%';
        buscar = buscar.replace(/\s+/g,'%');
    }
    models.Quiz.findAll(
            { where : ["LOWER( pregunta ) LIKE LOWER (?)", buscar]}
            ).then(function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }).catch(function(error){next(error);});
};