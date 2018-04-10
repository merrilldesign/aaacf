
var ele = document.getElementById("dnn_dnnLOGIN_loginLink");
if (ele) {
  var strHREF = ele.innerHTML;
  if (strHREF=="Logout"){
	document.getElementById("loginlinks").style.display = "";
		
	// removes image resizing in backend to fix DNN styles
	var fixImages = [ $('#dnn_ControlPanel img'), $('img.rpImage'), $('.dnnActionMenu img'), 
						$('.ModLiveTabsC div > img'), $('.ModLiveAccordionC div > img') ];
	
	$.each( fixImages, function( index, value ) {
		this.css({
			'width': 'auto',
			'max-width': '100%'
		});
	});
	
	// Adds some space to the top of the site when logged in so that the Control bar doesn't cover admin links
	$('#fixedOuter').css({
		'margin-top': '53px'
	});
	$('#wrapper').css({
		'margin-top': '53px'
	});
	$('#engageOuter .calloutBoxes').css({
		'position': 'relative',
		'z-index': 'inherit'
	}).find('.callCol').css({
		'margin-bottom': '3em',
		'height': 'auto'
	});
  }else{
	document.getElementById("loginlinks").style.display = "none";
  }

} 





$(function () {

	$("table.table").rtResponsiveTables();
	
	if ( $('#wrapper').attr('class').indexOf('home') > -1 ) {
		
		var btmImg = $('.home #btmImage').find('img').attr('src');
		$('.home #btmImage img').hide();
		$('.home #btmImage').parallax({imageSrc: btmImg});
		
		var homeImg = $('.home #engageOuter .pikpane').find('img').attr('src');
		
		$('.home #engageOuter .pikpane').css({
			'background-image': 'url(' + homeImg + ')'
		}).find('img').css({
			'display':'none'
		});

		$('#wrapper .homeList').each(function(index, element) {
			var myMonth = $( this ).find('.month').text(); 
			myMonth = myMonth.slice(0,3);
			$( this ).find('.month').text( myMonth );
		});
	}
	
	function markNestedLists(par, level){
		par.addClass("level-" + level);
	
		par.children("li").children("ul").each(function(){
			markNestedLists($(this), level + 1);
		});     
	}
	markNestedLists($("#fsMap ul").first(), 1);
	
	
	
	listingHeight = function(container){

		var currentTallest = 0,
			 currentRowStart = 0,
			 rowDivs = new Array(),
			 $el,
			 topPosition = 0;
		 $(container).each(function() {
		
		   $el = $(this);
		   $($el).height('auto')
		   topPostion = $el.position().top;
		
		   if (currentRowStart != topPostion) {
			 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			   rowDivs[currentDiv].height(currentTallest);
			 }
			 rowDivs.length = 0; // empty the array
			 currentRowStart = topPostion;
			 currentTallest = $el.height();
			 rowDivs.push($el);
		   } else {
			 rowDivs.push($el);
			 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		  }
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			 rowDivs[currentDiv].height(currentTallest);
		   }
		 });
	}

$(window).load(function() {
	var width = $(window).width();
	
	if (width >= 920 && $("#dnn_dnnLOGIN_loginLink").html() != "Logout") {
		
	} else {
		
	}
	

});

$(window).resize(function(){
	var width = $(window).width();
	
	if (width >= 920 && $("#dnn_dnnLOGIN_loginLink").html() != "Logout") {
		
	} else {
		
	}
	
	
	/* Fix ipad orientation bug on engagement */
	var ua = navigator.userAgent,
    isIpad = (ua.match(/iPad/i)) ? true : false;
	
	if(isIpad) {
		$('.jq_slide').css({'width': width});
		
		
		var viewport = $("head meta[name=viewport]");
		viewport.attr('content', 'width=device-width, initial-scale=1');
	}
	
});

	
});



// Find all YouTube videos
var $allVideos = $("iframe[src^='//www.youtube.com']"),

    // The element that is fluid width
    $fluidEl = $("#content");

// Figure out and save aspect ratio for each video
$allVideos.each(function() {

  $(this)
    .data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');

});

// When the window is resized
$(window).resize(function() {

  var newWidth = $fluidEl.width();

  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {

    var $el = $(this);
    $el
      .width(newWidth)
      .height(newWidth * $el.data('aspectRatio'));

  });

// Kick off one resize to fix all videos on page load
}).resize();

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this); 