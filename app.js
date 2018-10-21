const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/routes');

const app = express();
//const expressValidator = require('express-validator');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// //handlebars setup
const exphbs  = require('express-handlebars');
// const hbs = exphbs.create({ /* config */ });
//
// // Register `hbs.engine` with the Express app.
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs',exphbs({defaultLayout: 'main', extname:'.hbs'}));
//app.use(expressValidator());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error: ' + err.message);
});

module.exports = app;
