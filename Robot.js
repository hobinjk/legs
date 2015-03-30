/**
 * Create a generic bipedal robot.
 * WIP: Currently based off of p2js car demo by schteppe:
 *      https://schteppe.github.io/p2.js/demos/car.html

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {Body} bodyInfo
 * @param {LegInfo} frontUpperLegInfo
 * @param {LegInfo} frontLowerLegInfo
 * @param {LegInfo} backUpperLegInfo
 * @param {LegInfo} backLowerLegInfo
 */
function Robot(x, y, bodyInfo, frontUpperLegInfo, frontLowerLegInfo,
               backUpperLegInfo, backLowerLegInfo) {
  this.x = x;
  this.y = y;
  this.bodyInfo = bodyInfo;
  this.frontUpperLeg = new Leg(frontUpperLegInfo);
  this.frontLowerLeg = new Leg(frontLowerLegInfo);
  this.backUpperLeg = new Leg(backUpperLegInfo);
  this.backLowerLeg = new Leg(backLowerLegInfo);
}

/**
 * Add the robot to the world
 * @param {p2.World} world
 */
Robot.prototype.add = function(world) {
  var body = new p2.Body({mass: 1, position: [this.x, this.y]});
  var bodyShape = new p2.Rectangle(this.bodyInfo.width, this.bodyInfo.height);
  body.addShape(bodyShape);
  world.addBody(body);

  var wheelY = body.position[1] - this.bodyInfo.height / 2 + this.frontUpperLeg.height / 2;

  var frontUpperX = body.position[0] + this.bodyInfo.width / 2 + this.frontUpperLeg.width / 2 - this.frontUpperLeg.height;
  this.frontUpperLeg.add(world, frontUpperX, wheelY);
  this.frontLowerLeg.add(world, frontUpperX + this.frontLowerLeg.width / 2 + this.frontUpperLeg.width / 2 - this.frontLowerLeg.height, wheelY);

  var backUpperX = body.position[0] - this.bodyInfo.width / 2 - this.backUpperLeg.width / 2 + this.backUpperLeg.height;
  this.backUpperLeg.add(world, backUpperX, wheelY);
  this.backLowerLeg.add(world, backUpperX - this.backLowerLeg.width / 2 - this.backUpperLeg.width / 2 + this.backLowerLeg.height,
                         wheelY);

  this.backUpperLeg.attach(body,
                           -this.bodyInfo.width / 2 + this.backUpperLeg.height / 2,
                           -this.bodyInfo.height / 2 + this.backUpperLeg.height / 2,
                           false);

  this.backLowerLeg.attach(
      this.backUpperLeg.body,
      -this.backUpperLeg.width / 2 + this.backLowerLeg.height / 2,
      0,
      true
  );

  this.frontUpperLeg.attach(body,
                            this.bodyInfo.width / 2 - this.frontUpperLeg.height / 2,
                            -this.bodyInfo.height / 2 + this.frontUpperLeg.height / 2,
                            true);

  this.frontLowerLeg.attach(
      this.frontUpperLeg.body,
      this.frontUpperLeg.width / 2 - this.frontLowerLeg.height / 2,
      0,
      false
  );

  this.update();
};

/**
 * Update legs, ideally each frame.
 */
Robot.prototype.update = function() {
  this.frontUpperLeg.update();
  this.backUpperLeg.update();

  this.frontLowerLeg.update();
  this.backLowerLeg.update();

  window.requestAnimationFrame(this.update.bind(this));
};
