function timer_alert() {
  alert('Hello, User!');
}

var timer = function() {
  var current = 0 ;
  var t_start = 0 ;
  var t_stop = 0 ;
  var t_past = 0 ;
  var run = false;

  this.init = function() {
    printTime() ;
    $( "#timer_start" ).click( start ) ;
    $( "#timer_stop" ).click( stop ) ;
    $( "#timer_pause" ).click( pause ) ;
  };

  var start = function() {
    if( run ) t_past = 0 ;
    t_start = getTime() ;
    run = true;
    refresh();
  };

  var pause = function() {
    if( run ) {
      t_past += getTime() - t_start ;
      run = false ;
    } else {
      start();
    }
  }

  var stop = function() {
    run = false ;
    reset();
  };

  var reset = function() {
    t_past = t_start = t_stop = current = 0 ;

  }

  var getTime = function() {
    var d = new Date() ;
    return d.getTime() ;
  };

  var timeToStr = function( time ) {
    var h = parseInt( time / 3600000 ) ; // 1h * 1000 = 3600s * 1000
    time = time - h * 3600000 ;
    var m = parseInt( time  / 60000 ); // 60min * 1000 = 60000ms
    time = time - m * 60000 ;
    var s = parseInt( time / 1000 ) ;
    time = time - s * 1000 ;
    return h + ":" + m + ":" + s + ":" + time ;
  };

  var refresh = function() {
    if( run ) {
      current = getTime() ;
      printTime();
      setTimeout( refresh, Math.random( ) * 50 ) ;
    }
  }

  var printTime = function() {
    $("#timer").html( timeToStr( t_past + current - t_start ) );
  }

} ;
