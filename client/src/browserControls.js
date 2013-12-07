/**
   * These are browser controls.
   * Browser controls are inputs or groups of inputs working in concert
   *
   * _listen - A function that binds necessary event listeners to the <input> elements
   */
  var browserControls = {
    
    /**
     * fieldset data-device-type="orientation"
     *
     * A group of two or three ranges
     **/
    Orientation: {
       
      /**
       * On deviceorientation check to see if there are inputs for each of the three axes
       * If so, move that range input
       **/
      _listen: function(el, browserControl) {
        window.addEventListener('deviceorientation', function(event) {
          _each(['alpha', 'beta', 'gamma'], function (prefix) {
            if (this[prefix+'Input']) {
              boards[this._board][this[prefix+'Input']].move(event[prefix]);
            }
          }, browserControl);          
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
        var inputs = document.getElementById(this.id).getElementsByTagName('input');
        
        // Loop through all the inputs within this fieldset
        for (i = 0; i < inputs.length; i++) {
          
          if (inputs[i].hasAttribute('data-axis')) { 
            this[inputs[i].getAttribute('data-axis')+'Input'] = inputs[i].id;
          }
          
        }
        
      }
    },
    
    /**
     * fieldset data-device-type="palmOrientation"
     * depends on having a leap motion controller
     *
     * A group of two or three ranges
     **/
    palmOrientation: {
       
      /**
       * On frame check to see if there are inputs for each of the three axes
       * If so, move that range input
       **/
      _listen: function(el, browserControl) {
        var board = this;
        this.controller.on('frame', function(frame) {
          if (frame.hands[0]) {
            if (board.gammaInput) {
              boards[board._board][board.gammaInput].move(frame.hands[0].palmNormal[0]);
            }
            if (board.alphaInput) {
              console.log(frame.hands[0].palmNormal[1]);
              boards[board._board][board.alphaInput].move(frame.hands[0].palmNormal[1]);
            }
            if (board.betaInput) {
              boards[board._board][board.betaInput].move(frame.hands[0].palmNormal[2]);
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
  };