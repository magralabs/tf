function timer_alert() {
  alert('Hello, User!');
}

/***
	TODO: 
	 -- wprowadzić kierunek i zliczanie czasu w dół
	 -- wprowadzic callback po osiagnieciu pewnego pulapu ( tablica callbackow)
	 -- callback co zadany interval onTime( 1000, function() {} )
*/

function debug( info ) {
    if (window.console && window.console.log)
      window.console.log('T: ' + info );
};

(function($){
	$.fn.timer = function( new_settings ) {
		return this.each( function() {
		  var UP = 1;
		  var DOWN = -1;
		  
		  var RUNNING = 0;
		  var STOPPED = 1;
		  var PAUSED = 2;
		  
			var settings = $.extend({ 
  			visual: false,	  // build inner html
				current: 0,
				direction: UP,      // 1 upper, -1 downer,
				interval: 0
			}, new_settings) ;
			
			var callbacks = $.extend({
			  start: function() {},
			  stop: function() {},
			  pause: function() {},
			  interval: function() {}
		  }, new_settings.callbacks); 
		
			var $this = $( this ) ;
			var elapsed = settings.current;
			var last = 0;
			var state = STOPPED;

      this.start = function() {
				debug('start');
				if (state == STOPPED)
				  this.reset();
				state = RUNNING;
				last = 0 ;
				callbacks.start();
				refresh();
				if (settings.interval > 0)
				  interval();
			};

			this.pause = function() {
				debug('pause');
				if( state == RUNNING ) {
					state = PAUSED ;
				} else if (state == PAUSED) {
					this.start();
				}
			}

			this.stop = function() {
				debug( 'stop' );
				state = STOPPED;
			};

			this.reset = function() {
				debug('reset');
				elapsed = settings.current ;
			}
			
			this.toggleDirection = function( elem ) {
			  if (settings.direction == UP) {
			    settings.direction = DOWN;
  			  $(elem).html('v');
			  } else {
			    settings.direction = UP;
  			  $(elem).html('^');
			  }
			}
			
			var getTime = function() {
				var d = new Date() ;
				return d.getTime() ;
			}

			

			var timeToStr = function( time ) {
				var h = parseInt( time / 3600000 ) ; // 1h * 1000 = 3600s * 1000
				time = time - h * 3600000 ;
				var m = parseInt( time  / 60000 ); // 60min * 1000 = 60000ms
				time = time - m * 60000 ;
				var s = parseInt( time / 1000 ) ;
				time = time - s * 1000 ;
				return (time < 0 ? "-" : "") + sprintf("%02d:%02d:%02d.%03d", 
  				Math.abs(h), Math.abs(m), Math.abs(s), Math.abs(time));
			};

			var refresh = function() {
		    if (state == RUNNING) {
				  var t = getTime();
				  if (last != 0) {
            elapsed = elapsed + settings.direction * (t - last);
					}
					last = t;
					
					setTimeout( refresh, Math.random( ) * 50 ) ;
				}
				
        if( settings.visual ) printTime();
  		}
			
			var interval = function() {
			  if ( state == RUNNING ) {
			    callbacks.interval($this.data('Timer'));
					setTimeout( interval, settings.interval ) ;
				}
			}
			
			var printTime = function() {
				$( '.view',  $this ).html( timeToStr( elapsed ) );
			}
			
			/* ------------------------ public functions ----------------------------------*/
			
			this.getTime = function() {
				return getTime();
			};
			
			this.setSettings = function( new_settings ) {
				$.extend( settings, new_settings ) ;
				this.reset();
				printTime( ) ;
			}
			
			this.getElapsed = function() {
			  return elapsed;
			}
			
			$this.data( 'Timer', this ) ;  // Conect object to DOM
			
			var init = function() {
				debug( 'init id:' + $this.attr('id') + ', class:' + $this.attr('class') );
				if( settings.visual ) {
					$this.append( $( '<span class="view" >timer id: ' + $this.attr('id') + '</span>' ) );
					$this.append( $( '<a href="#" class="start" >start</a>' ) );
					$this.append( $( '<a href="#" class="stop" >stop</a>' ) );
					$this.append( $( '<a href="#" class="pause" >pause</a>' ) );
					$( 'a', $this ).click(function() {
             switch( $(this).attr('class') ) {
               case 'start': $this.data('Timer').start(); break;
               case 'stop': $this.data('Timer').stop(); break;
               case 'pause': $this.data('Timer').pause(); break;
             }
					});
				}
				printTime() ;
			};
			
			init();
			
		});
	} ;
	
})(jQuery);