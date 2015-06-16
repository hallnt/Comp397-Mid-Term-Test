/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
//var stats: Stats;
// Game Variables
var myLabel; // create a reference
var rollButton;
var dieOne;
var dieTwo;
var label1;
var label2;
var increment = 0;
//path to images
var assets;
var manifest = [
    { id: "rollButton", src: "assets/images/rollButton.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" },
    { id: "1", src: "assets/images/one.png" },
    { id: "2", src: "assets/images/two.png" },
    { id: "3", src: "assets/images/three.png" },
    { id: "4", src: "assets/images/four.png" },
    { id: "5", src: "assets/images/five.png" },
    { id: "6", src: "assets/images/six.png" }
];
// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}
// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stage.update();
}
// Callback function that allows me to respond to button click events
function rollButtonClicked(event) {
    createjs.Sound.play("clicked");
    show();
}
// Callback functions that change the alpha transparency of the button
// Mouseover event
function rollButtonOver() {
    rollButton.alpha = 0.8;
}
// Mouseout event
function rollButtonOut() {
    rollButton.alpha = 1.0;
}
//function to roll dice
function RollDice() {
    var rollOutcome = [0, 0];
    var dice = ["", ""];
    for (var roll = 0; roll < 2; roll++) {
        rollOutcome[roll] = Math.floor(Math.random() * 6) + 1;
        ;
        switch (rollOutcome[roll]) {
            case 1:
                dice[roll] = "1";
                increment++;
                break;
            case 2:
                dice[roll] = "2";
                increment++;
                break;
            case 3:
                dice[roll] = "3";
                increment++;
                break;
            case 4:
                dice[roll] = "4";
                increment++;
                break;
            case 5:
                dice[roll] = "5";
                increment++;
                break;
            case 6:
                dice[roll] = "6";
                increment++;
                break;
        }
    }
    return dice;
}
//function to display dice and labels
function show() {
    stage.removeAllChildren;
    var value = RollDice();
    dieOne = new createjs.Bitmap(assets.getResult(value[0].toString()));
    dieOne.regX = dieOne.getBounds().width * 0.5;
    dieOne.regY = dieOne.getBounds().height * 0.5;
    dieOne.x = 100;
    dieOne.y = 150;
    dieTwo = new createjs.Bitmap(assets.getResult(value[1].toString()));
    dieTwo.regX = dieOne.getBounds().width * 0.5;
    dieTwo.regY = dieOne.getBounds().height * 0.5;
    dieTwo.x = 200;
    dieTwo.y = 150;
    console.log(value[0] + " " + value[1]);
    stage.addChild(dieOne);
    stage.addChild(dieTwo);
    label1 = new createjs.Text(value[0], "16px Consolas", "#000000");
    label1.regX = dieOne.getBounds().width * 0.5;
    label1.regY = dieOne.getBounds().height * 0.5;
    label1.x = 120;
    label1.y = 200;
    stage.addChild(label1);
    label2 = new createjs.Text(value[1], "16px Consolas", "#000000");
    label2.regX = dieOne.getBounds().width * 0.5;
    label2.regY = dieOne.getBounds().height * 0.5;
    label2.x = 220;
    label2.y = 200;
    stage.addChild(label2);
}
// Our Main Game Function
function main() {
    console.log("Game is Running");
    myLabel = new createjs.Text("Press 'Roll' button!", "16px Consolas", "#000000");
    myLabel.regX = myLabel.getMeasuredWidth() * 0.5;
    myLabel.regY = myLabel.getMeasuredHeight() * 0.5;
    myLabel.x = 160;
    myLabel.y = 50;
    stage.addChild(myLabel);
    rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
    rollButton.regX = rollButton.getBounds().width * 0.5;
    rollButton.regY = rollButton.getBounds().height * 0.5;
    rollButton.x = 160;
    rollButton.y = 270;
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);
    rollButton.on("mouseover", rollButtonOver);
    rollButton.on("mouseout", rollButtonOut);
}
//# sourceMappingURL=game.js.map