function physicsCreate(game) {
    game.physics.startSystem(Phaser.Physics.P2JS);
}

function physicsEnableForPlayer(game, player){
    game.physics.p2.enable(player);
}
