"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _sitiosController = require("../controllers/sitios.controller.js");
var router = (0, _express.Router)();
router.get('/turismsites', _sitiosController.getSite);
router.post('/turismsites', _sitiosController.createTurismSite);
// router.get('/turismsites/count', getTotalCities)
// router.get('/turismsites/:id', deleteCityId)
// router.delete('/turismsites/:id', deleteCityId)
// router.post('/turismsites/update', updateCityId)
var _default = router;
exports["default"] = _default;