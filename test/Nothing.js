'use strict';

const S = require ('..');

const eq = require ('./internal/eq');


test ('Nothing', () => {

  eq (typeof S.Nothing) ('object');
  eq (S.show (S.Nothing)) ('Nothing');

  eq (S.Nothing) (S.Nothing);

});
