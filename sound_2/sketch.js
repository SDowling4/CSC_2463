let synth = new Tone.MetalSynth(Tone.Synth);
let bend = new Tone.PitchShift();
let delay = new Tone.FeedbackDelay ("15n", 0.5);
let distortionEX = new Tone.Distortion (0.5); 
let v = 0;
let display = 0;
let symbol = ""
bend.pitch = 0;
synth.connect(bend);
bend.connect(delay)
delay.connect(distortionEX)
distortionEX.toDestination();

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5'
}

function setup() {
  createCanvas(400, 400);

  DelaySlider = createSlider (0, 1, 0, 0.05);
  DelaySlider.position (120, 200);
  DelaySlider.mouseMoved (() => delay.delayTime.value = DelaySlider.value()); 

  DistortionSlider = createSlider (0, 1, 0, 0.05);
  DistortionSlider.position (120, 240);
  DistortionSlider.mouseMoved (() => distortionEX.distortion = DistortionSlider.value()); 

}

function keyPressed(){

  if (keyCode === LEFT_ARROW) {
    v = v-12;
    bend.pitch = v;

  } else if (keyCode === RIGHT_ARROW) {
    v = v+12;
    bend.pitch = v;
  }
  if (v == 0) {
    display = 0;

  } else {
    display = v/12;
  }
  if (display > 0 && display != 0) {
    symbol = '+';
  }
  else {
    symbol = ' ';
  }
  

  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased(){
  let playNotes = notes[key];
  synth.triggerRelease(playNotes,'+0.03');
}


function draw() {
  background(150);
  text ('pressing keys a- k will make a sound', 70, 20)
  text ("(a = C4),(s = D4),(d = E4),(f = F4),(g = G4),(h = A4),(j = B4),(k = C5)", 20, 40)
  text ("Left arrow to lower octave and Right arrow to raise octave.\n                     your current octave is an octave of :" + symbol+ display, 20, 80)
  text ("Distortion Slider", 120, 230)
  text ("Delay Slider", 120, 190)
}