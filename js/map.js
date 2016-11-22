/**
 * Preload the game map
 * @param game
 */
function mapPreload(game) {
    game.load.tilemap('example-map', '/assets/tilemaps/example-map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheet_complete', '/assets/tilesets/topdown-shooter/Tilesheet/tilesheet_complete.png');
    game.load.image('player', '/assets/images/player.png');
}
/**
 * Create the game map
 * @param game
 * @param mapGroup
 */
function mapCreate(game, mapGroup) {
    // Load in the map!
    var map = game.add.tilemap('example-map');

    map.addTilesetImage('tilesheet_complete');

    var bottomLayer = map.createLayer(0);
    var middleLayer = map.createLayer(1);
    bottomLayer.resizeWorld();

    mapGroup.add(bottomLayer);
    mapGroup.add(middleLayer);
}