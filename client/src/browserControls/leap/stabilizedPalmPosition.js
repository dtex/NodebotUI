/**
 * fieldset data-device-type="stabilizedPalmPosition"
 * depends on having a leap motion controller
 *
 * A group of one, two or three ranges
 **/
stabilizedPalmPosition: {
   
  /**
   * On frame check to see if there are inputs for each of the three axes
   * If so, move that range input
   **/
  _listen: function(el, browserControl) {
    var board = this;
    this.controller.on('frame', function(frame) {
      if (frame.hands[0] && frame.hands[0].fingers.length >= 3) {
        if (board.gammaInput) {
          boards[board._board][board.gammaInput].move(frame.hands[0].stabilizedPalmPosition[2]);
        }
        if (board.alphaInput) {
          boards[board._board][board.alphaInput].move(frame.hands[0].stabilizedPalmPosition[1]);
        }
        if (board.betaInput) {
          boards[board._board][board.betaInput].move(frame.hands[0].stabilizedPalmPosition[0]);
        }
      }
    });
    
  },
  
  _update: function(alpha, beta, gamma) {
    //todo
  },
  
  /**
   * Bind each of the inputs associated with the browser control with
   * the appropriate axis
   **/
  _initialize: function(el, browserControl) {
    
    this.controller = new Leap.Controller();
    this.controller.connect();
    
    this.controller.on( 'ready' , function(){

      // Ready code will go here

    });
            
    var inputs = document.getElementById(this.id).getElementsByTagName('input');
    
    // Loop through all the inputs within this fieldset
    for (i = 0; i < inputs.length; i++) {
      
      if (inputs[i].hasAttribute('data-axis')) { 
        this[inputs[i].getAttribute('data-axis')+'Input'] = inputs[i].id;
      }
      
    }
    
  }
}