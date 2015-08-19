/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// get /login - formulario login
exports.new = function(req, res ){
    var errors = req.session.erros || {};
    req.session.errors = {};
    
    res.render('sessions/new', { errors: errors} );
};


// post /login - crear sesion
exports.create = function(req, res){
    var login = req.body.login;
    var password = req.body.password;
    
    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user){
        
        if(error){  //si hay error retornamos mensajes de error de sesion
            req.session.errors = [{"message": 'Se ha producido un error: '+ error }];
            res.redirect("/login");
            return;
        }
        
        //crear req.session.user y guardar campos id y username
        //la session se define por la existendia de: req.session.user
        req.session.user = { id: user.id, username: user.username };
        
        res.redirect( req.session.redir.toString() ); //redireccion a path anterior a login
    });
    
};


// delete / logout -destruir sesion
exports.destroy = function(req, res){
    delete req.session.user;
    res.redirect( req.session.redir.toString()); //redirect a path anterior a login
};