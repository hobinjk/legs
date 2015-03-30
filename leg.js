function Leg(info) {
  this.info = info;
  this.width = this.info.width;
  this.height = this.info.height;

  this.controller = new PIDController(20, 0, 0);
}

/**
 * @param {p2.World} world
 * @param {number} x
 * @param {number} y
 */
Leg.prototype.add = function(world, x, y) {
  this.world = world;

  this.shape = new p2.Rectangle(this.width, this.height);
  this.body = new p2.Body({
    mass: 1,
    position: [x, y]
  });

  this.body.addShape(this.shape);

  this.world.addBody(this.body);
};



/**
 * Attach to a body at the given x and y
 * @param {p2.Body} parent - body to attach to
 * @param {number} parentX - where to attach (x)
 * @param {number} parentY - where to attach (y)
 * @param {number} reverse - whether to reverse
 */
Leg.prototype.attach = function(parent, parentX, parentY, reverse) {
  var reverseSign = reverse ? -1 : 1;
  this.revoluteConstraint = new p2.RevoluteConstraint(parent, this.body, {
    localPivotA: [parentX, parentY],
    localPivotB: [reverseSign * (this.width / 2 - this.height / 2), 0],
    collideConnected: false
  });

  this.revoluteConstraint.enableMotor();
  this.revoluteConstraint.setMotorSpeed(0);

  this.world.addConstraint(this.revoluteConstraint);
};

/**
 * Update for a given time step
 */
Leg.prototype.update = function() {
  var time = Date.now() / 1000;

  var setPoint = this.info.angle + this.info.amplitude *
                 Math.sin(time / this.info.period * Math.PI * 2 +
                          this.info.phase);

  var newMotor = this.controller.update(this.revoluteConstraint.angle,
                                        setPoint);
  this.revoluteConstraint.setMotorSpeed(newMotor);
};
