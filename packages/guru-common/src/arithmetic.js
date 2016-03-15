const operators = ['+', '-', '*', '/', '**'];

export default function arithmetic(source) {
  const test = source.clone().forward(/[+-/*]/);
  if (test && ~operators.indexOf(test)) {
    this.token('arithmetic operator', test);
    source.forward(test.length);
  }
  return source;
}
