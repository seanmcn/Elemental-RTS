window.onload = function () {
    // Get window size to use for the game
    var height = window.innerHeight;
    var width = window.innerWidth;

    var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    // Todo Sean: cannot remember why i'm doing this again here.. Test later.
    game.width = width;
    game.height = height;

    var keys, mapDisplayGroup, uiDisplayGroup, unitDisplayGroup, cursors;

    // Todo: Mineral
    var minerals = 1200;

    var cameraMovementSpeed = 30;

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

        // Locks the mouse to the screen, add to a hotkey later.
//            inputCreateMouseLock(game);

        game.input.mouse.capture = true;

        game.world.bringToTop(mapDisplayGroup);

        // Disable right click context menu.
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); };

        // Crete initial workers etc.
        unitsCreateInitialWorkers(game);
        unitsCreateInitialUnits(game);

        // Ensure UI is above everything.
        game.world.bringToTop(uiDisplayGroup);
    }

    function update() {
        // console.log(game.world);
        inputMoveCameraByCursor(cameraMovementSpeed, game, cursors);
        inputMoveCameraByPointer(cameraMovementSpeed, game);

        // Creating selection area
        inputSelectionArea(game);

        // Handle units
        unitsHandleMovement(game);

        game.physics.arcade.collide(allUnits, allUnits);
        // game.physics.arcade.collide(units, units);

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
