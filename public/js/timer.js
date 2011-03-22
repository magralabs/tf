function timer_alert() {
	alert('Hello, User!');
}

var timer = function() {
	var current = 0 ;
	var t_start = 0 ;
	var t_stop = 0 ;
	var run = false;
	
	this.init = function() {
		printTime() ;
		$( "#timer_start" ).click( start ) ;
		$( "#timer_stop" ).click( stop ) ;
    };
    
    var start = function() {
	  t_start = getTime() ;
	  run = true;
	  refresh();
	};
	
	var stop = function() {
	  t_stop = getTime() ;
	  run = false ;
	};

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
		$("#timer").html( timeToStr( current - t_start ) );
	}
	
} ;

