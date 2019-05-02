# ICS2O-Summative


//main file
var person;
var scenenum=0;
var currentScene=1;

function setup() {
  createCanvas(1200, 850);
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


//person
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
    if (this.pos.y > 750) {
      this.vel.y *= 0;
      this.pos.y = 750;
    }
  }
}

