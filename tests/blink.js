const LED = require('../');

const led = new LED(4);

led.blink();

setTimeout(() => {
  led.turnOff();
}, 5000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
