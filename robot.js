/**
 * Create a generic bipedal robot.
 * WIP: Currently based off of p2js car demo by schteppe:
 *      https://schteppe.github.io/p2.js/demos/car.html

/**
 * @constructor
 * @param {Body} bodyInfo
 * @param {Leg} frontUpperLegInfo
 * @param {Leg} frontLowerLegInfo
 * @param {Leg} backUpperLegInfo
 * @param {Leg} backLowerLegInfo
 */
function Robot(bodyInfo, frontUpperLegInfo, frontLowerLegInfo,
                         backUpperLegInfo, backLowerLegInfo) {
  this.bodyInfo = bodyInfo;
  this.frontUpperLegInfo = frontUpperLegInfo;
  this.frontLowerLegInfo = frontLowerLegInfo;
  this.backUpperLegInfo = backUpperLegInfo;
  this.backLowerLegInfo = backLowerLegInfo;
}

/**
 * Add the robot to the world
 * @param {p2.World} world
 */
Robot.prototype.add = function(world) {
  var body = new p2.Body({mass: 1, position: [-3, 1]});
  var bodyShape = new p2.Rectangle(this.bodyInfo.width, this.bodyInfo.height);
  body.addShape(bodyShape);
  world.addBody(body);

  var wheelY = body.position[1] - this.bodyInfo.height / 4;
  var frontWheelBody = new p2.Body({
    mass: 1,
    position: [body.position[0] + this.bodyInfo.width / 2, wheelY]
  });
  var backWheelBody = new p2.Body({
    mass: 1,
    position: [body.position[0] - this.bodyInfo.width / 2, wheelY]
  });

  var frontWheelShape = new p2.Rectangle(this.frontUpperLegInfo.width,
                                         this.frontUpperLegInfo.height);
  var backWheelShape = new p2.Rectangle(this.backUpperLegInfo.width,
                                        this.backUpperLegInfo.height);

  frontWheelBody.addShape(frontWheelShape);
  backWheelBody.addShape(backWheelShape);

  world.addBody(frontWheelBody);
  world.addBody(backWheelBody);

  var backRevolute = new p2.RevoluteConstraint(body, backWheelBody, {
    localPivotA: [-this.bodyInfo.width / 2 + this.bodyInfo.height / 4, -this.bodyInfo.height / 4],
    localPivotB: [this.backUpperLegInfo.width / 2, 0],
    collideConnected: false
  });

  var frontRevolute = new p2.RevoluteConstraint(body, frontWheelBody, {
    localPivotA: [this.bodyInfo.width / 2 - this.bodyInfo.height / 4, -this.bodyInfo.height / 4],
    localPivotB: [this.frontUpperLegInfo.width / 2, 0],
    collideConnected: false
  });

  world.addConstraint(backRevolute);
  world.addConstraint(frontRevolute);

  backRevolute.enableMotor();
  backRevolute.setMotorSpeed(1.7);

  frontRevolute.enableMotor();
  frontRevolute.setMotorSpeed(1.7);
};
