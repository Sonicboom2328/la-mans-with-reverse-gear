class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    lmp1 = createSprite(100,200);
  huracan= createSprite(300,200);
    p1 = createSprite(500,200);
    chiron = createSprite(700,200);
    cars = [lmp1, huracan, p1, chiron];
    lmp1.addImage("lmp1",lmp1img);
    huracan.addImage("huracan",hurimg);
    p1.addImage("p1",pimg);
    chiron.addImage("chiron",cimg);
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("#c68767");
      image(track,0,-displayHeight*6,displayWidth,displayHeight*7);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 220;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
       
         }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      camera.position.x+=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      camera.position.x-=10
      player.update();
    }
  
if (player.distance>5900){
  gameState=2;
}
    drawSprites();
  }
  end(){
    console.log("race ended");
    game.update(2);

  }
}
