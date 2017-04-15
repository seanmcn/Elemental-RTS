var workers, units, selectedUnits, unitsCurrentlyMoving, unitGroupMoveToX, unitGroupMoveToY;
selectedUnits = unitsCurrentlyMoving = [];
unitGroupMoveToX = unitGroupMoveToY = 0;
var unitGroupMovementInProcess = false;

// var unitsCurrentlyMoving = [];

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
    worker.body.drag.set(50);
    worker.body.maxVelocity.set(300);

    var workerTwo = workers.create(150, 150, 'worker');
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
}
/**
 * Handle moving units to location chosen by mouse right click.
 * @param game
 */
function unitsHandleMovement(game) {
    // If we don't have any units selected, there is nothing to do.
    if(selectedUnits.length === 0) {
        return;
    }

    if (game.input.mousePointer.rightButton.isDown) {
        unitGroupMoveToX = game.input.mousePointer.worldX;
        unitGroupMoveToY = game.input.mousePointer.worldY;
        unitGroupMovementInProcess = true;

        // Note: Bit of a mess due to wanting to keep keys for use later.
        unitsCurrentlyMoving = selectedUnits.slice();
        unitsCurrentlyMoving = Object.assign({}, unitsCurrentlyMoving);
    }

    if (unitGroupMovementInProcess === true) {
        selectedUnits.forEach(function (unit, index) {

            //If we are done with this unit, don't bother processing any further.
            if (!(index in unitsCurrentlyMoving)) {
                return;
            }

            // Figure out the distance we need to move
            var dist = game.physics.arcade.distanceToXY(unit, unitGroupMoveToX, unitGroupMoveToY);

            if ((Math.round(dist) >= -2 && Math.round(dist) <= 2)) {
                unit.body.velocity.x = 0;
                unit.body.velocity.y = 0;
                delete unitsCurrentlyMoving[index];
            }
            else {
                // Check we aren't going to get stuck trying to move out of bounds because of sprite width / height
                if (unitGroupMoveToY < (unit.height / 2)) {
                    unitGroupMoveToY = unit.height / 2;
                }
                if (unitGroupMoveToX < (unit.width / 2)) {
                    unitGroupMoveToX = unit.width / 2;
                }
                if (unitGroupMoveToX > (game.world.width - ( unit.width / 2))) {
                    unitGroupMoveToX = game.world.width - ( unit.width / 2);
                }
                if (unitGroupMoveToY > (game.world.height - ( unit.height / 2))) {
                    unitGroupMoveToY = game.world.height - ( unit.height / 2);
                }
                // Move the sprite to the location clicked by the mouse.
                game.physics.arcade.moveToXY(unit, unitGroupMoveToX, unitGroupMoveToY, 250);
            }
        }, this);

        if (Object.keys(unitsCurrentlyMoving).length === 0 && unitsCurrentlyMoving.constructor === Object) {
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