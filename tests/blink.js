const LED = require('../index');

const led = new LED(5);

led.blink(true);

setTimeout(() => {
  led.blink(false);
}, 5000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
