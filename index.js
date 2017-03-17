const LedModule = require('bindings')('LEDModule');
/**
 * Creates an instance of LEDModule.
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
  if (!this.interval) {
    this.interval = setInterval(() => {
      this.toggle();
    }, 400); // cambiar estado cada 400ms
  }
};

LEDModule.prototype.turnOn = function turnOn() {
  this.write(1);
};

LEDModule.prototype.turnOff = function turnOff() {
  clearInterval(this.interval);
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
  clearInterval(this.interval);
  this.led.release();
};

module.exports = LEDModule;
