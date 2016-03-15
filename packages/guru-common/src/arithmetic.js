export default function arithmetic(source) {
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
}
