window.onload = function () {
    var height = window.innerHeight;
    var width = window.innerWidth;

    var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var keys;

    game.width = width;
    game.height = height;

    var cursors;

    var minerals = 1200;

    var initMouseX = false;
    var initMouseY = false;

    var selectionAreaGraphics = false;

    var cameraMovementSpeed = 30;

    var mapDisplayGroup;
    var uiDisplayGroup;
    var unitDisplayGroup;


    function preload() {
        mapDisplayGroup = game.add.group();
        uiDisplayGroup = game.add.group();
        unitDisplayGroup = game.add.group();

        mapPreload(game);
        unitsPreloadSprites(game);

    }

    function create() {


        // Set camera size and scale
        cameraSetScaleAndSize(game, width, height);

        // Create UI
        uiCreate(game, uiDisplayGroup);

        // Create Map
        mapCreate(game, mapDisplayGroup);

        // Create Physics.
        physicsCreate(game);

        // Create Input
        cursors = inputCreateCursors(game);

        keys = inputCreateKeys();
        game.input.keyboard.addKeys(keys);
//            inputCreateMouseLock(game);

        game.input.mouse.capture = true;

        game.world.bringToTop(mapDisplayGroup);
        game.world.bringToTop(uiDisplayGroup);


        unitsCreateInitialWorkers(game);
        unitsCreateInitialUnits(game);


    }

    function update() {
        // console.log(game.world);
        inputMoveCameraByCursor(cameraMovementSpeed, game, cursors);
        inputMoveCameraByPointer(cameraMovementSpeed, game);

        //Note Sean: Is a callback really needed here? Need to think about this.
        inputSelectionArea(initMouseX, initMouseY, selectionAreaGraphics, game, function (iMX, iMY, sAG) {
            initMouseX = iMX;
            initMouseY = iMY;
            selectionAreaGraphics = sAG;
        });

        // Handle unit movement
        unitsHandleMovement(game);
    }

    function render() {
        // cameraDebug(game);
        // playerDebug(game, player);
        // workers.forEach(function (worker) {
        //     game.debug.spriteInfo(worker, 32, 32);
        // }, this);
        // $('#mineral_count').html(minerals);

    }

};
