// here we declare our sound sources using the "players" tone object
// the preload function has been removed so we can have our signal path down below

let sounds = new Tone.Players({
  timer : "assets/timer.mp3",
  alarm : "assets/alarm.mp3",
  bang : "assets/bang.mp3", 
  electric : "assets/electric.mp3"
   });
 
 // here we delcare our effects objects: FeedbackDelay and Distortion
 let delay = new Tone.FeedbackDelay ("15n", 0.5);

 
 // button and slider variables
 let Slider, button1, button2, button3, button4;
 
 

 sounds.connect(delay);
 delay.toDestination();
 
 
 function setup() {
   createCanvas(400, 400);
  
   button1 = createButton('Timer');
   button1.position (85, 200);
   button1.mousePressed (() =>sounds.player ('timer').start());
 
 
   button2 = createButton('Electric');
   button2.position (205, 200);
   button2.mousePressed (() => sounds.player ('electric').start());
 
 
   button3 = createButton('Bang');
   button3.position (205, 100);
   button3.mousePressed (() => sounds.player ('bang').start());
 
 
   button4 = createButton('Alarm');
   button4.position (85, 100);
   button4.mousePressed (() => sounds.player ('alarm').start());
 

 
  Slider = createSlider (0, 1, 0, 0.05);
  Slider.position (115, 300);
  Slider.mouseMoved (() => delay.delayTime.value = Slider.value()); 
 

 }
 
 
 function draw() {
   background(200);
   text ("delay", 115, 285);

 }