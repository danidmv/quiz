var express = require('express');       //importar
var path = require('path');             //path
var favicon = require('serve-favicon'); //favicon
var logger = require('morgan');         //middlewares
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');

//importar enrutadores
var routes = require('./routes/index');

var app = express();    //crear aplicación

// view engine setup
app.set('views', path.join(__dirname, 'views')); //instalar generador de vistas ejs
app.set('view engine', 'ejs');

//del express-partials
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());     //instalar middlewares
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//asociar rutas a sus gestores
app.use('/', routes);

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
        res.status(err.status || 500);  //gestión de errores durante el desarrollo
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);      //gestión de errores de producción
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

//exportar app para comando de arranque
module.exports = app;
