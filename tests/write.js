const LED = require('../index');

const led = new LED(4);

led.write(1);
setTimeout(() => {
  led.write(0);
}, 2000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
