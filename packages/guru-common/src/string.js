export default function string(source) {
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
}
