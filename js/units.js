var workers, units;
var allUnits = [];
var selectedUnits = [];
var unitsToMove = {};
var unitGroupMoveToX = 0;
var unitGroupMoveToY = 0;
var internalUnitId = 0;
var unitGroupMovementInProcess = false;

/**
 * Preload sprites
 * @param game
 */
function unitsPreloadSprites(game) {
    game.load.image('worker', 'assets/sprites/worker.png');
    game.load.image('fighter-fire', 'assets/sprites/fighter-fire.png');
}

/**
 * Create the initial workers.
 * @param game
 */
function unitsCreateInitialWorkers(game) {
    workers = game.add.group();
    workers.enableBody = true;
    workers.physicsBodyType = Phaser.Physics.ARCADE;

    var worker = workers.create(250, 250, 'worker');
    // Set the anchor point to center of sprite
    worker.anchor.setTo(0.5, 0.5);
    // Set drag and velocity.
    worker.body.enable = true;
    worker.body.drag.set(50);
    worker.body.maxVelocity.set(300);
    worker.internal_id = internalUnitId;
    worker.angle = 90;
    worker.body.collideWorldBounds = true;


    internalUnitId++;
    allUnits.push(worker);

    var workerTwo = workers.create(150, 150, 'worker');
    // Set the anchor point to center of sprite
    workerTwo.anchor.setTo(0.5, 0.5);
    // Set drag and velocity.
    workerTwo.body.enable = true;
    workerTwo.body.drag.set(50);
    workerTwo.body.maxVelocity.set(300);
    workerTwo.internal_id = internalUnitId;
    workerTwo.body.collideWorldBounds = true;

    workerTwo.angle = 90;

    internalUnitId++;
    allUnits.push(workerTwo);

    game.physics.enable([ workers ], Phaser.Physics.ARCADE);

    // Note Sean: couldn't get the below to actually work?
    // Don't allow to exit world
    // worker.checkWorldBounds = true;
    // worker.events.onOutOfBounds.add(unitOutOfBounds, this);

}
/**
 * Create the initial units.
 * @param game
 */
function unitsCreateInitialUnits(game) {
    units = game.add.group();
    units.enableBody = true;
    units.physicsBodyType = Phaser.Physics.ARCADE;

    var unit = units.create(500, 250, 'fighter-fire');
    // Set the anchor point to center of sprite
    unit.anchor.setTo(0.5, 0.5);
    // Set drag and velocity.
    unit.body.drag.set(50);
    unit.body.maxVelocity.set(300);
    unit.internal_id = internalUnitId;
    unit.angle = 90;
    internalUnitId++;
    allUnits.push(unit);
}
/**
 * Handle moving units to location chosen by mouse right click.
 * @param game
 */
function unitsHandleMovement(game) {

    if (game.input.mousePointer.rightButton.isDown) {
        unitGroupMovementInProcess = true;
        selectedUnits.forEach(function (unit) {
            var key = unit.internal_id;

            // Figure out the angle we should be pointing at.
            var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
                    unit.x, unit.y,
                    game.input.mousePointer.worldX, game.input.mousePointer.worldY) + 90;

            if(targetAngle < 0) {
                targetAngle += 360;
            }

            unitsToMove[key] = {x: game.input.mousePointer.worldX, y: game.input.mousePointer.worldY, angle: targetAngle}
        });
    }

    if (unitGroupMovementInProcess === true) {
        for (var key in unitsToMove) {
            if (unitsToMove.hasOwnProperty(key)) {
                var coordinates = unitsToMove[key];
                var internal_id = parseInt(key);

                allUnits.forEach(function (unit) {
                    if (unit.internal_id === internal_id) {
                        var dist = game.physics.arcade.distanceToXY(unit, coordinates.x, coordinates.y);

                        unit.angle = coordinates.angle;

                        if ((Math.round(dist) >= -2 && Math.round(dist) <= 2)) {
                            unit.body.velocity.x = 0;
                            unit.body.velocity.y = 0;
                            delete unitsToMove[internal_id];
                        }
                        else {
                            // Check we aren't going to get stuck trying to move out of bounds because of sprite width / height
                            if (coordinates.y < (unit.height / 2)) {
                                coordinates.y = unit.height / 2;
                            }
                            if (coordinates.x < (unit.width / 2)) {
                                coordinates.x = unit.width / 2;
                            }
                            if (coordinates.x > (game.world.width - ( unit.width / 2))) {
                                coordinates.x = game.world.width - ( unit.width / 2);
                            }
                            if (coordinates.y > (game.world.height - ( unit.height / 2))) {
                                coordinates.y = game.world.height - ( unit.height / 2);
                            }
                            // Move the sprite to the location clicked by the mouse.
                            game.physics.arcade.moveToXY(unit, coordinates.x, coordinates.y, 250);
                        }
                    }
                }, this);
            }
        }

        if (Object.keys(unitsToMove).length === 0 && unitsToMove.constructor === Object) {
            unitGroupMovementInProcess = false;
        }
    }
}
/**
 * Add units that are in the selection area to the selectedUnits group.
 * @param x
 * @param y
 * @param width
 * @param height
 */
function unitsAddToSelectionGroupByCoordinates(x, y, width, height) {
    var currentSelection = [];

    // Works for left corner start to bottom right.
    workers.forEach(function (worker) {
        var coordinates = selectionAreaToCoordinates(x, y, width, height);
        if (worker.position.x >= coordinates.x.from && worker.position.x <= coordinates.x.to &&
            worker.position.y >= coordinates.y.from && worker.position.y <= coordinates.y.to) {
            currentSelection.push(worker);
        }
        worker.tint = 0xFFFFFF;
    }, this);

    units.forEach(function (unit) {
        var coordinates = selectionAreaToCoordinates(x, y, width, height);
        if (unit.position.x >= coordinates.x.from && unit.position.x <= coordinates.x.to &&
            unit.position.y >= coordinates.y.from && unit.position.y <= coordinates.y.to) {
            currentSelection.push(unit);
        }
        unit.tint = 0xFFFFFF;
    }, this);

    if (currentSelection.length > 0) {
        selectedUnits = currentSelection;
    }

    selectedUnits.forEach(function (unit) {
        unit.tint = 0xf2e98c;
    }, this);

    console.log("Selected Units", selectedUnits);
}