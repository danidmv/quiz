var express = require('express');       //importar
var path = require('path');             //path
var favicon = require('serve-favicon'); //favicon
var logger = require('morgan');         //middlewares
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//importar enrutadores
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();    //crear aplicaci�n

// view engine setup
app.set('views', path.join(__dirname, 'views')); //instalar generador de vistas ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());     //instalar middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//asociar rutas a sus gestores
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');   //resto de rutas
    err.status = 404;
    next(err);                          //genera error 404 de http
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);  //gesti�n de errores durante el desarrollo
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);      //gesti�n de errores de producci�n
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//exportar app para comando de arranque
module.exports = app;
