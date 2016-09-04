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

        // keys.save.onDown.add(save, this);
    };
}

function inputCreateCursors(game) {
    return game.input.keyboard.createCursorKeys();
}

function inputUpdateCursorMovement(game, cursors) {
    var movementSpeed = 20;

    if (cursors.up.isDown) {
        game.camera.y -= movementSpeed;
    }
    else if (cursors.down.isDown) {
        game.camera.y += movementSpeed;
    }

    if (cursors.left.isDown) {
        game.camera.x -= movementSpeed;
    }
    else if (cursors.right.isDown) {
        game.camera.x += movementSpeed;
    }
}

function inputMoveCameraByPointer(game) {
    var movementSpeed = 20;
    var hotArea = 100;
    var widthActionArea = game.width - hotArea;
    var heightActionArea = game.height - hotArea;

    if (game.input.mousePointer.position.x >= widthActionArea) {
        game.camera.x += movementSpeed;
    }

    if (game.input.mousePointer.position.x <= hotArea) {
        game.camera.x -= movementSpeed;
    }

    if (game.input.mousePointer.position.y >= heightActionArea) {
        game.camera.y += movementSpeed;
    }
    if(game.input.mousePointer.position.y <= hotArea) {
        game.camera.y -= movementSpeed;
    }


    // console.log('pointerLocation', pointerLocation);
    // console.log('currentPointerLocation', currentPointerLocation);

    // game.create();
    // game.input.mousePointer
    // if (!currentPointerLocation.timeDown) {
    //     return;
    // }
    // if (currentPointerLocation.isDown && !currentPointerLocation.targetObject) {
    //     if (pointerLocation) {
    // console.log(game.input.mousePointer);
    // game.camera.x += game.input.mousePointer.screenX;
    // game.camera.y += game.input.mousePointer.screenY;
    // game.camera.y += pointerLocation.y;
    // }
    // pointerLocation = currentPointerLocation.position.clone();
    // }
    // if (currentPointerLocation.isUp) {
    //     pointerLocation = null;
    // }
    // return pointerLocation;
}

