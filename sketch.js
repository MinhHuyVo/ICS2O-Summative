//SKETCH
var person;
var scenenum=0;
var currentScene=0;

function setup() {
  createCanvas(1250, 900);
  person = new Person();     
}

function keyPressed(){
  if (key == ' '){
    var jump = createVector(0,-5 );
    person.applyForce(jump);
   } 
}

function draw() {
  
  console.log(currentScene);
  
   if (currentScene === 0) {
        drawScene1();
    } else if (currentScene === 1) {
        drawScene2();
    } else if (currentScene === 2) {
        drawScene3();
    } else if (currentScene === 3) {
        drawScene0();
    
    }
}

//drawing scenes
function mouseClicked() {
  currentScene++;
    //if (currentScene === 1) {
    //    drawScene2();
    //    console.log(currentScene);
    //} else if (currentScene === 3) {
    //    drawScene1();
    //}
}


//ALL SCENES
  function drawScene2(){
  background(51);
  translate(-person.pos.x,0);
  var gravity = createVector(0,0.4);
  person.applyForce(gravity);
  if(mouseIsPressed){
  
  var force = createVector(-0.1,0);
  person.applyForce(force);
  }
  person.update();
  person.edges();
    person.display();
    //pop();
  fill(250,0,60);
  rect(400, height-50,200,60);
  }


 function drawScene1(){
// currentScene = 1;
 background(200, 200, 200);
 fill(32, 34, 41);
 textSize(100);
 text(" play game", 10, height/2);
 }
 
 
 function drawScene3(){
   //currentScene = 3;
   background(200, 200, 200);
   fill(32, 34, 41);
   textSize(100);
   text("end of game", 10, height/2);
 }
 
 
 //PERSON
 function Person() {
  this.pos = createVector(10, 10);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = 10;
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  this.display = function() {
    fill(10, 10);
    stroke(300);
    rect(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
  }
  
  this.edges = function() {
    if (this.pos.y > 800) {
      this.vel.y *= 0;
      this.pos.y = 800;
    }
  }
}
 


//HTML
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- PLEASE NO CHANGES BELOW THIS LINE (UNTIL I SAY SO) -->
  <script language="javascript" type="text/javascript" src="libraries/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="character.js"></script>
  <script language="javascript" type="text/javascript" src="person.js"></script>
  <script language="javascript" type="text/javascript" src="p5js-temp-game_for_the_kids987446559228305290.js"></script>
  <!-- OK, YOU CAN MAKE CHANGES BELOW THIS LINE AGAIN -->

  <!-- This line removes any default padding and style.
       You might only need one of these values set. -->
  <style> body { padding: 0; margin: 0; } </style>
</head>

<body>
</body>
</html>
