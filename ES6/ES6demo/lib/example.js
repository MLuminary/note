"use strict";

var _templateObject = _taggedTemplateLiteral(["Hello ", " world ", ""], ["Hello ", " world ", ""]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var a = 5;
var b = 10;

tag(_templateObject, a + b, a * b);