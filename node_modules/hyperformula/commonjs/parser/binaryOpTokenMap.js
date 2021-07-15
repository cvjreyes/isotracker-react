"use strict";

exports.__esModule = true;
exports.binaryOpTokenMap = void 0;

var _Ast = require("./Ast");

var _binaryOpTokenMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var binaryOpTokenMap = (_binaryOpTokenMap = {}, _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.PLUS_OP, '+'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.MINUS_OP, '-'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.TIMES_OP, '*'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.DIV_OP, '/'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.CONCATENATE_OP, '&'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.POWER_OP, '^'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.EQUALS_OP, '='), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.NOT_EQUAL_OP, '<>'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.GREATER_THAN_OP, '>'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.GREATER_THAN_OR_EQUAL_OP, '>='), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.LESS_THAN_OP, '<'), _defineProperty(_binaryOpTokenMap, _Ast.AstNodeType.LESS_THAN_OR_EQUAL_OP, '<='), _binaryOpTokenMap);
exports.binaryOpTokenMap = binaryOpTokenMap;