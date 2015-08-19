/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var users = {
    admin : { id: 1, username:"admin", password: "1234" },
    pepe:  { id: 2, username:"pepe", password: "5678" }
}

// comprueba si el usuario esta registrado en users
exports.autenticar = function( login, password, callback ){
    if(users[login]){
        if( password === users[login].password ){
            callback(null, users[login]);
        }
        else{
            callback( new Error('Password erróneo'));
        }
    }
    else{
        callback(new Error('No existe el usuario'));
    }
};

