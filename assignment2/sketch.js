
let selectedColor;
let buttons;
let display;
let sidePanel;


function setup() {
  createCanvas(1000, 700);
  background(222);
  selectedColor = color('white');

  display = new ColorDisplay(20, 20, color(selectedColor));
  sidePanel = new AdvanceButton(0,0,125,1000,color(150))
  buttons = [
    new Button(50,50,color('red')),
    new Button(50,100,color('blue')),
    new Button(50,150,color('yellow')),
    new Button(50,200,color('purple')),
    new Button(50,250,color('orange')),
    new Button(50,300,color('pink')),
    new Button(50,350,color('green')),
    new Button(50,400,color('white')),
    new Button(50,450,color('gray')),
    new Button(50,500,color('black')),
    new Button(50,550,color('aqua')),
    new Button(50,600,color('lime')),
    new Button(50,650,color('brown')),
  
  ];


    
}

function draw() {
  if (mouseIsPressed == true) {
    if(sidePanel.contains(mouseX,mouseY)) {
    for(let i=0;i < 13 ;i++) {
      if(buttons[i].contains(mouseX,mouseY)) {
        selectedColor = buttons[i].fill;
        display.fill = selectedColor;

      }
    }
  }
  else {
    stroke(selectedColor);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
  sidePanel.draw();
  for(let i=0;i < buttons.length;i++) {
    buttons[i].draw();
  }
  
  display.draw();

}



class Button {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
  draw() {
    strokeWeight(4);
    stroke(200);
    fill(this.fill);
    square(this.x,this.y,35);
   
  }
  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+35;
    let insideY = y >= this.y && y <= this.y+35;
    return insideX && insideY;
  }
}

class AdvanceButton {
  constructor(x,y, sizeX, sizeY, fill) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fill = fill;
  }
  draw() {
    strokeWeight(4);
    stroke(200);
    fill(this.fill);
    rect(this.x,this.y,this.sizeX,this.sizeY);
   
  }
  contains(x,y) {
    let insideX = x >= this.x && x <= this.x+ this.sizeX;
    let insideY = y >= this.y && y <= this.y+ this.sizeY;
    return insideX && insideY;
  }
}


class ColorDisplay {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    strokeWeight(4);
    stroke(200);
    fill(this.fill);
    circle(this.x,this.y,35);
   
  }

}


