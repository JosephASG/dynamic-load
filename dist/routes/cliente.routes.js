"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _clienteController = require("../controllers/cliente.controller.js");
var router = (0, _express.Router)();
router.get('/cliente', _clienteController.getCliente);
router.post('/cliente', _clienteController.createCliente);
// router.get('/cliente/count', getTotalCities)
// router.get('/cliente/:id', deleteCityId)
// router.delete('/cliente/:id', deleteCityId)
// router.post('/cliente/update', updateCityId)
var _default = router;
exports["default"] = _default;