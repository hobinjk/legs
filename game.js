function startLegsGame() {
  new p2.WebGLRenderer(function() {
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


    var upperLeg = new Leg(0.2, 0, 0, 0, 0);
    var lowerLeg = new Leg(0.2, 0, 0, 0, 0);

    var robot = new Robot(new Body(1), upperLeg, lowerLeg, upperLeg, lowerLeg);
    robot.add(world);

    this.frame(0, 0, 8, 6);
  }, {
    hideGUI: true
  });
}

startLegsGame();
