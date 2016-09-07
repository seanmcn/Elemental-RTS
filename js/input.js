/**
 * Create an object of input keys for easier reference within the game.
 * @returns object of input keys.
 */
function inputCreateKeys() {
    return {
        'movement_attack': Phaser.Keyboard.A, // Attack move
        'movement_stop': Phaser.Keyboard.S, // Stop moving
        'movement_patrol': Phaser.Keyboard.P, // Patrol move
        'movement_hold': Phaser.Keyboard.H, // Hold moving
        'movement_scatter': Phaser.Keyboard.R, // Scatter Move

        'unit_ability_one': Phaser.Keyboard.F, // Ability I
        'unit_ability_two': Phaser.Keyboard.G, // Ability II

        'building_create': Phaser.Keyboard.B, // Build menu
        'building_create_advanced': Phaser.Keyboard.V, // Advance build menu

        'unit_create_one': Phaser.Keyboard.W, // Unit 1.
        'unit_create_worker': Phaser.Keyboard.D // Worker
    };
}

/**
 * Enables input using the cursor keys.
 * @param game
 * @returns {*}
 */
function inputCreateCursors(game) {
    return game.input.keyboard.createCursorKeys();
}

/**
 * Moves the camera based on the cursor keys.
 * @param cameraMovementSpeed
 * @param game
 * @param cursors
 */
function inputMoveCameraByCursor(cameraMovementSpeed, game, cursors) {
    if (cursors.up.isDown) {
        game.camera.y -= cameraMovementSpeed;
    }
    else if (cursors.down.isDown) {
        game.camera.y += cameraMovementSpeed;
    }

    if (cursors.left.isDown) {
        game.camera.x -= cameraMovementSpeed;
    }
    else if (cursors.right.isDown) {
        game.camera.x += cameraMovementSpeed;
    }
}

/**
 * Moves the camera based on the mouse.
 * @param cameraMovementSpeed
 * @param game
 */
function inputMoveCameraByPointer(cameraMovementSpeed, game) {
    var hotArea = 100;
    var widthActionArea = game.width - hotArea;
    var heightActionArea = game.height - hotArea;

    if (game.input.mousePointer.position.x >= widthActionArea) {
        game.camera.x += cameraMovementSpeed;
    }

    if (game.input.mousePointer.position.x <= hotArea) {
        game.camera.x -= cameraMovementSpeed;
    }

    if (game.input.mousePointer.position.y >= heightActionArea) {
        game.camera.y += cameraMovementSpeed;
    }
    if (game.input.mousePointer.position.y <= hotArea) {
        game.camera.y -= cameraMovementSpeed;
    }
}

/**
 * Creates a selection area using the mouse.
 * @param initMouseX
 * @param initMouseY
 * @param selectionAreaGraphics
 * @param game
 * @param callback
 */
function inputSelectionArea(initMouseX, initMouseY, selectionAreaGraphics, game, callback) {
    if (game.input.mousePointer.leftButton.isDown) {
        if (!initMouseX && !initMouseY) {
            initMouseX = game.input.mousePointer.x + game.camera.x;
            initMouseY = game.input.mousePointer.y + game.camera.y;
        }

        var startX = game.input.mousePointer.x - initMouseX + game.camera.x;
        var startY = game.input.mousePointer.y - initMouseY + game.camera.y;

        if (selectionAreaGraphics) {
            selectionAreaGraphics.kill();
        }

        var selectAreaGraphic = game.add.graphics(0, 0);
        selectAreaGraphic.beginFill(0x1193df);
        selectAreaGraphic.lineStyle(2, 0x0f84c7, 1);
        selectAreaGraphic.drawRect(initMouseX, initMouseY, startX, startY);
        selectAreaGraphic.endFill();
        selectAreaGraphic.alpha = 0.4;
        selectionAreaGraphics = selectAreaGraphic;

    } else {
        initMouseX = false;
        initMouseY = false;
        // selectionArea = false;
        if (selectionAreaGraphics) {
            selectionAreaGraphics.kill();
            selectionAreaGraphics = false;
        }
    }
    callback(initMouseX, initMouseY, selectionAreaGraphics);
}