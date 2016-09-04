function mapPreload(game) {
    game.load.tilemap('test-map', '/assets/tiled/test-map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grass-tiles-2-small', '/assets/tiled/tileset/grass-tiles-2-small.png');
    game.load.image('tree2-final', '/assets/tiled/tileset/tree2-final.png');
}
function mapCreate(game) {
    // Load in the map!
    var map = game.add.tilemap('test-map');

    map.addTilesetImage('grass-tiles-2-small');
    map.addTilesetImage('tree2-final');

    var layer = map.createLayer(0);
    layer.resizeWorld();
}