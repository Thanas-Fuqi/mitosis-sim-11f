//The function to crossfade
function crossFade(object, op, a, b) {
  if ( op < 255 ) { //The fade object
    cells[object.index].fade += a;
    object.fade += b;
  }
}

//The new phase make function for the mitosis simulation
function new_phase(object1, object2, main, img) {
  //Set the new image
  object2.img = img;
      
  //Change the fading parameters
  main.opacity = object2.fade;
  object1.fade = 255;
  object2.fade = 0;
  main.fs *= -1;
}

//The phases of mitosis changer
function phases(index) {
  //The original coordinates
  this.x = cells[index].x;
  this.y = cells[index].y;
  
  this.w = RAD*2; //Width
  this.h = RAD*2; //Height
  this.fs = 10; //Fades
  
  //Animation variables
  this.sek = 0; //Frames
  this.fade = 0; //Opacity
  this.opacity = this.fade
  
  //The identifying variables
  this.index = index;
  this.img = phase_1;
  
  //Show the cells at time
  this.display = function() {
    imageMode(CENTER); //Centered images
    tint(255, this.fade); //Fade into the next image
    image(this.img, this.x, this.y, this.w, this.h);
  }
  
  //Update the cells coordinates
  this.update = function() {
    this.x = cells[this.index].x;
    this.y = cells[this.index].y;
    
    //Constrain the coordinates inside the square 
    this.x = constrain(this.x, 0+this.w/2, width-this.w/2);
    this.y = constrain(this.y, 0+this.h/2, height-this.h/2);
    
    //Update the frames based on the parameters
    crossFade(this, this.opacity, -this.fs, this.fs);
    this.sek += 1; //Change the current
    
    //Begin the second phase
    if ( this.sek == frames*1 ) {
      new_phase(this, cells[this.index], this, phase_2)
    } //Begin the third phase
    else if ( this.sek == frames*2 ) {
      new_phase(cells[this.index], this, this, phase_3)
    } //Begin the fourth phase
    else if ( this.sek == frames*3 ) {
      new_phase(this, cells[this.index], this, phase_4)
    } 
    
    //Begin the fifth phase
    else if ( this.sek == frames*4 ) {
      //change the dimensions of both width and height
      this.w += floor((phase_5.width*RAD*2)/139)-this.w; 
      this.h += floor((phase_5.height*RAD*2)/139)-this.h; 
      new_phase(cells[this.index], this, this, phase_5)
    } 
    
    //Begin the sixth phase of mitosis
    else if ( this.sek == frames*5 ) {
      //change the dimensions of both width and height
      cells[this.index].w += floor((phase_6.width*RAD*2)/139)-cells[this.index].w;
      cells[this.index].h += floor((phase_6.width*RAD*2)/139)-cells[this.index].h;
      new_phase(this, cells[this.index], this, phase_6)
    }
    
    //Begin the seventh phase
    else if ( this.sek == frames*6 ) {
      pop.play(0, 1, 0.5, 1); //POP sound effect (ASF)
      //play([startTime], [rate], [amp], [cueStart], [duration])
      
      //Reset the dimensions
      cells[this.index].w = RAD*2;
      cells[this.index].h = RAD*2;
      this.w = RAD*2; this.h = RAD*2;
      
      //Reset the images of both the cells
      new_phase(cells[this.index], this, this, phase_0);
      cells[this.index].img = phase_0; //Image of interphase
      
      //Delete the 'New' and add the object to cells array
      cells.push(new Cell(this.x+RAD, this.y-RAD)); //Up-Right
      const id = newCells.indexOf(this);
      cells[this.index].x -= RAD; //Left
      cells[this.index].y += RAD; //Down
      newCells.splice(id, 1);
    }
  }
}