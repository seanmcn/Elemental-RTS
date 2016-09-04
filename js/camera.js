function cameraSetScaleAndSize(game, width, height) {
    // Set scale mode (maintain aspect ratio)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Set camera size
    game.camera.setSize(width, height);
}
function cameraFollowPlayer(game, player){
    game.camera.follow(player);
}
function cameraDebug(game){
    game.debug.cameraInfo(game.camera, 32, 32);
}