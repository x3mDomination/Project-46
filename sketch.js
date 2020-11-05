var fade = 0;
var gameState = 0;
var database;
var playerCount = 0;
var form, game, player;
var games = ["card flip"];
var currentGame;
var cardBackIMG, cardFront1,cardFront2,cardFront3,cardFront4,cardFront5,cardFront6,cardFront7,cardFront8,cardFront9,cardFront10, cardsFlipped;
var cards = [];
var cardFronts = [cardFront1,cardFront2,cardFront3,cardFront4,cardFront5,cardFront6,cardFront7,cardFront8,cardFront9,cardFront10,cardFront1,cardFront2,cardFront3,cardFront4,cardFront5,cardFront6,cardFront7,cardFront8,cardFront9,cardFront10];
var otherPlayerName,otherPlayerPoints,otherPlayerIndex;
var cardIndex = 19;

function preload(){
    cardBackIMG = loadImage("images/Card.jpg");
    cardFront1 = loadImage("images/InkedWhiteSquare_LI.jpg");
    cardFront2 = loadImage("images/InkedWhiteSquare_LI2.jpg");
    cardFront3 = loadImage("images/InkedWhiteSquare_LI3.jpg");
    cardFront4 = loadImage("images/InkedWhiteSquare_LI4.jpg");
    cardFront5 = loadImage("images/InkedWhiteSquare_LI5.jpg");
    cardFront6 = loadImage("images/InkedWhiteSquare_LI6.jpg");
    cardFront7 = loadImage("images/InkedWhiteSquare_LI7.jpg");
    cardFront8 = loadImage("images/InkedWhiteSquare_LI8.jpg");
    cardFront9 = loadImage("images/InkedWhiteSquare_LI9.jpg");
    cardFront10 = loadImage("images/InkedWhiteSquare_LI10.jpg");
}

function setup(){
    createCanvas(800,600);

    database = firebase.database();
    game = new Game();
    form = new Form();
    player = new Player();

    form.reset();
}

function draw(){
    game.state();
    player.getCount();



    if(gameState === 0){
        background(166, 10, 10);
        textFont("courier new");
        textSize(250);
        fill(0, 255, 221, fade);
        text("MIND", 100,200);
        fill(1, 140, 8, fade);
        text("RACE", 100, 500);
        if(fade <= 255){
            fade += 5;
        }
        else {
            game.matchPlayers();
        }
    }

    if(playerCount === 2){
        gameState = 1;
        game.updateState();
    }


    if(gameState === 1){
        form.greeting.hide();
        background(166, 10, 10);
        game.scores();
        currentGame = games[0];
        if(currentGame === "card flip"){
            game.cardflip();
        }
    }
  
}
