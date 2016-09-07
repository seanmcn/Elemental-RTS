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

    function preload() {
        mapPreload(game);
    }

    function create() {
        // Set camera size and scale
        cameraSetScaleAndSize(game, width, height);

        // Create Map
        mapCreate(game);

        // Create Physics.
        physicsCreate(game);

        // Create Input
        cursors = inputCreateCursors(game);

        keys = inputCreateKeys();
        game.input.keyboard.addKeys(keys);
//            inputCreateMouseLock(game);


        game.input.mouse.capture = true;


    }

    function update() {
        inputMoveCameraByCursor(cameraMovementSpeed, game, cursors);
        inputMoveCameraByPointer(cameraMovementSpeed, game);

        //Note Sean: Is a callback really needed here? Need to think about this.
        inputSelectionArea(initMouseX, initMouseY, selectionAreaGraphics, game, function (iMX, iMY, sAG) {
            initMouseX = iMX;
            initMouseY = iMY;
            selectionAreaGraphics = sAG;
        });
    }

    function render() {
        cameraDebug(game);
        // playerDebug(game, player);

        $('#mineral_count').html(minerals);

    }

};
