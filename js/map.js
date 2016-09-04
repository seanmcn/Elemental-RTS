function mapPreload(game) {
    game.load.tilemap('example-map', '/assets/tilemaps/example-map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tilesheet_complete', '/assets/tilesets/topdown-shooter/Tilesheet/tilesheet_complete.png');
}
function mapCreate(game) {
    // Load in the map!
    var map = game.add.tilemap('example-map');

    map.addTilesetImage('tilesheet_complete');

    var layer = map.createLayer(0);
    map.createLayer(1);
    layer.resizeWorld();
}