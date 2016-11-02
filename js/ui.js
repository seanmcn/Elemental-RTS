var mineralCount;
var supplyCount;

function uiCreate(game, uiGroup) {
    var mineralSupplyArea = game.add.graphics(game.width - 200, 0);
    mineralSupplyArea.beginFill(0x1193df);
    mineralSupplyArea.lineStyle(2, 0x0f84c7, 1);
    mineralSupplyArea.drawRect(0, 0, 175, 40);
    mineralSupplyArea.endFill();
    // mineralSupplyArea.cameraOffset.setTo(200, 500);
    mineralSupplyArea.alpha = 0.4;

    var actionArea = game.add.graphics(0, game.height - 150);
    actionArea.beginFill(0x031926);
    actionArea.lineStyle(2, 0x35434b, 1);
    actionArea.drawRect(0, 0, game.width, 150);
    actionArea.endFill();
    actionArea.alpha = 0.90;
    // actionArea.cameraOffset.setTo(150, 0);


    // console.log(game.camera.width);

    uiGroup.add(mineralSupplyArea);
    uiGroup.add(actionArea);
    uiGroup.fixedToCamera = true;
    // uiGroup.cameraOffset.setTo(0, 150);
}