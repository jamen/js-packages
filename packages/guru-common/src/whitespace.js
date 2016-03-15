export default function whitespace(source) {
  if (/\s/.test(source.current())) {
    let data = source.forward();
    if (source.lookback(1) === '\r' && source.current() === '\n') data = '\r\n';
    this.token('whitespace', data);
  }

  return source;
}
