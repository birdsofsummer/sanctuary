'use strict';

var S = require('./internal/sanctuary');

var Identity = require('./internal/Identity');
var eq = require('./internal/eq');


test('traverse', function() {

  eq(typeof S.traverse, 'function');
  eq(S.traverse.length, 3);
  eq(S.traverse.toString(), 'traverse :: (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)');

  eq(S.traverse(S.Maybe, S.parseInt(16), ['A', 'B', 'C']), S.Just([10, 11, 12]));
  eq(S.traverse(S.Maybe, S.parseInt(16), ['A', 'B', 'C', 'X']), S.Nothing);

  eq(S.traverse(Array, S.I, []), [[]]);
  eq(S.traverse(Array, S.I, [['A', 'a']]), [['A'], ['a']]);
  eq(S.traverse(Array, S.I, [['A', 'a'], ['B']]), [['A', 'B'], ['a', 'B']]);
  eq(S.traverse(Array, S.I, [['A', 'a'], ['B', 'b']]), [['A', 'B'], ['A', 'b'], ['a', 'B'], ['a', 'b']]);

  eq(S.traverse(Array, S.words, Identity('')), []);
  eq(S.traverse(Array, S.words, Identity('foo')), [Identity('foo')]);
  eq(S.traverse(Array, S.words, Identity('foo bar')), [Identity('foo'), Identity('bar')]);
  eq(S.traverse(Array, S.words, Identity('foo bar baz')), [Identity('foo'), Identity('bar'), Identity('baz')]);

  eq(S.traverse(Identity, S.I, []), Identity([]));
  eq(S.traverse(Identity, S.I, [Identity(1)]), Identity([1]));
  eq(S.traverse(Identity, S.I, [Identity(1), Identity(2)]), Identity([1, 2]));
  eq(S.traverse(Identity, S.I, [Identity(1), Identity(2), Identity(3)]), Identity([1, 2, 3]));

});
