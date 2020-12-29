
var monkey , monkey_running;
var obstacle, obstacle_running;
var banana, banana_moving;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score = 0;
var gameState = PLAY;
var END = 0;
var PLAY =1;

function preload(){
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
banana_moving = loadImage("banana.png");
obstacle_running = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600);
  
 ground = createSprite(300,480,1200,10);
  
 monkey = createSprite(100,420,10,10);
 monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.2;
  
 foodGroup = new Group();
 obstacleGroup = new Group();
}


function draw() {
 background("white");
 spawnObstacle();
 spawnFood();
  
 //display score
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50); 
  
  if(ground.x<0) {
 ground.x = ground.width/2
  }
  ground.velocityX = -(4 + score/100);
  
  
  
  if(gameState === PLAY){
     monkey.velocityY = monkey.velocityY+0.5;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END
  }
  
  
  else if(gameState === END){
   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   monkey.velocityY = 0;
  }
  
  //console.log(monkey.y);
  
  //monkey jump
if(keyDown("space")&&monkey.y>= 161){
monkey.velocityY = -10;
  
  //trex gravity
 
  
  
  monkey.collide(ground);
}
  
 drawSprites();
  
}

function spawnFood(){
  if(frameCount%80===0){
    food = createSprite(600,100,10,10);
    food.velocityX = -4;
    food.addImage("food",banana_moving);
    food.scale = 0.2;
    food.y = Math.round(random(40,120,10,10));
    //console.log(cloud.depth);
    monkey.depth = food.depth+1;
    food.lifetime = 160;
    foodGroup.add(food);
   }
}

function spawnObstacle(){
 if(frameCount%80===0){
   obstacle = createSprite(600,420,10,10);
   obstacle.velocityX = -3;
   obstacle.addImage("obstacle",obstacle_running);
   obstacle.scale = 0.3;
   obstacle.lifetime = 210;
  } 
}




