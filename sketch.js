var balloon;
var database, balloonposition;

function preload(){
    database = firebase.database();
    backgroundImg = loadImage("images/Hot Air Ballon-01.png");
    hotairballoon = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")

}

function setup() {
  createCanvas(1000,640);
  balloon = createSprite(500,300, 50, 50);
  balloon.addAnimation("hotairballoon", hotairballoon);   
  balloon.scale = 0.5;


  var ballposition = database.ref("Balloon/Position");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0,0);
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0,0);
                                                              
  }

  else if(keyDown(UP_ARROW)){
   writePosition(0, -10,-0.01); 
   
  } 

  else if(keyDown(DOWN_ARROW)) 
  {writePosition(0, 10,+0.01);
   
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
balloon.scale = position.height
}

function writePosition(x, y, height){
database.ref('Balloon/Position').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
  'height' : balloon.scale + height
})
}

function showError(){
  console.log("error");
}