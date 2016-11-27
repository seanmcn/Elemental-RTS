/*
 * ElementalRTS is copyright of Sean McNamara<me@seanmcn.com> (c) 2016.
 *
 */

var workers;
var units;

function unitsPreloadSprites(game) {
    game.load.image('worker', 'assets/sprites/worker.png');
    game.load.image('fighter-fire', 'assets/sprites/fighter-fire.png');
}

function unitsCreateInitialWorkers(game) {
    workers = game.add.physicsGroup();

    workers.create(200, 240, 'worker');


}

function unitsCreateInitialUnits(game) {
    units = game.add.group();

    units.create(500, 250, 'fighter-fire');
}