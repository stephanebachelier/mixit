var should = require('should');
var mixit = require('../dist/mixit');

describe('mixit unit test', function () {

  it('should add a new property on an object', function () {
    var obj = {
      foo: 'bar'
    };

    mixit(obj, {bar: 'foo'});
    obj.should.have.property('bar', 'foo');
  });

  it('should mix a property on an object', function () {
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

    obj.name.should.exists;
    // check previous existing properties not changed
    obj.name.should.have.property('firstname', 'foo');
    obj.name.should.have.property('lastname', 'bar');

    // check new property added
    obj.name.should.have.property('alias', 'foo');
  });

  it('should not shadow an existing method on an object', function () {
    var obj = {
      foo: function () {}
    };

    mixit(obj, {foo: 'bar'});

    obj.should.have.property('foo');
    obj.foo.should.be.a.Function;
  });

  it('should mix all levels', function () {
    var obj = {
      a: {
        b: 1,
        c: {
          d: {
            a: 'foo'
          },
          e: 'bar'
        }
      }
    };

    // manually create a simple clone of obj
    var clone = {};
    clone.a = obj.a;

    mixit(clone, {
      a: {
        f: 'foo',
        c: {
          foo: 'bar',
          d: {
            c: 'thunderstruck'
          }
        }
      }
    });
    obj.a.should.have.property('b', 1);
    obj.a.should.have.property('f', 'foo');
    obj.a.c.should.have.property('foo', 'bar');
    obj.a.c.d.should.have.property('a', 'foo');
    obj.a.c.d.should.have.property('c');
    obj.a.c.d.c.should.eql('thunderstruck');

  });
});
