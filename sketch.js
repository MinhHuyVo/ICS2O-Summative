var btnPLAY = {
    x: 320,
    y: 200,
    width: 150,
    height: 40,
    content:"PLAY"
};
var btnABU = {
    x: 320,
    y: 250,
    width: 150,
    height: 40,
    content:"ABOUT US"
};
var btnEXIT = {
    x: 590,
    y: 20,
    width: 70,
    height: 40,
    content:"EXIT"
};
var btnINS = {
    x: 320,
    y: 300,
    width: 150,
    height: 40,
    content:"INSTRUCTION"
};
var btnMENU = {
    x: 40,
    y: 25,
    width: 80,
    height: 50,
    content:"MENU"
};
var fish;
var score=0;
var gameover;
var remaininghearts=3;
var hearts;
var dangerous1;
var obstacle;
var characterspiderman;
var characterhorse;
var aboutusimg;
var backgroundimg;
var backgroundx1=0;
var backgroundx2;
var scrollSpeed=1;
var instructionimg;
var person;
var img;
var endingimg;
var sceneNum=0;
var normalFont;
var titleFont; 
var stickPosition;
var dangerous;

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};
var topobs = function(x,y) {
    this.x = x;
    this.y = y;
}
var downobs = function(x,y) {
    this.x = x;
    this.y = y;
}

//Draw obstacle function

Stick.prototype.draw = function() {
    fill(0);
    image(fish, this.x, this.y,90 , 90);
};

topobs.prototype.draw = function() {
    fill(0);
    image(dangerous, this.x, this.y,500 , 10);
};

downobs.prototype.draw = function() {
    fill(0);
    image(dangerous1, this.x, this.y,50 , 10);
};

function drawButton (btn) {
  fill(120,109,94);
  rectMode(CENTER);
  rect(btn.x    , btn.y, btn.width,   btn.height, 5);
  fill(0, 0, 0);
  textSize(19);
  textAlign(CENTER);
  text(btn.content, btn.x  , btn.y+btn.height/4);
}

//Check if mouse is inside the button

var isMouseInside = function(btn) {
    return (mouseX >= btn.x  -btn.width/2 &&  
            mouseX <= btn.x  +btn.width/2 &&
            mouseY >= btn.y-btn.height/2 && 
            mouseY <= (btn.y+btn.height/2));
};

//Loading images

function preload() {
    titleFont = loadFont("airstrikebold.ttf")
    img = loadImage('Images/Startingscene.jpg')
    endingimg = loadImage('scene2.jpg')
    backgroundimg = loadImage ('background.png') 
    aboutusimg = loadImage('aboutus.jpg') 
    characterhorse = loadImage('characterhorse.png')
    instructionimg = loadImage('instruction.jpg')
    obstacle = loadImage('obstacle.png')
    dangerous = loadImage('DANGEROUS.png')
    dangerous1 = loadImage('DANGEROUS1.png')
    hearts = loadImage('hearts.png')
    gameover = loadImage('gameover.jpg')
    characterspiderman = loadImage('spiderman.PNG')
    fish = loadImage('fish1.png')
    normalFont = loadFont("normal.ttf")
}

var sticks =[];
var topobss = [];
var downobss = [];



function setup() {
  createCanvas(640, 360);
  person = new Person();
  for (let a = 0; a < 100; a++) {  
     
    sticks.push(new Stick(a * 150 + 300, random(20,270)));
    backgroundx2=width;
    
    
  }
  for (let a = 0; a < 100; a++) {  
    topobss.push(new topobs(0+a*500, 350));
    backgroundx2=width;
  }
  for (let a = 0; a < 100; a++) {  
    downobss.push(new downobs(0+a*50, 0));
    backgroundx2=width;
  }
}

var i = 0;

function keyPressed(){
  if (sceneNum===1 || sceneNum===5) {
    if (key == ' '){
    var jump = createVector(0,- 3.5);
    person.applyForce(jump);
    i++;
    } 
  }
  if (sceneNum == 2) {
    if (key == 'r'){
      sceneNum=1;
      person.pos.y=150;
      person.vel.y=0;
      
      backgroundx1=0;
      backgroundx2=width;
      
    }
  }
}

function draw() {
  background(255);
  if (sceneNum===0){
    image(img, 0, 0,640, 360);
    textSize(20);
    fill(120,109,94);
    textFont(titleFont);
    textSize(50);
    textAlign(CENTER);
    text("Treasure Hunting",320,125);
    textFont(normalFont);
    textSize(100);
    drawButton(btnPLAY);
    drawButton(btnABU);
    drawButton(btnINS);
    
    //Playable scene
    
  } else if (sceneNum===1) {
      background(67, 181, 11);
      image(backgroundimg, backgroundx1, 0 ,width, height);
      image(backgroundimg, backgroundx2 , 0 ,width, height);
      drawButton(btnEXIT);
      drawButton(btnMENU);
      
      for ( var a=0; a < remaininghearts ; a++) {
        
        image(hearts,a*30+450,15,50,25);
      }
      backgroundx1 -= scrollSpeed;
      backgroundx2 -= scrollSpeed;
      if (backgroundx1 < -width){
        backgroundx1 = width;
      }
      if (backgroundx2 < -width){
        backgroundx2 = width;
      }
    
      translate(-person.pos.x,0);
      
      
      var gravity = createVector(0,0.1);
      person.applyForce(gravity);
      fill(255,0,0);	
      text ('Amount of jumps: ' + i,520 + person.pos.x,70);
      text ('Your score: ' + score,520 + person.pos.x,100);
      person.update();
      person.edges(sticks[a]);
      person.displayhorse();
      fill(255,80);
      fill(0);
      for (var a = 0; a < sticks.length; a++) {
        sticks[a].draw();
        person.checkForStickGrab(sticks[a]);
        person.checkForScore(sticks[a]);
      }
      
      for (var b = 0; b < topobss.length; b++) {
        topobss[b].draw();
        downobss[b].draw();
      }
  //Draw ending scene
  } else  if (sceneNum===2) { 
  background (50,100,200);
  image(endingimg,0,0,640, 360);
  fill (0);
  textSize(30);
  text ('You are doing a great job!!!',320,50);
  text ('You have ' + remaininghearts + ' hearts left',320,80);
  text ('Press r to try again',320,110);
  drawButton(btnMENU);
  //Draw About us scene
  } else if (sceneNum===3) {
    textSize(30);
    image(aboutusimg,0,0,640,360);
    text('About us', 320,260);
    textSize(15);
    text('- I have made this game in association with the learn with us Program ',320,300);
    drawButton(btnMENU);
    
  //Draw instruction scene
    
  } else if (sceneNum===4) {
    fill(255);
    textSize(30);
    image(instructionimg,0,0,640,360);
    text('INStruction', 320,50);
    textSize(15);
    text('Press space bar and try to avoid as many obstacles as possible. ENJOY!',320,100);
    drawButton(btnMENU);
    
  //Draw gameover scene
    
  } else if (remaininghearts===0) {
    image(gameover,0,0,640,390)
    drawButton(btnMENU);
  } else if (sceneNum===5) {
    background(67, 181, 11);
      image(backgroundimg, backgroundx1, 0 ,width, height);
      image(backgroundimg, backgroundx2 , 0 ,width, height);
      drawButton(btnEXIT);
      drawButton(btnMENU);
      for (var b = 0; b < topobss.length; b++) {
        topobss[b].draw();
        downobss[b].draw();
      }
      for ( var a=0; a < remaininghearts ; a++) {
        
        image(hearts,a*30+450,15,50,25);
      }
      
      if (backgroundx1 < -width){
        backgroundx1 = width;
      }
      if (backgroundx2 < -width){
        backgroundx2 = width;
      }
    
      translate(-person.pos.x,0);
      
      
      var gravity = createVector(0,0.1);
      person.applyForce(gravity);
      fill(255,0,0);	
      text ('Amount of jumps: ' + i,520 + person.pos.x,70);
      text ('Your score: ' + score,520 + person.pos.x,100);
      person.update();
      person.edges(sticks[a]);
      person.displayspiderman();
      fill(255,80);
      fill(0);
      for (var a = 0; a < sticks.length; a++) {
        sticks[a].draw();
        person.checkForStickGrab(sticks[a]);
        person.checkForScore(sticks[a]);
      }
      
      
  }
}

//Check if button is clicked

mouseClicked = function() {
  if (sceneNum===1) {
    if (isMouseInside(btnEXIT)) {
        sceneNum=2;
    }
    if (isMouseInside(btnMENU)) {
        background(255);
        sceneNum=0;
       
    }
  }
  if (sceneNum===0) {
    if (isMouseInside(btnPLAY)) {
      sceneNum=1;
      person.pos.y=150;
      person.vel.y=0;
      i=0;
      backgroundx1=0;
      backgroundx2=width;
      score=0;
    }
    else if (isMouseInside(btnABU)) {
      sceneNum=3;
    }
    else if (isMouseInside(btnINS)) {
      sceneNum=4;
    }
  }
  if (sceneNum===2 || sceneNum===3 || sceneNum === 4 || sceneNum===5) {
    
    if (isMouseInside(btnMENU)) {
        sceneNum=0;
        remaininghearts=3;
    }
  }
}










  
