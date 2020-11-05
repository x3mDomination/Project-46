class Game {
    constructor(){

    }

    state(){
      database.ref('/gameState').on("value",function(data){
        gameState = data.val();
      })
    }

    updateState(){
      database.ref('/').update({
        gameState: gameState
      })
    }

    async matchPlayers(){
      if(gameState === 0){
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form.display();
      }
    }
    
    scores(){
      if(player.index === 1){
        otherPlayerIndex = 2; 
      }
      else {
        otherPlayerIndex = 1;
      }
      database.ref('players/player'+otherPlayerIndex+'/name').on("value",function(data){
        otherPlayerName = data.val();
      });
      database.ref('players/player'+otherPlayerIndex+'/points').on("value",function(data){
        otherPlayerPoints = data.val();
      });
      push();
      textSize(20);
      textFont("courier new");
      fill("cyan");
      text(player.name+" (You): "+player.points,50,25);
      text(otherPlayerName+": "+otherPlayerPoints,600,25);
      pop();
    }

    cardflip(){
      for(var i=170;i<600;i+=100){
        for(var j=150;j<600;j+=120){
          var card = createSprite(i,j,30,70);
          card.addImage("card back",cardBackIMG);
          var rand = Math.round(random(0,cardIndex));
          switch(rand){
            case 0 || 10: card.addImage("card front", cardFront1);
              break;
            case 1 || 11: card.addImage("card front", cardFront2);
              break;
            case 2 || 12: card.addImage("card front", cardFront3);
              break;
            case 3 || 13: card.addImage("card front", cardFront4);
              break;
            case 4 || 14: card.addImage("card front", cardFront5);
              break;
            case 5 || 15: card.addImage("card front", cardFront6);
              break;
            case 6 || 16: card.addImage("card front", cardFront7);
              break;
            case 7 || 17: card.addImage("card front", cardFront8);
              break;
            case 8 || 18: card.addImage("card front", cardFront9);
              break;
            case 9 || 19: card.addImage("card front", cardFront10);
              break;
            default: break;
          }
          cardFronts.splice(rand);
          cardIndex -= 1;
          card.scale = 0.1;
          cards.push(card);
        }
      }
      if(mouseIsPressed){
        for(var i=0; i<cards.length; i++){
          if(mouseX < cards[i].x+cards[i].width/2 && mouseX > cards[i].x-cards[i].width/2 && mouseY < cards[i].y+cards[i].height/2 && mouseY > cards[i].y-cards[i].height/2){
              cards[i].changeImage("card front");
            
          }
        }
      }


      push();
      fill(0);
      textSize(30);
      textFont("courier new");
      text("Card Memory",300,25);
      textSize(16);
      text("Find matching pairs to make all the cards disappear!",125,50);
      pop();

      

      drawSprites();
    }
}

