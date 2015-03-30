function PIDController(kP, kI, kD) {
  this.kP = kP;
  this.kI = kI;
  this.kD = kD;

  this.lastError = 0;
  this.errorSum = 0;
  this.lastUpdate = Date.now();
}

/**
 * update()
 *  @param {number} actual - Actual value of control variable
 *  @param {number} desired - Desired value of control variable
 *  @return {number} New input to control
 */
PIDController.prototype.update = function(actual, desired) {
  var error = actual - desired;
  var updateTime = Date.now();
  var dt = updateTime - this.lastUpdate;

  var prop = this.kP * error;

  this.errorSum += error;
  var integ = this.kI * this.errorSum * dt;

  var dError = error - this.lastError;
  var deriv = this.kD * dError / dt;

  this.lastError = error;
  this.lastUpdate = updateTime;

  return prop + integ + deriv;
};
