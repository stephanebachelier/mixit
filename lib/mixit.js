'use strict';
var mixit = function (obj) {
  var slice = Array.prototype.slice;
  _.each(slice.call(arguments, 1), function (mixin) {
    for (var prop in mixin) {
      if (_.has(mixin, prop)) {
        if (!_.has(obj, prop)) {
          obj[prop] = mixin[prop];
        }
        else {
          if (typeof mixin[prop] === 'object' && typeof obj[prop] === 'object') {
            // do not override properties on object
            // do not modify mixin prop too.
            // mixin[prop] should be seen as default values
            obj[prop] = mixit(obj[prop], mixin[prop]);
          }
        }
      }
    }
  });
  return obj;
};

// attach to underscore
_.mixit = mixit;
