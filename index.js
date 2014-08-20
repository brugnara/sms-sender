var pduConvert = require('sms-pdu-node');
var SerialPort = require("serialport").SerialPort;

module.exports = {
  send: function(text, number, serialPortDev, options, cb) {
    if (!cb) {
      cb = options;
      options = null;
    }
    if (!options) {
      options = {
        baudrate: 9600
      };
    }
    var serialPort = new SerialPort(serialPortDev, options);
    var pdu = pduConvert(text, number);
    var logger = function(err, res) {
      // console.error(err);
      // console.log(res);
    };
    var commands = [
      function(cb) {
        serialPort.write(pdu.command + '\r', cb);
      },
      function(cb) {
        serialPort.write(pdu.pdu + String.fromCharCode(26), cb); // ^Z
      },
      function(cb) {
        serialPort.close();
      }
    ];
    //
    serialPort.on("open", function () {
      // console.log('serial opened');

      serialPort.on('data', function(data) {
        // console.log('data received: ' + data);
        commands.shift()(logger);
      });

      commands.shift()(logger);

    });
  }
};
