function setup() {
  createCanvas(700, 700);
}

function draw() {

  background(12, 13, 84);
  fill(34, 92, 11)
  strokeWeight(10);
  stroke('white')
  circle(350, 350, 400);
translate(350, 350)
fill('red')
  beginShape();
  vertex(0, -180);
  vertex(30, -56);
  vertex(170, -65);
  vertex(50, 20);
  vertex(110, 150);
  vertex(0, 50);
  vertex(-100, 150);
  vertex(-50, 20);
  vertex(-170, -70);
  vertex(-30, -60);
  endShape(CLOSE);
}



