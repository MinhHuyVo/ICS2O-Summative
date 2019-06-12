//creating buttons
var btnRETRY = {
  x: 600,
  y: 340,
  width: 80,
  height: 50,
  content: "RETRY"
};
var btnPLAY = {
  x: 320,
  y: 200,
  width: 150,
  height: 40,
  content: "PLAY"
};
var btnNEXT = {
  x: 600,
  y: 340,
  width: 80,
  height: 50,
  content: "NEXT"
};
var btnEASY = {
  x: 550,
  y: 200,
  width: 150,
  height: 40,
  content: "EASY"
};
var answer1 = {
  x: 320,
  y: 150,
  width: 150,
  height: 40,
  content: ""
};
var answer2 = {
  x: 320,
  y: 200,
  width: 150,
  height: 40,
  content: ""
};
var answer3 = {
  x: 320,
  y: 250,
  width: 150,
  height: 40,
  content: ""
};
var btnHARD = {
  x: 550,
  y: 250,
  width: 150,
  height: 40,
  content: "HARD"
};
var btnABU = {
  x: 320,
  y: 250,
  width: 150,
  height: 40,
  content: "ABOUT US"
};
var btnEXIT = {
  x: 590,
  y: 20,
  width: 70,
  height: 40,
  content: "EXIT"
};
var btnINS = {
  x: 320,
  y: 300,
  width: 150,
  height: 40,
  content: "INSTRUCTION"
};
var btnMENU = {
  x: 40,
  y: 25,
  width: 80,
  height: 50,
  content: "MENU"
};
var array = [160, 210, 260]; //For locating answers buttons
var sound=0;
var soundOn;
var soundOff;
let startingsong;
let answerWrong;
let questionSound;
let answerCorrect;
let losingSound;
let jumpingSound;
var wrong;
var correct;
var times;
var choosinglevels;
var fish;
var score = 0;
var gameover;
var remaininghearts = 3;
var hearts;
var dangerous1;
var obstacle;
var characterspiderman;
var characterhorse;
var aboutusimg;
var backgroundimg;
var backgroundx1 = 0;
var backgroundx2;
var scrollSpeed = 1;
var instructionImg; //
var person;
var startingImg;
var endingimg;
var sceneNum = 0;
var normalFont;
var titleFont;
var stickPosition;
var dangerous;

var Stick = function(x, y) {
  this.x = x;
  this.y = y;
};
var topobs = function(x, y) {
  this.x = x;
  this.y = y;
}
var downobs = function(x, y) {
  this.x = x;
  this.y = y;
}

//Draw obstacle function

Stick.prototype.draw = function() {
  fill(0);
  image(fish, this.x, this.y, 90, 90);
};

topobs.prototype.draw = function() {
  fill(0);
  image(dangerous, this.x, this.y, 500, 10);
};

downobs.prototype.draw = function() {
  fill(0);
  image(dangerous1, this.x, this.y, 50, 10);
};

function drawButton(btn) {
  fill(120, 109, 94);
  stroke(30);
  rectMode(CENTER);
  rect(btn.x, btn.y, btn.width, btn.height, 5);
  fill(0, 0, 0);
  textSize(19);
  textAlign(CENTER);
  text(btn.content, btn.x, btn.y + btn.height / 4);
}

//Check if mouse is inside the button

var isMouseInside = function(btn) {
  return (mouseX >= btn.x - btn.width / 2 &&
    mouseX <= btn.x + btn.width / 2 &&
    mouseY >= btn.y - btn.height / 2 &&
    mouseY <= (btn.y + btn.height / 2));
};

//Loading images and fonts

function preload() {
  titleFont = loadFont("airstrikebold.ttf")
  normalFont = loadFont("normal.ttf")
  img = loadImage('Images/Startingscene.jpg')
  endingimg = loadImage('scene2.jpg')
  backgroundimg = loadImage('background.png')
  aboutusimg = loadImage('aboutus.jpg')
  characterhorse = loadImage('characterhorse.png')
  instructionimg = loadImage('instruction.png')
  obstacle = loadImage('obstacle.png')
  dangerous = loadImage('DANGEROUS.png')
  dangerous1 = loadImage('DANGEROUS1.png')
  hearts = loadImage('hearts.png')
  gameover = loadImage('gameover.jpg')
  choosinglevels = loadImage('choosinglevels.PNG')
  characterspiderman = loadImage('spiderman.PNG')
  fish = loadImage('fish1.png')
  normalFont = loadFont("normal.ttf")
  correct = loadImage('correct.png')
  wrong = loadImage('wrong.png')
  startingsound = loadSound('startingsound.mp3')
  soundOn = loadImage('soundOn.png')
  soundOff = loadImage('soundOff.png')
  
  
}

var sticks = []; //For storing fishes
var topobss = []; //For storing top obstacles
var downobss = []; //For storing bottom obstacles
var firstNums = [];
var secondNums = [];
var rightAnswerPos = [];


function setup() {
  var cnv = createCanvas(640, 360);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  background(255, 0, 200);
  jumpingSound = loadSound ('jumpingsound.wav')
  losingSound = loadSound ('losing.wav')
  answerWrong = loadSound ('wrong.mp3')
  answerCorrect = loadSound ('answerCorrect.mp3')
  questionSound = loadSound ('question.mp3')
  
  person = new Person();
  for (let a = 0; a < 100; a++) {

    sticks.push(new Stick(a * 150 + 300, random(20, 280)));
    backgroundx2 = width;


  }
  for (let a = 0; a < 100; a++) {
    topobss.push(new topobs(0 + a * 500, 350));
    backgroundx2 = width;
  }
  for (let a = 0; a < 100; a++) {
    firstNums.push(floor(random(100, 500)));
    secondNums.push(floor(random(100, 500)));
  }
  for (let a = 0; a < 100; a++) {
    downobss.push(new downobs(0 + a * 50, 0));
    backgroundx2 = width;
  }


  
}

var i = 0;

function keyPressed() {
  if (sceneNum === 1 || sceneNum === 5) {
    if (key == ' ') {
      jumpingSound.play();
      var jump = createVector(0, -3.5);
      person.applyForce(jump);
      i++;
    }


  } else if (sceneNum == 6) {
    if (key == 'r') {
      sceneNum = 5;
      person.pos.y = 150;
      person.vel.y = 0;

      backgroundx1 = 0;
      backgroundx2 = width;

    }
  }
}

function draw() {
  background(255);
  if (sceneNum === 0) {
    image(img, 0, 0, 640, 360);
    textSize(20);
    fill(120, 109, 94);
    textFont(titleFont);
    textSize(50);
    textAlign(CENTER);
    text("Treasure Hunting", 320, 125);
    textFont(normalFont);
    textSize(100);
    drawButton(btnPLAY);
    drawButton(btnABU);
    drawButton(btnINS);
    if (sound===0) {
      image(soundOff, 50, 280, 50, 50);
      
    }
    if (sound===1) {
      fill(255);
      rect(75, 305, 50, 50);
      image(soundOn, 50, 280, 50, 50);
    }
    //Playable scene

  } else if (sceneNum === 1) {
    startingsound.stop();
    background(67, 181, 11);
    image(backgroundimg, backgroundx1, 0, width, height);
    image(backgroundimg, backgroundx2, 0, width, height);
    drawButton(btnEXIT);
    drawButton(btnMENU);

    for (var a = 0; a < remaininghearts; a++) {

      image(hearts, a * 30 + 450, 15, 50, 25);
    }
    backgroundx1 -= scrollSpeed;
    backgroundx2 -= scrollSpeed;
    if (backgroundx1 < -width) {
      backgroundx1 = width;
    }
    if (backgroundx2 < -width) {
      backgroundx2 = width;
    }

    translate(-person.pos.x, 0);


    var gravity = createVector(0, 0.1);
    person.applyForce(gravity);
    fill(255, 0, 0);
    text('Amount of jumps: ' + i, 520 + person.pos.x, 70);
    text('Your score: ' + score, 520 + person.pos.x, 100);
    person.update();
    person.edges(sticks[a]);
    person.displayhorse();
    fill(255, 80);
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
  } else if (sceneNum === 2) {
    background(50, 100, 200);
    image(endingimg, 0, 0, 640, 360);
    fill(0);
    textSize(30);
    text('You are doing a great job!!!', 320, 50);
    text('You have ' + remaininghearts + ' hearts left', 320, 80);

    drawButton(btnNEXT);
    drawButton(btnMENU);
    //Draw About us scene
  } else if (sceneNum === 3) {
    
    textSize(30);
    image(aboutusimg, 0, 0, 640, 360);
    text('About us', 320, 260);
    textSize(15);
    text('- I have made this game in association with the learn with us Program ', 320, 300);
    drawButton(btnMENU);

    //Draw instruction scene

  } else if (sceneNum === 4) {
    
    fill(255);
    textSize(30);
    image(instructionimg, 0, 0, 640, 360);
    text('Instruction', 320, 50);
    textSize(15);
    text('Press space bar and try to avoid as many obstacles as possible. ENJOY!', 320, 100);
    drawButton(btnMENU);

    //Draw gameover scene

  } else if (remaininghearts === 0) {
    image(gameover, 0, 0, 640, 390)
    fill(105, 37, 184);
    textFont(titleFont);
    text('Your score is: ' + score, 320, 300); 
    drawButton(btnMENU);

  } else if (sceneNum === 5) {
    startingsound.stop();
    background(67, 181, 11);
    image(backgroundimg, backgroundx1, 0, width, height);
    image(backgroundimg, backgroundx2, 0, width, height);
    drawButton(btnEXIT);
    drawButton(btnMENU);
    for (var b = 0; b < topobss.length; b++) {
      topobss[b].draw();
      downobss[b].draw();
    }
    for (var a = 0; a < remaininghearts; a++) {
      image(hearts, a * 30 + 450, 15, 50, 25);
    }

    if (backgroundx1 < -width) {
      backgroundx1 = width;
    }
    if (backgroundx2 < -width) {
      backgroundx2 = width;
    }
    translate(-person.pos.x * 2, 0);
    var gravity = createVector(0, 0.1);
    person.applyForce(gravity);
    fill(255, 0, 0);
    text('Amount of jumps: ' + i, 520 + person.pos.x * 2, 70);
    text('Your score: ' + score, 520 + person.pos.x * 2, 100);
    person.update();
    person.edges(sticks[a]);
    person.displayspiderman();
    fill(255, 80);
    fill(0);
    for (var a = 0; a < sticks.length; a++) {
      sticks[a].draw();
      person.checkForStickGrabHard(sticks[a]);
      person.checkForScore(sticks[a]);
    }
  } else if (sceneNum === 6) {
    background(50, 100, 200);
    image(endingimg, 0, 0, 640, 360);
    fill(0);
    textSize(30);
    text('You are doing a great job!!!', 320, 50);
    text('You have ' + remaininghearts + ' hearts left', 320, 80);

    drawButton(btnMENU);
    drawButton(btnNEXT);
  } else if (sceneNum === 7) {
   
    image(choosinglevels, 0, 0, 640, 360);
    textSize(30);
    text('Choose your preferred level', 320, 50);
    drawButton(btnEASY);
    drawButton(btnHARD);
  } else if (sceneNum === 8) {
    
    drawButton(answer1);
    drawButton(answer2);
    drawButton(answer3);
    
    drawButton(btnMENU);

    textSize(30);
    text('Answer this question to continue back to game ', 350, 40);
    fill(0, 100, 23);

    text('what is the answer to ' + firstNums[times] + ' + ' + secondNums[times] + '?', 320, 65);

    result = firstNums[times] + secondNums[times];


    fill(0);
    text(result, 320, answerPosition);
    text(result + 100, 320, wrongAnswerPosition1);
    text(result - 100, 320, wrongAnswerPosition2);
  } else if (sceneNum === 9) {
    
    textSize(50);
   
    image(correct,0,0,640,360);
    text('You are right', 320, 200);
    drawButton(btnNEXT);
    drawButton(btnMENU);
  } else if (sceneNum === 10) {
    textSize(50);
    image(wrong, 0, 0, 640, 360);
    text('Try again :(', 320, 200);
    drawButton(btnRETRY);
    drawButton(btnMENU);
  }
}

//Check if button is clicked

mouseClicked = function() {
  if (sceneNum === 1) {
    if (isMouseInside(btnEXIT)) {
      sceneNum = 2;
    }
    if (isMouseInside(btnMENU)) {
      background(255);
      sceneNum = 0;

    }
  }
  if (sceneNum === 7) {
    if (isMouseInside(btnEASY)) {
      sceneNum = 1;
    }
    if (isMouseInside(btnHARD)) {

      sceneNum = 5;

    }
  }
  if (sceneNum === 0) {
    if (mouseX >=50 && mouseX <= 100 && mouseY >=280 && mouseY <=330) {
      if (sound === 0) {
        sound=1;
        startingsound.play();
      } else if (sound===1) {
        sound=0;
        startingsound.stop();
      }
    }
        
    if (isMouseInside(btnPLAY)) {
      sceneNum = 7;
      person.pos.y = 150;
      person.vel.y = 0;
      i = 0;
      backgroundx1 = 0;
      backgroundx2 = width;
      score = 0;
    } else if (isMouseInside(btnABU)) {
      sceneNum = 3;
    } else if (isMouseInside(btnINS)) {
      sceneNum = 4;
    }
  }
  if (sceneNum === 2 || sceneNum === 3 || sceneNum === 4 || sceneNum === 5 || sceneNum === 6 || sceneNum === 7 || sceneNum === 8 || sceneNum === 9 || sceneNum === 10) {

    if (isMouseInside(btnMENU)) {
      sceneNum = 0;
      remaininghearts = 3;
    }
  }
  if (sceneNum === 8) {
    if (answerPosition === 160) {
      if (isMouseInside(answer1)) {
        sceneNum = 9;
        answerCorrect.play();
      }
    } else if (answerPosition === 210) {
      if (isMouseInside(answer2)) {
        sceneNum = 9;
        answerCorrect.play();
      }
    } else if (answerPosition === 260) {
      if (isMouseInside(answer3)) {
        sceneNum = 9;
        answerCorrect.play();
      }
    }

    if (wrongAnswerPosition1 === 160) {
      if (isMouseInside(answer1)) {
        sceneNum = 10;
        answerWrong.play();
      }
    } else if (wrongAnswerPosition1 === 210) {
      if (isMouseInside(answer2)) {
        sceneNum = 10;
        answerWrong.play();
      }
    } else if (wrongAnswerPosition1 === 260) {
      if (isMouseInside(answer3)) {
        sceneNum = 10;
        answerWrong.play();
      }
    }
    if (wrongAnswerPosition2 === 160) {
      if (isMouseInside(answer1)) {
        sceneNum = 10;
        answerWrong.play();
      }
    } else if (wrongAnswerPosition2 === 210) {
      if (isMouseInside(answer2)) {
        sceneNum = 10;
        answerWrong.play();
      }
    } else if (wrongAnswerPosition2 === 260) {
      if (isMouseInside(answer3)) {
        sceneNum = 10;
        answerWrong.play();
      }
    }
  }
  if (sceneNum === 2 || sceneNum === 6) {
    if (isMouseInside(btnNEXT)) {
      times = floor(random(0, 100));
      answerPosition = random(array);
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === answerPosition) {
          array.splice(i, 1);
        }
      }
      wrongAnswerPosition1 = random(array);
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === wrongAnswerPosition1) {
          array.splice(i, 1);
        }
      }
      wrongAnswerPosition2 = random(array);
      array = [160,210,260];
      sceneNum = 8;
      questionSound.play();
    }
  }
  if (sceneNum === 9) {
    if (isMouseInside(btnNEXT)) {

      sceneNum = 1;
      person.pos.y = 150;
      person.vel.y = 0;

      backgroundx1 = 0;
      backgroundx2 = width;
    }
  }
  if (sceneNum === 10) {
    if (isMouseInside(btnRETRY)) {
      sceneNum = 8;
    }
  }
  
}

