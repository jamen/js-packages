import arithmetic from './arithmetic';
import integer from './integer';
import whitespace from './whitespace';
import string from './string';
const lexing = [arithmetic, integer, whitespace, string];
export { arithmetic, integer, whitespace, string, lexing };

// Babel compatibility
export default module.exports;
