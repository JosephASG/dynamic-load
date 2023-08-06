"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressHandlebars = require("express-handlebars");
var _expressSession = _interopRequireDefault(require("express-session"));
var _morgan = _interopRequireDefault(require("morgan"));
var _config = _interopRequireDefault(require("./config.js"));
var _cityRoutes = _interopRequireDefault(require("./routes/city.routes.js"));
var _sitiosRoutes = _interopRequireDefault(require("./routes/sitios.routes.js"));
var _clienteRoutes = _interopRequireDefault(require("./routes/cliente.routes.js"));
var _indexRoutes = _interopRequireDefault(require("./routes/index.routes.js"));
var _path = _interopRequireDefault(require("path"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var app = (0, _express["default"])();

// middlewares
app.use((0, _expressSession["default"])({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  } // 30 días de duración de la cookie de sesión
}));

app.use((0, _connectFlash["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));

// Establecer la ubicación de las vistas (templates) de Handlebars
app.set("views", _path["default"].join("src/views"));
// Configurar Handlebars como el motor de plantillas
app.engine('.hbs', (0, _expressHandlebars.engine)({
  defaultLayout: 'main',
  layoutsDir: _path["default"].join(app.get('views'), 'layouts'),
  partialsDir: _path["default"].join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set("view engine", ".hbs");
app.use(_express["default"]["static"]('src/public'));
// settings
app.set('port', _config["default"].port);

//Global variables
app.use(function (req, res, next) {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});
app.use(_cityRoutes["default"]);
app.use(_indexRoutes["default"]);
app.use(_sitiosRoutes["default"]);
app.use(_clienteRoutes["default"]);
var _default = app;
exports["default"] = _default;