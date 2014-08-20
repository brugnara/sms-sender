var smsSender = require('./');

smsSender.send('test', '393420011223', '/dev/ttyUSB0', function(err, res) {
  console.log(err, res);
});