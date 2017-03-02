const LedModule = require('bindings')('LEDModule');
/**
 * Creates an instance of LightSensor.
 * @param {int} port The port number where this component us connected.
 * @returns {LEDModule} LEDModule object
 */
function LEDModule(port) {
  const selft = this;
  this.led = new LedModule(port);
  this.led_status = 0;

  process.on('SIGINT', () => {
    selft.led.release();
  });

  process.on('SIGTERM', () => {
    selft.led.release();
  });
}

LEDModule.prototype.write = function write(ledValue) {
  this.led_status = ledValue;
  this.led.write(ledValue);
};

LEDModule.prototype.flash = function flash() {
  this.write(1);
  setTimeout(() => {
    this.write(0);
  }, 3000);
  // sleep.usleep(300000); // Stops the execution for 3 secs
};

LEDModule.prototype.blink = function blink() {
  const interval = setInterval(() => {
    this.flash();
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
};

LEDModule.prototype.turnOn = function turnOn() {
  this.write(1);
};

LEDModule.prototype.turnOff = function turnOff() {
  this.write(0);
};

LEDModule.prototype.toggle = function toggle() {
  if (this.led_status === 1) {
    this.write(0);
  } else {
    this.write(1);
  }
};

LEDModule.prototype.release = function release() {
  this.led.release();
};

module.exports = LEDModule;
