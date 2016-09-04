function inputCreateCursors(game) {
    return game.input.keyboard.createCursorKeys();
}

function inputUpdateCursorMovement(player, cursors){
    var speed = 1200;
    player.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
        player.body.moveUp(speed)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(speed);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -speed;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(speed);
    }
}

function inputFullScreenKey(game){
    var key = game.input.keyboard.addKey(Phaser.KeyCode.F10);
    // Bind input for full screen
    key.onDown.add(function () {
        displayFullScreen(game);
    }, this);
}