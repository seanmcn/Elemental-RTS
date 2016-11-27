/**
 * Preload the game map
 * @param game
 */
function mapPreload(game) {
    game.load.tilemap('whirlpool-map', 'assets/maps/whirlpool-map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('whirlpool', 'assets/maps/whirlpool.jpg');
    game.load.image('player', 'assets/images/player.png');
}
/**
 * Create the game map
 * @param game
 * @param mapGroup
 */
function mapCreate(game, mapGroup) {
    // Load in the map!
    var map = game.add.tilemap('whirlpool-map');

    map.addTilesetImage('whirlpool');

    var bottomLayer = map.createLayer(0);
    var middleLayer = map.createLayer(1);
    bottomLayer.resizeWorld();

    mapGroup.add(bottomLayer);
    mapGroup.add(middleLayer);

    // game.world.setBounds(0, 0, 3200, 3200);

}