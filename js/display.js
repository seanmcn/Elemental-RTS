function displayFullScreen(game) {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    }
    else {
        game.scale.startFullScreen(false);
    }
}