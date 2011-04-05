function timer_alert() {
  alert('Hello, User!');
}

/***
	TODO: wprowadzić kierunek i zliczanie czasu w dół

*/

function debug( info ) {
    if (window.console && window.console.log)
      window.console.log('T: ' + info );
};

(function($){
	$.fn.timer = function( new_settings ) {
		return this.each( function() {
			var settings = $.extend( 
				{ 
					visual: false,	  // build inner html
					t_start: 0,
					current: 0,
					t_stop:0,
					t_past:0,
					direction: 1,      // 1 upper, -1 downer 
				},
				new_settings
			) ; 
		
			var $this = $( this ) ;
			var run = false;

			var init = function() {
				debug( 'init id:' + $this.attr('id') + ', class:' + $this.attr('class') );
				if( settings.visual ) {
					$this.append( $( '<span class="view" >timer id: ' + $this.attr('id') + '</span>' ) );
					$this.append( $( '<a href="#" class="start" >start</a>' ) );
					$this.append( $( '<a href="#" class="stop" >stop</a>' ) );
					$this.append( $( '<a href="#" class="pause" >pause</a>' ) );
					$( 'a', $this ).click(function() {
						$this.trigger($(this).attr('class'), [ $(this) ]);
					});
				}
				printTime() ;
			};
			
			

			var start = function() {
				debug('start');
				if( run ) settings.t_past = 0 ;
				settings.t_start = getTime() ;
				run = true;
				refresh();
			};

			var pause = function() {
				debug('pause');
				if( run ) {
					settings.t_past += getTime() - settings.t_start ;
					run = false ;
				} else {
					start();
				}
			}

			var stop = function() {
				debug( 'stop' );
				run = false ;
				reset();
			};

			var reset = function() {
				debug('reset');
				settings.t_past = settings.t_start = settings.t_stop = settings.current = 0 ;
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
				return sprintf("%02d:%02d:%02d.%03d", h, m, s, time);
			};

			var refresh = function() {
				if( run ) {
					settings.current = getTime() ;
					if( settings.visual ) printTime();
					setTimeout( refresh, Math.random( ) * 50 ) ;
				}
			}
			
			var printTime = function() {
				$( '.view',  $this ).html( timeToStr( settings.t_past + settings.current - settings.t_start ) );
			}

			$.each(
				['start', 'stop', 'pause', 'reset'],
				function(i, ev) {
					$this.bind(
						ev,
						{ fn:{ start: start, stop: stop, reset: reset, pause: pause } },
						$.fn.timer.events[ev]
					);
				}
			);
			
			/* ------------------------ public functions ----------------------------------*/
			
			this.getTime = function() {
				return getTime();
			};
			
			this.setSettings = function( new_settings ) {
				$.extend( settings, new_settings ) ;
				printTime( ) ;
			}
			
			$this.data( 'Timer', this ) ;  // Conect object to DOM
			init();
		});
	} ;
	
	$.fn.timer.events = {
		start: function( e ) {
			debug( 'start' ) ;
			e.data.fn.start();
		},
		stop: function( e ) {
			debug( 'stop' );
			e.data.fn.stop();
		},
		pause: function( e ) {
			debug('pause' + e.data.run );
			e.data.fn.pause();
		},
		reset: function( e ) {
			debug('reset');
			e.data.fn.reset();
		}
	} ;

})(jQuery);