var  PC,npcGroup;
var npcAnimation,NPCsheet,PCanimation,boo,npcSpeed,score,i,resetImage;
var weapon,weaponImg,backgroundImg;
var clash

var gameState =2
function preload() {
  npcAnimation = loadAnimation("n1.png","n2.png","n3.png","n4.png","n5.png","n6.png","n7.png","n8.png","n9.png","n10.png","n11.png","n12.png")

  pauseImg= loadImage("pause.png")
  boo = loadSound("boo.mp3")
  PCanimation = loadAnimation("PC1.png","PC2.png","PC3.png","PC4.png","PC5.png","PC6.png","PC7.png","PC8.png")
  weaponImg = loadImage("lightsaber.png")
  resetImage = loadImage("reset.png")
  playImg = loadImage("play.png")
  backgroundImg = loadImage("logo.jpg")
  

}
function setup() {
  createCanvas(800,400);
  
  
  
  
  play = createSprite(400,200)
  play.addImage(playImg)
  play.scale = 0.5
  
  PC= createSprite(400,200,10,10)
  PC.shapeColor = "red";
  PC.addAnimation("cc",PCanimation)
  PC.scale = 0.25
  PC.setCollider("circle",0,10,10)

  weapon = createSprite(PC.x,PC.y,10,100)
  weapon.depth = PC.depth-10;
  weapon.addImage(weaponImg)
  weapon.scale = 0.25
  weapon.setCollider("rectangle",20,0,10,800)
  
  npcGroup = new Group()
  
  score = 0;
  i=0;
  
  reset = createSprite(400,300,10,10)
  reset.addImage(resetImage)
}

function draw() {
  weapon.x= PC.x;
  weapon.y = PC.y;
  if(score%100 === 0 &&  score>0){
    i++
  }
    
  background(0);

  edege = createEdgeSprites()
  PC.collide(edege)
  
  if(gameState === 2){
    PC.visible = false;
    weapon.visible = false;
    reset.visible = false;
    if(mousePressedOver(play)){
      gameState = 1
    }

    textSize(20)
    text("movement: arrow keys",20,20)
    text("weapon controls: A/D",20,40)
  }
  if(gameState === 1){
    PC.visible = true;
    weapon.visible = true;
    reset.visible = false;
    play.visible = false;
    if(keyDown(UP_ARROW)){
      PC.y -= 2
    }
    else if(keyDown(RIGHT_ARROW)){
      PC.x += 2
    }
    else if(keyDown(LEFT_ARROW)){
      PC.x -= 2
    }
    else if(keyDown(DOWN_ARROW)){
      PC.y += 2
    }
    if(keyDown(65)){
      weapon.rotation = weapon.rotation+1
    }
    if(keyDown(68)){
      weapon.rotation = weapon.rotation-1
    }
    enemySpawn()
    if(npcGroup.isTouching(PC)){
      gameState = 0
      npcGroup.destroyEach()
      boo.play();
    }
    
  }
  else if(gameState === 0){
    PC.visible = false
    weapon.visible = false
    reset.visible = true
    fill(0,0,255)
    textSize(100)
    text("you Lose",200,200)
   
    if(mousePressedOver(reset)){
      gameState = 1
      boo.stop()
      score =0
    }

  }
  drawSprites();
  fill("red")
  textSize(20)
  text("Score: "+score,700,40)
  
}
function enemySpawn() {
  if(frameCount%10 === 0){
    npc = createSprite(random(10,800),0,20,20)
    npc.lifetime = 267;
    npc.addAnimation("xx",npcAnimation)
    npc.scale = 0.5
    npcGroup.add(npc)
    npcGroup.overlap(weapon,npcHit)
    npc.attractionPoint(3+i,PC.x,PC.y)
    npc.setCollider("circle",0,10,50)    

  }
}
function npcHit(npc,weapon) {
  npc.remove()
  score++
}
function mousePressed(){
  frameRate(0)
}

