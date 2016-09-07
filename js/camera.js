/**
 * Sets the camera scale and size based on the window width & height.
 * @param game
 * @param width
 * @param height
 */
function cameraSetScaleAndSize(game, width, height) {
    // Set scale mode (maintain aspect ratio)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Set camera size
    game.camera.setSize(width, height);
}

/**
 * Display camera debug information
 * @param game
 */
function cameraDebug(game) {
    game.debug.cameraInfo(game.camera, 32, 32);
}