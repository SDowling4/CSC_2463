
let synth = new Tone.MetalSynth(Tone.Synth);
let filter = new Tone.Filter (100, "bandpass"); 
let pitchs = new Tone.PitchShift();
let delay = new Tone.FeedbackDelay ("15n", 0.5);
let distortionEX = new Tone.Distortion (0.5); 
let v = -60;
pitchs.pitch = v;
synth.type = 'sawtooth'
delay.delayTime.value = 0.6;


function preload(){
  img = loadImage ('assets/gong.jpg')
}

function setup() {
  createCanvas(800, 800); 
  background (120);
}

function draw() {
  if (mouseIsPressed ===true){
    background(img);
  } else if (mouseIsPressed === false){
  
    text ('press mouse for sound and picture', 310,200);
  }
}




synth.connect(pitchs);
pitchs.connect(delay);
delay.connect(filter);
filter.connect(distortionEX)
distortionEX.toDestination();

function mousePressed() { 
  synth.triggerAttack("C4");
}


