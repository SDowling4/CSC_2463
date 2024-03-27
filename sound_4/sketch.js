let sprite;
let bugSpriteSheet;
let animations = [];
let sprites = [];
let bugs = [];
let direction = [0, 90, 180, 270];
let w = 800;
let score = 0;
let speed = 1;
let gameKey = 'w';
let Initial_spawn = false;
let gameOver = false;
gameMenu = 'start';
timeRemaining = 30;
let distortionLevel = 0

//players
let SplatPlayer = new Tone.Player("assets/splat.mp3").toDestination();
let MissPlayer = new Tone.Player("assets/miss.mp3").toDestination();
let CleanPlayer = new Tone.Player("assets/clean.mp3").toDestination();
let CrawlingPlayer = new Tone.Player("assets/crawling.mp3").toDestination();
let LobbyPlayer = new Tone.Player("assets/lobby.mp3");
let TickPlayer = new Tone.Player("assets/clock.mp3");
let GamePlayer = new Tone.Player("assets/game.mp3");

//playbackRate
MissPlayer.playbackRate = 2;
SplatPlayer.playbackRate = 2;



//effects
let game_bend = new Tone.PitchShift();
let tick_vol = new Tone.Volume(20); 
let lobby_vol = new Tone.Volume(-10); 
let distortionEX = new Tone.Distortion (0); 



//mute and loop
tick_vol.mute = true;
lobby_vol.mute = true;
CrawlingPlayer.loop = true;
TickPlayer.loop = true;
LobbyPlayer.loop = true;


// connect
TickPlayer.connect(tick_vol);
LobbyPlayer.connect(lobby_vol);
GamePlayer.connect(game_bend);


//to destination
tick_vol.toDestination();
lobby_vol.toDestination();
game_bend.toDestination();




function preload() {
animations = {
dead: {row:0,  col:4 , frames:1},
walk: {row:0, frames:4}
};
bugSpriteSheet = loadImage("assets/bug_ss.png");

}


let startMusic = false;
function setup() {
  createCanvas(w, w);
  
}


function draw() {
  background(124);
  

  if (gameMenu == 'start')
  {

    startMenu();
   

  }else if (gameMenu == 'end') {
    endMenu();
   }
   else if (gameMenu == 'playing')
  {

  
    timeRemaining -= deltaTime / 1000;
    
    if (timeRemaining <= 10) {
      tick_vol.mute = false;

      //
    }

    if (timeRemaining <= 0)
    {
      gameMenu = 'end';
      CrawlingPlayer.stop();
      lobby_vol.mute = false;
      tick_vol.mute = true;
      GamePlayer.stop();
      timeRemaining = 0;
      
      //
      
    }

   

  

    if (Initial_spawn == true) {
      Initial_spawn = false;
      
    for (let i = 0; i < 50; i++) {
      bugs.push(new bug(random(w),random(w),32,32,bugSpriteSheet,animations));
      bugs.forEach((bug) => {

        bug.rotation = random(direction);
  
        if (bug.rotation === 0) {
          bug.goDown();
        } 
        else if (bug.rotation === 90) {
          bug.goLeft();
        } 
        else if (bug.rotation === 180) {
          bug.goUp();
        } 
        else if (bug.rotation === 270) {
          bug.goRight();
        } 
        else{
          bug.dead();
         
        }

        if (bug.sprite.x + bug.sprite.width/4 > width) {
          bug.goLeft();
        } else if (bug.sprite.x - bug.sprite.width/4 < 0) {
          bug.goRight();
        }


      })
    
    }
    }

    bugs.forEach((bug) => {

      
    if (bug.sprite.x + bug.sprite.width/4 > width) {
      bug.goRight();
    } else if (bug.sprite.x - bug.sprite.width/4 < 0) {
      bug.goLeft();
    }


    if (bug.sprite.y + bug.sprite.height/4 > height) {
      bug.goDown();
    } else if (bug.sprite.y - bug.sprite.height/4 < 0) {
      bug.goUp();
    }

  })
  

    push();
    text("Time Left:" + ceil(timeRemaining), 30 , 45);
    text("points: " + score , 30 , 60);
   pop();
 
  
  }
}
   

function startMenu() {
  background(200);
  text("Bug Squish!", 325, 250);
  text("You have 30 seconds to squish as many bugs as posible!", 200, 300);
  text("Press space to start playing.", 275, 350);

  if (key == ' ') {
      gameMenu = 'playing';
      Initial_spawn = true;
      LobbyPlayer.loop = true;
      CrawlingPlayer.start();
      TickPlayer.start();
      GamePlayer.start();
      LobbyPlayer.start();
      lobby_vol.mute = true;

    
  }
}

function endMenu() {
  background(124);
  text("GAME OVER", 325, 250);
  text("You Squished " + score + " of the bugs", 275, 300);
  text("Press " + gameKey + " to squish again.", 275, 350);
  if (key == gameKey) {
    if (gameKey == 'w') {
      gameKey = 's'
    } else
     {
      gameKey = 'w';
    }
    Initial_spawn = true;
    gameMenu = 'playing';
    timeRemaining = 30;
    speed = 1;
    score = 0;
    CrawlingPlayer.start();
    TickPlayer.start();
    GamePlayer.start();
    CleanPlayer.start();
    LobbyPlayer.start();
    game_bend.pitch = 0;
    lobby_vol.mute = true;
   

  }
}



let sound_yet = false;
function mouseReleased() {

  bugs.forEach((bug) => {
  { if (!bug.isDead && gameMenu == 'playing') {
   if(bug.contains(mouseX,mouseY)) {
       bug.dead();
       score++;
       speed++;
       SplatPlayer.start();
       game_bend.pitch = (speed*1.5);
       sound_yet = true;
     }
   }
  }
  })

  if(sound_yet == false &&  gameMenu == 'playing') {
    MissPlayer.start();
  }
 sound_yet = false;

}







class bug {
  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('walk');
    this.isDead = false;
  }


  goUp() {
    this.sprite.changeAni('walk');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = speed;
    this.sprite.rotation = 180;
  }

  goDown() {
    this.sprite.changeAni('walk');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = -speed;
    this.sprite.rotation = 0;
  }

  goRight() {
    this.sprite.changeAni('walk');
    this.sprite.vel.x = -speed;
    this.sprite.vel.y = 0;
    this.sprite.rotation = 270;
  }

  goLeft() {
    this.sprite.changeAni('walk');
    this.sprite.vel.x = speed;
    this.sprite.vel.y = 0;
    this.sprite.rotation = 90;
  }

  dead() {
    this.sprite.changeAni('dead');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.isDead = true;
  }

  isBugDead() {
    return this.isDead;
  }

  contains(x,y) {
    let insideX = x >= this.sprite.x && x <= this.sprite.x +16;
    let insideY = y >= this.sprite.y && y <= this.sprite.y + 16;
    return insideX && insideY;
  }



  

}