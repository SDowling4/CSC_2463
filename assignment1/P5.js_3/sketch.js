function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(0);
  noStroke();
  //pack man
  fill(255,255,0);
  arc(170, 200, 300, 300, 35, -35);
 

//ghost
// ghost moddy 
  fill(255,0,0);
  arc(700,200,300, 300, -PI, 0)
  rect(550, 200, 300, 200)
//white eyes
  fill ("white")
  circle(630, 230, 80);
  circle(770, 230, 80);
// blue eyes
  fill(37, 150, 190)
  circle(630, 230, 50);
  circle(770, 230, 50);
  
  

}
