# mixit

a smart mixin/merging object helper.

This library is now part of microjs.com listing since [madrobby/microjs.com#637](https://github.com/madrobby/microjs.com/pull/637) has been merged.

## Why ?

This library is a small helper to enable the mix of two objects while merging object properties. It is different from `_.extend` which override a property already define, while `mixit` enables the merge of the two object.

```

var a = {
  name: {
    firstname: 'foo',
    lastname: 'bar'
  },
};


var b = {
  name: {
    alias: 'foo'
  }
});

// extending the a object with b
_.extend({}, a, b);
/*
{
  name: {
    alias: 'foo',
  }
}
*/

// merging the two objects
mixit({}, a, b);
/*
{
  name: {
    firstname: 'foo',
    lastname: 'bar',
    alias: 'foo',
  }
}
*/

```

It has no external dependency, and weight about ~1.3kB and 590B minified. With gzip compression this small library should have not any impact on the size of your site, SPA or whatever!



## Installation

Using npm:
```
$ npm install mixit
```

For frontend dependencies:
```
$ bower install --save mixit
```

## Usage

* CommonJS:

```
var mixit = require('mixit');

var obj = {
  name: {
    firstname: 'foo',
    lastname: 'bar'
  },
};

mixit(obj, {
  name: {
    alias: 'foo'
  }
});

console.log(obj.name.alias); // 'foo'
```

* AMD

```
define(['mixit'], function (mixit) {
  var obj = {
    name: {
      firstname: 'foo',
      lastname: 'bar'
    },
  };

  mixit(obj, {
    name: {
      alias: 'foo'
    }
  });

  return obj;
})
```

* Browser

```
<script src="mixit.js"></script>
<script>
  var obj = {
    name: {
      firstname: 'foo',
      lastname: 'bar'
    },
  };

  mixit(obj, {
    name: {
      alias: 'foo'
    }
  });

  console.log(obj.name.alias); // 'foo'
</script>
```
