const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);