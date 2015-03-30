function startLegsGame() {
  var renderer = new p2.WebGLRenderer(function() {
    var world = new p2.World({
      gravity: [0, -10],
      broadphase: new p2.SAPBroadphase()
    });

    this.setWorld(world);

    world.defaultContactMaterial.friction = 100; //apparently high

    var planeShape = new p2.Plane();
    var planeBody = new p2.Body({
      mass: 0
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);

    for (var i = 2; i < 10; i += 2) {
      var upperWidth = 0.6 * i / 10;
      var lowerWidth = 0.8 * i / 10;
      var amplitude = Math.PI / 4;
      var period = 0.6;
      var backAngle = Math.PI - Math.PI / 4;
      var frontUpperAngle = -Math.PI / 4;
      var frontLowerAngle = Math.PI - Math.PI / 4;

      var frontUpperLeg = new LegInfo(upperWidth, frontUpperAngle, amplitude,
                                      period, 0);
      var frontLowerLeg = new LegInfo(lowerWidth, frontLowerAngle, amplitude,
                                      period, 0);
      var backUpperLeg = new LegInfo(upperWidth, backAngle, amplitude, period,
                                     0);
      var backLowerLeg = new LegInfo(lowerWidth, backAngle, amplitude, period,
                                     0);

      var robot = new Robot(-8 + i * 1.5, 1, new Body(1.5),
                            frontUpperLeg, frontLowerLeg,
                            backUpperLeg, backLowerLeg);
      robot.add(world);
    }

    this.frame(0, 0, 8, 6);
  }, {
    hideGUI: true
  });
  // renderer.paused = true;
}

startLegsGame();
