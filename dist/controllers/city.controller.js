"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCityId = exports.getTotalCities = exports.getCityId = exports.getCity = exports.deleteCityId = exports.createCity = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getCity = /*#__PURE__*/function () {
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
          return pool.request().query(_database.querys.getAllCities);
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
  return function getCity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCity = getCity;
var createCity = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var nombreCiudad, stateCity, pool, existingCity, lastCity, nextId, lastId, numericPart, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          nombreCiudad = req.body.nombreCiudad;
          stateCity = req.body.stateCity;
          if (!(nombreCiudad == null)) {
            _context2.next = 5;
            break;
          }
          req.flash('message', 'Bad request. Por favor llene todos los campos');
          return _context2.abrupt("return", res.redirect('/'));
        case 5:
          if (!stateCity) {
            stateCity = false;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return (0, _database.getConnection)();
        case 9:
          pool = _context2.sent;
          _context2.next = 12;
          return pool.request().input("nameCiud", _database.sql.Char(50), nombreCiudad).query(_database.querys.getCityName);
        case 12:
          existingCity = _context2.sent;
          if (!(existingCity.recordset.length > 0)) {
            _context2.next = 16;
            break;
          }
          req.flash('message', 'La ciudad ya existe');
          return _context2.abrupt("return", res.redirect('/'));
        case 16:
          _context2.next = 18;
          return pool.request().query(_database.querys.lastCodeCityRegister);
        case 18:
          lastCity = _context2.sent;
          nextId = "C0001"; // Valor predeterminado si no hay registros
          if (lastCity.recordset.length > 0) {
            lastId = lastCity.recordset[0].cod_ciud;
            numericPart = parseInt(lastId.substring(1)) + 1;
            nextId = "C" + numericPart.toString().padStart(4, '0');
          }
          _context2.next = 23;
          return pool.request().input("idCiud", _database.sql.Char(15), nextId).input("nameCiud", _database.sql.Char(50), nombreCiudad).input("stateCiud", _database.sql.Bit, stateCity).query(_database.querys.addNewCity);
        case 23:
          result = _context2.sent;
          req.flash('success', 'Ciudad agregada');
          res.redirect('/');
          _context2.next = 32;
          break;
        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](6);
          req.flash('message', 'Error al crear la ciudad:', _context2.t0.message);
          return _context2.abrupt("return", res.redirect('/'));
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 28]]);
  }));
  return function createCity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createCity = createCity;
var getCityId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.request().input('codCiud', _database.sql.Char, id).query(_database.querys.getCityId);
        case 7:
          result = _context3.sent;
          console.log(result);
          if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
          } else {
            res.status(404).json({
              msg: 'City not found'
            });
          }
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](4);
          console.error("Error fetching city data:", _context3.t0);
          res.status(500).json({
            msg: "Internal server error"
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 12]]);
  }));
  return function getCityId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getCityId = getCityId;
var deleteCityId = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context4.sent;
          _context4.prev = 4;
          _context4.next = 7;
          return pool.request().input('codCiud', _database.sql.Char, id).query(_database.querys.deleteCity);
        case 7:
          result = _context4.sent;
          if (result.rowsAffected[0] > 0) {
            req.flash('success', 'Ciudad eliminada correctamente');
            res.redirect('/');
          } else {
            req.flash('message', 'Ciudad no encontrada');
            res.redirect('/');
          }
          _context4.next = 16;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](4);
          console.error("Error deleting city:", _context4.t0);
          req.flash('message', 'Error eliminando ciudad: ', _context4.t0.message);
          res.redirect('/');
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 11]]);
  }));
  return function deleteCityId(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deleteCityId = deleteCityId;
var getTotalCities = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return pool.request().query(_database.querys.getTotalCities);
        case 6:
          result = _context5.sent;
          console.log(result);
          res.json({
            msg: 'Get successfully',
            result: result.recordset[0]['']
          });
          _context5.next = 15;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error("Error getting cities count:", _context5.t0);
          res.status(500).json({
            msg: "Internal server error"
          });
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getTotalCities(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getTotalCities = getTotalCities;
var updateCityId = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, idCiudad, nombreCiudad, estadoCiudad, pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, idCiudad = _req$body.idCiudad, nombreCiudad = _req$body.nombreCiudad, estadoCiudad = _req$body.estadoCiudad;
          if (!(nombreCiudad == null || estadoCiudad === null)) {
            _context6.next = 4;
            break;
          }
          req.flash('message', 'Bad request. Por favor llene todos los campos');
          return _context6.abrupt("return", res.redirect('/'));
        case 4:
          _context6.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context6.sent;
          _context6.prev = 7;
          _context6.next = 10;
          return pool.request().input("nameCiud", _database.sql.Char(50), nombreCiudad).input("stateCiud", _database.sql.Bit, estadoCiudad).input("idCiud", _database.sql.Char(15), idCiudad).query(_database.querys.updateCityId);
        case 10:
          result = _context6.sent;
          if (!(result.rowsAffected[0] > 0)) {
            _context6.next = 16;
            break;
          }
          req.flash('success', 'Ciudad actualizada correctamente');
          res.redirect('/');
          _context6.next = 18;
          break;
        case 16:
          req.flash('message', 'Ciudad no encontrada.');
          return _context6.abrupt("return", res.redirect('/'));
        case 18:
          _context6.next = 25;
          break;
        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](7);
          console.error("Error updating city:", _context6.t0);
          req.flash('message', 'Error al actualizar la ciudad:', _context6.t0.message);
          return _context6.abrupt("return", res.redirect('/'));
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[7, 20]]);
  }));
  return function updateCityId(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateCityId = updateCityId;