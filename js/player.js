function playerCreate(game) {
    var player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    return player;
}
function playerDebug(game, player) {
    game.debug.spriteCoords(player, 32, 500);
}