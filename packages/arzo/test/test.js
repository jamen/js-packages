var arzo = require('..');

var input = arzo({
  el: 'input',
  attr: {id: 'class'},
  data: {value: ''}
});

var display = arzo({
  el: 'div',
  data: {value: ''}
}, function(component) {
  return [component.value];
});

var mirror = arzo({
  data: {value: ''}
}, function(component) {
  console.log(component.value);
  return [
    input({
      event: {
        keyup: function(e) {
          component.value = e.target.value;
        }
      }
    }),
    display({data: {value: component.value}})
  ];
});

document.addEventListener('DOMContentLoaded', function() {
  arzo.render(mirror(), document.body);
});
