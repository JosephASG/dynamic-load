"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCliente = exports.createCliente = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getCliente = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().query(_database.querys.getAllSites);
        case 6:
          result = _context.sent;
          console.log(result);
          res.json(result.recordset);
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getCliente(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCliente = getCliente;
var createCliente = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, fullnameClient, telClient, correoClient, codTurisClient, boolClient, pool, existingClient, lastClient, nextId, lastId, numericPart, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, fullnameClient = _req$body.fullnameClient, telClient = _req$body.telClient, correoClient = _req$body.correoClient, codTurisClient = _req$body.codTurisClient;
          boolClient = req.body.boolClient;
          if (!(fullnameClient == null || telClient == null || correoClient == null || codTurisClient == null)) {
            _context2.next = 5;
            break;
          }
          req.flash('message', 'Bad request. Por favor llene todos los campos');
          return _context2.abrupt("return", res.redirect('/'));
        case 5:
          if (!boolClient) {
            boolClient = false;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return (0, _database.getConnection)();
        case 9:
          pool = _context2.sent;
          _context2.next = 12;
          return pool.request().input("emailClient", _database.sql.Char(50), correoClient).query(_database.querys.getEmailClient);
        case 12:
          existingClient = _context2.sent;
          if (!(existingClient.recordset.length > 0)) {
            _context2.next = 16;
            break;
          }
          req.flash('message', 'El cliente con este correo ya existe');
          return _context2.abrupt("return", res.redirect('/'));
        case 16:
          _context2.next = 18;
          return pool.request().query(_database.querys.lastCodeClientRegister);
        case 18:
          lastClient = _context2.sent;
          nextId = "CLI0001"; // Valor predeterminado si no hay registros
          if (lastClient.recordset.length > 0) {
            lastId = lastClient.recordset[0].cod_cli;
            numericPart = parseInt(lastId.substring(3)) + 1;
            nextId = "CLI" + numericPart.toString().padStart(4, '0');
          }
          _context2.next = 23;
          return pool.request().input("idCliente", _database.sql.Char(15), nextId).input("fullnameClient", _database.sql.Char(50), fullnameClient).input("telClient", _database.sql.Char(50), telClient).input("correoClient", _database.sql.Char(50), correoClient).input("boolClient", _database.sql.Bit, boolClient).input("codTurisClient", _database.sql.Char(50), codTurisClient).query(_database.querys.addNewClient);
        case 23:
          result = _context2.sent;
          req.flash('success', 'Cliente añadido');
          res.redirect('/');
          _context2.next = 32;
          break;
        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](6);
          req.flash('message', 'Error al añadir cliente:', _context2.t0.message);
          return _context2.abrupt("return", res.redirect('/'));
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 28]]);
  }));
  return function createCliente(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createCliente = createCliente;