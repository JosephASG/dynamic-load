"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cityController = require("../controllers/city.controller.js");
var router = (0, _express.Router)();
router.get('/city', _cityController.getCity);
router.post('/city', _cityController.createCity);
router.get('/city/count', _cityController.getTotalCities);
router.get('/city/:id', _cityController.deleteCityId);
router.post('/city/update', _cityController.updateCityId);
var _default = router;
exports["default"] = _default;