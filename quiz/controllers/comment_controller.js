﻿/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var models = require('../models/models.js');


// get /quizes/:quizId/comments/new
exports.new = function(req, res) {
    res.render('comments/new.ejs', { quizid: req.params.quizId, errors: []});
};

//posts /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build( 
          {
            texto : req.body.comment.texto,
            QuizId: req.params.quizId
          }); 
  
  comment
    .validate()
    .then(function(err){
        if(err){
            res.render('comments/new.ejs', { comment: comment, errors: err.errors });
        }
        else{
            comment.save().then(function(){
                res.redirect('/quizes/'+req.params.quizId);  
            });   
        }
    }).catch(function(error){ next(error); });
};
