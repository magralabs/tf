function timer_alert() {
	alert('Hello, User!');
}

var timer = function() {
	var current = 0 ;
	var start = 0 ;
	
	this.init = function() {
		var d = new Date() ;
		current = d.getTime() ;
	    $("#timer").html( timeToStr( current ) );
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

    
	
} ;

