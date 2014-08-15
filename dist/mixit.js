/*! mixit - v0.2.0 - 2014-08-15
* https://github.com/stephanebachelier/mixit
* Copyright (c) 2014 ; Licensed  */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['mixit'] = factory();
  }
}(this, function () {

  'use strict';
  var has = function (obj, prop) {
    return hasOwnProperty.call(obj, prop);
  };
  
  var mixit = function (obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0, len = args.length;
    for (;i < len; i += 1) {
      var mixin = args[i];
      // loop all properties in mixin
      for (var prop in mixin) {
        if (has(mixin, prop)) {
          if (!has(obj, prop)) {
            obj[prop] = mixin[prop];
          }
          else {
            if (typeof mixin[prop] === 'object' && typeof obj[prop] === 'object') {
              // recursion!
              obj[prop] = mixit(obj[prop], mixin[prop]);
            }
          }
        }
      }
    }
    return obj;
  };
  

  return mixit;


}));
