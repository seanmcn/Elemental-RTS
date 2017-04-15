var workers;
var units;

var selectedUnits = [];

var unitGroupMovementInProcess = false;
var unitGroupMoveToX = 0;
var unitGroupMoveToY = 0;


function unitsPreloadSprites(game) {
    game.load.image('worker', 'assets/sprites/worker.png');
    game.load.image('fighter-fire', 'assets/sprites/fighter-fire.png');
}

function unitsCreateInitialWorkers(game) {
    workers = game.add.group();
    workers.enableBody = true;
    workers.physicsBodyType = Phaser.Physics.ARCADE;

    var worker = workers.create(250, 250, 'worker');
    // Set the anchor point to center of sprite
    worker.anchor.setTo(0.5, 0.5);
    // Set drag and velocity.
    worker.body.drag.set(50);
    worker.body.maxVelocity.set(300);

    var workerTwo = workers.create(150, 200, 'worker');
    // Set the anchor point to center of sprite
    worker.anchor.setTo(0.5, 0.5);
    // Set drag and velocity.
    worker.body.drag.set(50);
    worker.body.maxVelocity.set(300);

    // Note Sean: couldn't get the below to actually work?
    // Don't allow to exit world
    // worker.checkWorldBounds = true;
    // worker.body.collideWorldBounds = true;
    // worker.events.onOutOfBounds.add(unitOutOfBounds, this);

}

function unitsCreateInitialUnits(game) {
    units = game.add.group();

    units.create(500, 250, 'fighter-fire');
}

function unitsHandleMovement(game) {
    // Todo: this should only be when we have a group to move.
    if (game.input.mousePointer.isDown) {
        unitGroupMoveToX = game.input.mousePointer.worldX;
        unitGroupMoveToY = game.input.mousePointer.worldY;
        unitGroupMovementInProcess = true;
    }

    if (unitGroupMovementInProcess === true) {
          selectedUnits.forEach(function (worker) {
              var dist = game.physics.arcade.distanceToXY(worker, unitGroupMoveToX, unitGroupMoveToY);
              if ((Math.round(dist) >= -2 && Math.round(dist) <= 2) || unitGroupMovementInProcess === false) {
                  worker.body.velocity.x = 0;
                  worker.body.velocity.y = 0;
                  unitGroupMovementInProcess = false;
              }
              else {
                  // Check we aren't going to get stuck trying to move out of bounds because of sprite width / height
                  if (unitGroupMoveToY < (worker.height / 2)) {
                      unitGroupMoveToY = worker.height / 2;
                  }
                  if (unitGroupMoveToX < (worker.width / 2)) {
                      unitGroupMoveToX = worker.width / 2;
                  }
                  if (unitGroupMoveToX > (game.world.width - ( worker.width / 2))) {
                      unitGroupMoveToX = game.world.width - ( worker.width /2);
                  }
                  if (unitGroupMoveToY > (game.world.height - ( worker.height / 2))) {
                      unitGroupMoveToY = game.world.height - ( worker.height /2);
                  }
                  // Move the sprite to the location clicked by the mouse.
                  game.physics.arcade.moveToXY(worker, unitGroupMoveToX, unitGroupMoveToY, 250);
              }
          }, this);
    }
}

function unitsAddToSelectionGroupByCoordinates(x, y, width, height) {
    var currentSelection = [];

    workers.forEach(function (worker) {
        if(worker.position.x >= x && worker.position.x <= x + width &&
           worker.position.y >= y && worker.position.y <= y + height) {
            currentSelection.push(worker);
        }
    }, this);

    if(currentSelection.length > 0) {
        selectedUnits = currentSelection;
    }

    console.log("Selected Units", selectedUnits);
}