# mixit

a smart mixin helper method to provide object property mixin.

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

It only needs underscore as a dependency, and as a bonus it is the helper is added to underscore under the name `mixit`, so, once loaded, this library can be use with `mixit` or `_.mixit`.



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
var _ = require('underscore');
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
<script src="underscore.js"></script>
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
