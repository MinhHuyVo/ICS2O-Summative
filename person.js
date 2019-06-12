
function Person() {
  this.pos = createVector(50, 150);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = 10;
  this.sticks = 0;
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  this.displayhorse = function() {
    fill(255, 150,40);
    stroke(255);
    
    image(characterhorse,this.pos.x, this.pos.y,this.mass*10,this.mass*8);
    
  } 	
  this.displayspiderman = function() {
    fill(255, 150,40);
    stroke(255);
    
    image(characterspiderman,this.pos.x*2, this.pos.y,this.mass*7,this.mass*8);
    
  }
  this.edges = function() {
    if (this.pos.y > 280 || this.pos.y <0 && remaininghearts>0) {
      sceneNum++;
      remaininghearts--;
      losingSound.play();
    } 
    else if (remaininghearts===0) {
      sceneNum=5;
    }
  }


	this.health = function () {
  this.mass--;
	}
  
  this.checkForStickGrab = function(stick) {
    if ((stick.x >= this.pos.x-40 && stick.x <= (this.pos.x +60 )) &&
        (stick.y >= this.pos.y-40&& stick.y <= (this.pos.y+60 ))) {
    remaininghearts--;
    stick.y = -1000;
    this.sticks++;
    sceneNum++;
    losingSound.play();
    }
    else if (remaininghearts===0) {
      sceneNum=5;
    }
  }
  this.checkForStickGrabHard = function(stick) {
    if ((stick.x >= (this.pos.x*2-40) && stick.x <= (this.pos.x*2+45  )) &&
        (stick.y >= (this.pos.y-40)&& stick.y <= (this.pos.y+60 ))) {
    remaininghearts--;
    stick.y = -1000;
    this.sticks++;
    sceneNum++;
    losingSound.play();
    }
    else if (remaininghearts===0) {
      sceneNum=5;
    }
  }
  this.checkForScore = function(stick) {
    if (stick.x <= (this.pos.x -60) &&stick.x>=(this.pos.x-60.5)) {
      score++;
    }
  }
}