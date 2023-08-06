"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, resultCities, resultTurisSites, resultClient, citiesJSON, sitesJSON, clientsJSON;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().query(_database.querys.getAllCities);
        case 6:
          resultCities = _context.sent;
          _context.next = 9;
          return pool.request().query(_database.querys.getAllSites);
        case 9:
          resultTurisSites = _context.sent;
          _context.next = 12;
          return pool.request().query(_database.querys.getAllClients);
        case 12:
          resultClient = _context.sent;
          citiesJSON = resultCities.recordset;
          sitesJSON = resultTurisSites.recordset;
          clientsJSON = resultClient.recordset;
          res.render('index', {
            ciudad: citiesJSON,
            sitios: sitesJSON,
            clientes: clientsJSON
          });
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          req.flash('message', 'Error al obtener los datos');
          res.redirect('/');
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function getData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getData = getData;