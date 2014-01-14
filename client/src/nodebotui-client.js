// @include warning.txt

var nodebotui = (function () {

  var socket, boards, easing = {};
  
  // @include Board.js  
  // @include BrowserControl.js  
  // @include deviceTypes.js  
  // @include deviceMethods.js  
  // @include inputTypes.js  
  
  /**
   * These are browser controls.
   * Browser controls are inputs or groups of inputs working in concert
   *
   * _listen - A function that binds necessary event listeners to the <input> elements
   */
  var browserControls = {
    
    // @include folder BrowserControls
    
  };
   
  /**
   * Loop through the forms in the web page. For each one that has a 
   * data-device-type attribute set to "board" we are defining a
   * a new board to pass to Johnny-Five
   */
  function _getBoards() {
    
    var boards = {}, forms = document.getElementsByTagName ('form'), i;
    
    for (i = 0; i < forms.length; i++) {
      if (forms[i].getAttribute('data-device-type') === 'board') {
        boards[forms[i].id] = new Board(forms[i].attributes);
      }
    }
    
    return boards;
  }
  
  /**
   * This next part loads the socket.io client script asynchronously
   * and then fires our _getBoards function
   **/
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;

  script.onload = function(){
      
      socket = io.connect();
    
      socket.on('connect', function () {
        // tell the server to initialize our new boards
        console.log('connect');
        _each(boards, function( board, key) {
          socket.emit('new board', board );
        });
      });
      
      // This is where we listen for events from the server
      socket.on('board ready', function( opts ) {
        console.log('board ready');
        boards[opts.id]._ready = true;
        boards[opts.id].initialize();
      });
      
  };

  // Insert script element for socket.io
  script.src = 'socket.io/socket.io.js';
  document.getElementsByTagName('head')[0].appendChild(script);
  
  //Initialize boards
  boards =  _getBoards();

  // assign our boards object to nodebotui global
  return boards;
  
  // @include underscoreFunctions.js
  // @include easing.js
   
})();