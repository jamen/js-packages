'use strict';

const decode = require('../../lib').decode,
      clientMessage = new Buffer([129,140,163,113,103,158,235,20,11,242,204,81,16,241,209,29,3,191]);

describe('WebSocket decoder', function(){
  it('Deframes and unmasks websocket messages', function(){
    let decoded = decode(clientMessage);
    expect(decoded.result).toBe('Hello world!');
    expect(decoded.fin).toBe(true);
    expect(decoded.masked).toBe(true);
    expect(decoded.reserves).toBe(0);
    expect(decoded.length).toBe(12);
    expect(decoded.masks).toEqual([ 163, 113, 103, 158 ]);
    expect(decoded.opts).toBe(1);
  });
});
