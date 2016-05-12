# Arzo
> An experimental component idea.

Using components:
```javascript
const foo = arzo({
  el: 'div',
  data: {value: 'foo'}
}, component => [
  'Hello ' + component.value
]);
console.log(foo.body());
// => ['Hello foo']

foo.value = 'World';
console.log(foo.body());
// => ['Hello world']
```

Rendering components to DOM:
```javascript
const foo = arzo(...);

arzo.render(foo, mountNode);
```
