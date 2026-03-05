//Cell list
let cells = [];
let newCells = [];

//Control the vars
let numCells = 5;
let frames = 15;
let RAD = 40;

//Phases images
let set; let pop;
let phase_0;

let phase_1; let phase_2;
let phase_3; let phase_4;
let phase_5; let phase_6;

//Preload the images of the phases
function preload() {
  pop = loadSound("Pop.mp3"); //Sound usage
  phase_0 = loadImage("phases/phase_0.png");
  phase_1 = loadImage("phases/phase_1.png");
  phase_2 = loadImage("phases/phase_2.png");
  phase_3 = loadImage("phases/phase_3.png");
  phase_4 = loadImage("phases/phase_4.png");
  phase_5 = loadImage("phases/phase_5.png");
  phase_6 = loadImage("phases/phase_6.png");
}

//Setup the sketch function
function setup() {
  createCanvas(500, 500);
  set = new setValues();
  set.setupSlider(); //Sliders
  
  //Make the Set class for cell
  set.setMass(numCells);
}

//Global function to get the mouse coordinates
function mousePressed() {
  //Restrain user from overUsage
  //if (cells.length == 200) return;
  for ( let i = 0; i < cells.length; i++ ) {
    
    //Calculate the distance of the mouse to each cell
    let d = dist(mouseX, mouseY, cells[i].x, cells[i].y);
    if ( d < RAD ) { //Begin division if small distance
      for ( let j = 0; j < newCells.length; j++ ) {
        
        //Dont divide twice the once clicked cells
        if ( newCells[j].index == i ) return;
        
      } //Add the new cell for division
      newCells.push(new phases(i)); return;
    }
  }
}

//The endless draw loop
function draw() {
  background(0); //Black
  set.update(); //Update

  //Update the position of each cell in cells
  for ( let i = 0; i < cells.length; i++ ) {
    cells[i].update(); //Change the x and y
    cells[i].display(); //Show the new pos
  }
  
  //Update the position of each cell in newCells
  for ( let j = 0; j < newCells.length; j++ ) {
    newCells[j].display(); //Show the new pos
    newCells[j].update(); //Change the x-y
  }
}