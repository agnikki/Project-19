//Global Variables
var back_img,player_running_img,bananaImage,obstacle_img,
survivalTime,obstacleImage,banana,monkey,obstacle,ground,
bk,bananaGroup,obstacleGroup,score;


function preload(){
  back_img=loadImage("jungle.jpg");
  player_running_img=loadAnimation("Monkey_01.png",
"Monkey_02.png","Monkey_03.png","Monkey_04.png",
"Monkey_05.png","Monkey_06.png","Monkey_07.png",
"Monkey_09.png","Monkey_08.png","Monkey_10.png");
  bananaImage=loadImage("Banana.png");
  obstacle_img=loadImage("stone.png");
  
}


function setup() {
  createCanvas(600,300);
  
   bk=createSprite(200,100,600,300);
  bk.addImage(back_img);
  bk.x=bk.width/2;
  
 monkey = createSprite(25,280,20,50); 
 monkey.addAnimation("running",player_running_img);
monkey.scale=0.1; 
  
ground = createSprite(300,290,600,20);
ground.visible=false;
   
  score=0;
  obstacleGroup=new Group();
  bananaGroup=new Group();
  
}
 

function draw(){
 background(255);
  bk.velocityX=-5;
  if (bk.x < 100){
    bk.x = bk.width/2;
  }
  
   if(keyDown("space")){
    monkey.velocityY = -10;
  }
  monkey.collide(ground);
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }                          
  
    switch(score){
      case 10:monkey.scale=0.12;
        break;
      case 20:monkey.scale=0.14;
        break;
      case 30:monkey.scale=0.16;
        break;
      case 40:monkey.scale=0.18;
        break;
        default:break;
    } 
  //add gravity
monkey.velocityY = monkey.velocityY + 0.8;
monkey.collide(ground);
bananas();
obstacles();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,400,50);
  text("Score: "+score,100,50);
}

function bananas() {
 if(frameCount%100===0){
  var banana=createSprite(600,Math.round(random(100,170)),10,40);
 banana.addImage(bananaImage);
 banana.scale=0.05;
 banana.velocityX=-3;
  banana.lifetime=200;
  bananaGroup.add(banana);
}
} 

function obstacles() {
  if(frameCount%300===0){
    var stone=createSprite(600,260,20,20);
    stone.velocityX=-5;
    stone.addImage(obstacle_img);
    stone.lifetime=150;
    stone.scale=0.15;
    obstacleGroup.add(stone);
  }
}