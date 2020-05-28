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

    car1 = createSprite(100,200);
    car1.addImage("car1",car_img);
    car1.scale = 0.1;
    car2 = createSprite(300,200);
    car2.addImage("car2",car_img);
    car2.scale = 0.1;
    car3 = createSprite(500,200);
    car3.addImage("car3",car_img);
    car3.scale = 0.1;
    car4 = createSprite(700,200);
    car4.addImage("car4",car_img);
    car4.scale = 0.1;
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(255);
      //background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;

      var line1 = createSprite(1550,150,3100,20);
      var line2 = createSprite(1550,275,3100,20);
      var line3 = createSprite(1550,350,3100,20);
      var line4 = createSprite(1550,475,3100,20);

      if(keyDown===32){
        car4.velocityY = car4.velocityY+30;
      }
      car4.velocityY = car4.velocityY+0.8;
      car4.collide(line4);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 35;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 100;
        //use data form the database to display the cars in y direction
        x = allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,100,100);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3100){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
