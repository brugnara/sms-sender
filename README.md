sms-sender
==========

A SMS-sender tool written in nodejs!

# How

```
npm install --save sms-sender
```

```
var smsSender = require('sms-sender');

smsSender.send('test', '393420000000', '/dev/ttyUSB0', function(err, res) {
  console.log(err, res);
});
```

Feel free to reenable `console.log` to understand what is happening.

# Current status

This is a very early prototype. 