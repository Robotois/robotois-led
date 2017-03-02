var _led = require('../index'),
  led = new _led(5);


setInterval(()=>{ // Proceso en estado ocioso
  led.switch();
},1000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
