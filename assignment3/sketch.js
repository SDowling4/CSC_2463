let sprite;
let characters = [];
let w = 400;

function preload() {
let animations = {
stand: {row:0, frames:1},
walkRight: {row:0, col:1,frames:8}
};
characters.push(new Character(200,100,80,80,'assets/robot.png',animations));
characters.push(new Character(200,200,80,80,'assets/guy.png',animations));
characters.push(new Character(200,300,80,80,'assets/green.png',animations));
}



function setup() {
  createCanvas(w, w);
}

function draw() {
  background(0);

  characters.forEach((character) => {
    if (kb.pressing('d')) {
      character.walkRight();
    } 
    else if (kb.pressing('a')) {
      character.walkLeft();
    } 
    else{
      character.stop();
    }


  })
}

class Character {
  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('stand');
  }


  stop() {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
  }
  
  walkRight() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
  }
  
  walkLeft() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
    this.sprite.vel.y = 0;
  }

}