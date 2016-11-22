var mineralCount;
var supplyCount;

function uiCreate(game, uiGroup) {
    var mineralSupplyArea = game.add.graphics(game.width - 200, 0);
    mineralSupplyArea.beginFill(0x1193df);
    mineralSupplyArea.lineStyle(2, 0x0f84c7, 1);
    mineralSupplyArea.drawRect(0, 0, 175, 40);
    mineralSupplyArea.endFill();
    mineralSupplyArea.alpha = 0.4;

    var actionArea = game.add.graphics(0, game.height - 160);
    actionArea.beginFill(0x031926);
    actionArea.lineStyle(2, 0x35434b, 1);
    actionArea.drawRect(0, 0, game.width, 160);
    actionArea.endFill();
    actionArea.alpha = 0.90;


    uiGroup.add(mineralSupplyArea);
    uiGroup.add(actionArea);
    uiGroup.fixedToCamera = true;
}