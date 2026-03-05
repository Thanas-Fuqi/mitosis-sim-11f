//Cell class to move and show the cells
function Cell(x, y) {
  //Coordinates
  this.x = x;
  this.y = y;
  
  this.w = RAD*2; //Width
  this.h = RAD*2; //Heighy
  
  //The identifying variables
  this.fade = 255;
  this.img = phase_0
  
  //Set the step random value
  this.xOff = random(0, 1000);
  this.yOff = random(0, 1000);
  
  //Show the commponents of the code
  this.display = function() {
    tint(255, this.fade); //Fading
    imageMode(CENTER); //Centered images
    image(this.img, this.x, this.y, this.w, this.h);
  }
  
  //Update the cells coordinates
  this.update = function() {
    //Set the new x and y of the map of noise
    this.x += map(noise(this.xOff), 0, 1, -2, 2);
    this.y += map(noise(this.yOff), 0, 1, -2, 2);

    //Constrain the coordinates inside the square 
    this.x = constrain(this.x, 0+this.w/2, width-this.w/2);
    this.y = constrain(this.y, 0+this.h/2, height-this.h/2);

    //Make the new step to get from noise
    this.xOff += 0.01;
    this.yOff += 0.01;
  }
}