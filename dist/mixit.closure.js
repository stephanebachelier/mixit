/*! mixit - v0.3.1 - 2014-08-15
* https://github.com/stephanebachelier/mixit
* Copyright (c) 2014 ; Licensed  */
function mixit (obj) {
  'use strict';

  var has = function (obj, prop) {
    return hasOwnProperty.call(obj, prop);
  };

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
}
