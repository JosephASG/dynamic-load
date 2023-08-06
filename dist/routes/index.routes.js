"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _dataController = require("../controllers/data.controller.js");
var router = (0, _express.Router)();
router.get('/', _dataController.getData);
var _default = router;
exports["default"] = _default;