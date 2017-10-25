const LedModule = require('bindings')('LEDModule');
/**
 * Creates an instance of LEDModule.
 * @param {int} port The port number where this component us connected.
 * @returns {LEDModule} LEDModule object
 */
function LEDModule(port) {
  const selft = this;
  this.led = new LedModule(port);
  this.ledStatus = 0;
  this.blinkInterval = false;

  process.on('SIGINT', () => {
    selft.led.release();
  });

  process.on('SIGTERM', () => {
    selft.led.release();
  });
}

LEDModule.prototype.write = function write(ledValue) {
  switch (ledValue) {
    case 0:
      this.turnOff();
      break;
    case 1:
      this.turnOn();
      break;
    default:
      this.turnOff();
  }
};

LEDModule.prototype.publishNow = function publishNow() {
  this.mqttClient.publish(
    this.myTopic,
    this.blinkInterval ? 'blink' : this.ledStatus.toString(),
  );
};

LEDModule.prototype.setMqttClient = function setMqttClient(mqttConfig) {
  this.mqttClient = mqttConfig.mqttClient;
  this.myTopic = `digitalOutputs/led${mqttConfig.instance}`;
};

LEDModule.prototype.setValue = function setValue(value, notify) {
  this.led.write(value);
  this.ledStatus = value;
  if (this.mqttClient && notify) {
    this.mqttClient.publish(this.myTopic, value.toString());
  }
};

LEDModule.prototype.blink = function blink() {
  if (!this.blinkInterval) {
    if (this.mqttClient) {
      this.mqttClient.publish(this.myTopic, 'blink');
    }
    this.setValue(1, false);
    this.blinkInterval = setInterval(() => {
      this.toggle();
    }, 500); // cambiar estado cada 500ms
  }
};

LEDModule.prototype.turnOn = function turnOn() {
  if (this.blinkInterval) {
    clearInterval(this.blinkInterval);
    this.blinkInterval = false;
    this.setValue(1, true);
    return;
  }

  if (this.ledStatus === 0) {
    this.setValue(1, true);
  }
};

LEDModule.prototype.turnOff = function turnOff() {
  if (this.blinkInterval) {
    clearInterval(this.blinkInterval);
    this.blinkInterval = false;
    this.setValue(0, true);
    return;
  }

  if (this.ledStatus === 1) {
    this.setValue(0, true);
  }
};

LEDModule.prototype.toggle = function toggle() {
  if (this.ledStatus === 1) {
    this.setValue(0, false);
  } else {
    this.setValue(1, false);
  }
};

LEDModule.prototype.release = function release() {
  clearInterval(this.blinkInterval);
  this.led.release();
};

module.exports = LEDModule;
