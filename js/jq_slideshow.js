
(function($){

	var methods = {
		init : function( options ) {
			var defaults = {
				numSlides : 0,
				width: '100%',
				height: 'auto',
				autoplay: 'false',
				time : 5000,
				fade : 500,
				numbers: 'true',
				prevNext: 'true'
			}
			var options =  $.extend(defaults, options);

			options.numSlides = this.find('.jq_slide').size();

			if ( isCP ) {
				//If content page, replace bkgd of pikOuter and show admin message
				
				var ranSlide = Math.floor( Math.random() * options.numSlides );
				
				var myImg = this.find('.jq_slide').eq(ranSlide).find('img').attr('src');
				
				$('#pikOuter').css({
					'background-image': 'url(' + myImg + ')'
				});
				
				//set height and width of slideshow
				this.find('.jq_slide').css({
					'display':'none'
				});
				
			} else {
				//If home, have full rotator
				var ranSlide = Math.floor( Math.random() * options.numSlides );
				
				var activeSlide = this.find('.jq_slide').eq(ranSlide);
				var beforeImg = activeSlide.find('.jq_before img').attr('src');
				var afterImg = activeSlide.find('.jq_after img').attr('src');
				
				activeSlide.find('.jq_before').css({
					'background-image': 'url(' + beforeImg + ')'
				}).find('img').hide();
				
				activeSlide.find('.jq_after').css({
					'background-image': 'url(' + afterImg + ')'
				}).find('img').hide();
				
				
				
				//hide all but the first image and content
				this.find('.jq_slide').css({
					  'visibility': 'visible',
					  'position': 'relative',
					  'top': '0px',
					  'left': '0px',
					  'width': options.width,
					  'height': options.height
				}).hide().eq(ranSlide).show().addClass('active');
				
			}

			var myDiv = this;

			if( options.autoplay == 'true' ) {
				var timer = window.setInterval(function() { slideNext(myDiv, options) }, options.time);
			}

			if ( options.numbers == 'true' ) {
				//For each slide, add a number link. Append new nav to slideshow
				var navInner = "";
				for ( i=0; i < options.numSlides; i++) {
					navInner += '<a href="#">' + (i + 1) + '</a>';
				}
				this.append('<div id="jq_nav">' + navInner + '</div>');

				//Set first nav link to active
				this.find('#jq_nav a:eq(ranSlide)').addClass('active');

				this.find('#jq_nav a').click(function(event) {
					//find which slide is currently active
					var currIndex = myDiv.find('#jq_nav a').index(myDiv.find('#jq_nav a.active'));
					var nextIndex =  myDiv.find('#jq_nav a').index($(event.target));
					
					if  (currIndex != nextIndex) {
						fadeImg(currIndex, nextIndex, myDiv, options);
					}
					return false;
				});
			}

			if ( options.prevNext == "true" ) {
				this.append('<div id="jq_prevNext"><a href="#" class="jq_prev"><span class="jq_btntext">Previous</span></a><a href="#" class="jq_next"><span class="jq_btntext">Next</span></a></div>');

				this.find('#jq_prevNext a.jq_prev').click(function(event) {
					slidePrev(myDiv, options);

					return false;
				});


				this.find('#jq_prevNext a.jq_next').click(function(event) {
					slideNext(myDiv, options);

					return false;
				});
			}


			var slideNext = function(myObj,options) {
				//find which slide is currently active
				var currIndex = myObj.find('.jq_slide').index(myObj.find('.active'));
				var nextIndex;
				if ( currIndex < options.numSlides-1 ) {
					// if the current slide is less than the total number of slides, advance 1
					nextIndex = currIndex + 1;
				} else {
					// if the current slide is the last image, start at the beginning
					nextIndex = 0;
				}

				fadeImg(currIndex, nextIndex, myObj, options);
			};
			var slidePrev = function(myObj,options) {
				//find which slide is currently active
				var currIndex = myObj.find('.jq_slide').index(myObj.find('.active'));
				var nextIndex;
				if ( currIndex > 0 ) {
					// if the current slide is not the first slide, go back 1
					nextIndex = currIndex - 1;
				} else {
					// if the current slide is the first image, go to last image
					nextIndex = options.numSlides-1;
				}

				fadeImg(currIndex, nextIndex, myObj, options);
			};
			var fadeImg = function(currIndex, nextIndex, myObj, options) {
				if ( options.autoplay == 'true' ) {
					clearInterval(timer);
					timer = window.setInterval(function() { slideNext(myObj, options) }, options.time);
				}


				//fade in new slide
				myObj.find('.jq_slide:eq(' + nextIndex + ')').fadeIn(options.fade).addClass('active');
				myObj.find('#jq_nav a:eq(' + nextIndex + ')').addClass('active');
				
				//fade out current slide
				myObj.find('.jq_slide:eq(' + currIndex + ')').fadeOut(options.fade).removeClass('active');
				myObj.find('#jq_nav a:eq(' + currIndex + ')').removeClass('active');
			};

		}
	};
	$.fn.initSlideshow = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};


})(jQuery);


jQuery.fn.extend({
	disableSelection : function() {
			return this.each(function() {
					this.onselectstart = function() { return false; };
					this.unselectable = "on";
					jQuery(this).css('user-select', 'none');
					jQuery(this).css('-o-user-select', 'none');
					jQuery(this).css('-moz-user-select', 'none');
					jQuery(this).css('-khtml-user-select', 'none');
					jQuery(this).css('-webkit-user-select', 'none');
			});
	}
});