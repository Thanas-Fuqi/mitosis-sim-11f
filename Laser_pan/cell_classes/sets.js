//The class to set the values
function setValues() {
  //Make all sliders of cells
  this.setupSlider = function() {
    //Slider to control the number of cell
    this.massSlider = createSlider(1, 20, 5);
    this.massSlider.position(width+90, height-350);
    
    //Slider to control the size of the cells
    this.sizeSlider = createSlider(10, 100, 40);
    this.sizeSlider.position(width+90, height-222);
    
    //Slider to control the speed of phases
    this.phaseSlider = createSlider(1, 80, 15);
    this.phaseSlider.position(width+90, height-100);
  }
  
  //Set the size of the mass
  this.setMass = function(value) {
    let listSize = cells.length; //Initial
    if ( listSize < value ) {
      //Add new cells if slider value is larger
      for ( let i = 0; i < value - listSize; i++ ) {
        cells.push(new Cell(random(0+RAD, width-RAD), random(0+RAD, height-RAD)));
      }
    } //Remove the extra cells
    else if ( listSize > value ) {  
      cells.splice(0, listSize - value);
    }
  }
  
  //Update the values
  this.update = function() {
    //Change the mass of cells from the slider
    if ( numCells != this.massSlider.value() ) {
      numCells = this.massSlider.value();
      document.getElementById("numN").textContent = numCells;
      this.setMass(numCells);
    }
    
    //Change the size of cells from the slider
    if ( RAD != this.sizeSlider.value() ) {
      RAD = this.sizeSlider.value();
      document.getElementById("sizeN").textContent = RAD;
      
      //Set the size of the cells
      for ( let i = 0; i < cells.length; i++ ) {
        cells[i].w = RAD*2; //Set the width
        cells[i].h = RAD*2; //Set the height
      }
    }
    
    //Change the time-span of each phase of cell
    if ( frames != this.phaseSlider.value() ) {
      frames = this.phaseSlider.value();
      document.getElementById("speedN").textContent = frames;
    }
  }
}