export const lexing = {
  string(source) {
    const cur = source.current();
    if (cur === '"' || cur === "'") {
      source.next();
      const data = source.forward(() => {
        if (source.current() === '\\') return source.forward();
        return source.current() !== cur;
      });
      source.next();

      this.token('string', data, { type: cur });
    }

    return source;
  },

  integer(source) {
    if (/[0-9]/.test(source.current())) {
      console.log('Thats an int');
      let radix = 10;
      if (source.lookahead(2) === '0x') radix = 16;
      if (source.lookahead(2) === '0b') radix = 2;
      if (radix !== 10) source.forward(2);
      const integer = source.forward(/[0-9]/);
      this.token('integer', parseInt(integer, radix), { radix });
    }

    return source;
  },

  whitespace(source) {
    if (/\s/.test(source.current())) {
      let data = source.forward();
      if (source.lookback(1) === '\r' && source.current() === '\n') data = '\r\n';
      this.token('whitespace', data);
    }

    return source;
  },

  arithmetic(source) {
    const test = source.clone().forward(/[+-/*]/);
    switch (test) {
      default:
      case '':
        break;

      case '+':
      case '-':
      case '*':
      case '/':
      case '**':
        this.token('arithmetic operator', test);
        source.forward(test.length);
        break;
    }
    return source;
  },
};

lexing.all = [lexing.string, lexing.integer, lexing.whitespace, lexing.arithmetic];
