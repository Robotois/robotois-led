var ledModule = require('bindings')('LEDModule');

function LEDModule(header){
  var _self = this;
  this.led = new ledModule(header);

  this.led_status = 0;

  process.on('SIGINT', function () {
    _self.led.release();
    // process.exit();
  });

  process.on('SIGTERM', function () {
    _self.led.release();
    // process.exit();
  });
}

LEDModule.prototype.write = function (ledValue) {
  this.led_status = ledValue;
  this.led.write(ledValue);
};

LEDModule.prototype.flash = function () {
  this.write(1);
  setTimeout(()=>{
    this.write(0);
  },3000);
  // sleep.usleep(300000); // Stops the execution for 3 secs
};

LEDModule.prototype.blink = function() {
  var interval = setInterval(()=>{
    this.flash();
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
}

LEDModule.prototype.turnOn = function () {
  this.write(1);
};

LEDModule.prototype.turnOff = function () {
  this.write(0);
};

LEDModule.prototype.switch = function(){
  if(this.led_status == 1){
    this.write(0);
  }else{
    this.write(1);
  }
}

LEDModule.prototype.release = function (){
  this.led.release();
}

module.exports = LEDModule;
