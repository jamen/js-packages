export default function integer(source) {
  if (/[0-9]/.test(source.current())) {
    let radix = 10;
    if (source.lookahead(2) === '0x') radix = 16;
    if (source.lookahead(2) === '0b') radix = 2;
    if (radix !== 10) source.forward(2);
    const int = source.forward(/[0-9]/);
    this.token('integer', parseInt(int, radix), { radix });
  }

  return source;
}
