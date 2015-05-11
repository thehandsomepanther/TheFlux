/**
	Bootstrap Project Template
	Designed and built by Zach Wise at VéritéCo
*/  

/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */


// BOOTSTRAP
	// @codekit-prepend "Library/bootstrap/transition.js";
	// @codekit-prepend "Library/bootstrap/scrollspy.js";
	// @codekit-prepend "Library/bootstrap/tab.js";
	// @codekit-prepend "Library/bootstrap/tooltip.js";
	// @codekit-prepend "Library/bootstrap/carousel.js";
	// @codekit-prepend "Library/bootstrap/collapse.js";
	// @codekit-prepend "Library/bootstrap/modal.js";
	// @codekit-prepend "Library/bootstrap/dropdown.js";
	// @codekit-prepend "Library/bootstrap/affix.js";

// JQUERY PLUGINS
	// @codekit-prepend "Library/jquery.smooth-scroll.js";
	// @codekit-prepend "Library/jquery.easing.1.3.js";
	// @codekit-prepend "Library/jquery.waypoints.js";
	// @codekit-prepend "Library/jquery.fluidbox.js"; 
	// @codekit-prepend "Library/jquery.laziestloader.js";




$(document).ready(function(){
	
	var _speed = 500,
		_story_nav_active = false,
		_has_story_cover = false,
		_story_cover_height = 100,
		_path = "../",
		_is_index = false;
		

	/*	Smooth Scroll
	================================================== */
	$('a').smoothScroll({
		offset: -290
	});
	
	/*	LAZY LOAD AND ZOOMABLE IMAGES
	================================================== */
	// Find Images and make them zoomable
	function makeImagesZoomable() {
		
		/*	Laziest Loader
		================================================== */
		$("img").laziestloader();
	 
		$('img').load(function() {
			this.style.opacity = 1;
		});
		
		$( "figure" ).each(function(figure) {
			
			if ($(this).find( "a img" ).length ) {
				
			} else {
				var img_url,
					el_link = createEl("a", "enlarge"),
					el_img = $(this).find("img");
					
					
				img_url = $(this).find("img").attr("data-src");

				if (img_url == undefined) {
					img_url = $(this).find("img").attr("src");
				}
				
				$( el_img ).detach();
				
				$(el_link).attr("href", img_url);
				$(el_link).append(el_img);
				$(this).prepend(el_link);
				

			}
		});
		
		$('.enlarge').fluidbox({
		 	viewportFill:0.8,
			stackIndex: 1040
		})
		.on('openstart', fluidboxOpen)
		.on('closestart', fluidboxClose);

		
	}
	
	/*	Fluidbox Events
	================================================== */
	function fluidboxOpen() {
		trace("open");
		navbarToggle(false);
	};
	
	function fluidboxClose() {
		trace("close");
		navbarToggle(true);
	};
	
	function navbarToggle(show) {
		var animate_props = {
			
		}
		if (show) {
			animate_props.opacity = "1";
			animate_props.marginTop = "0";
		} else {
			animate_props.opacity = "1";
			animate_props.marginTop = "-150px";
		}
		
		$("#navbar").animate(animate_props, _speed/2, "easeInOutCubic", function() {
			
		});
	};
	
	/*	STORY COVER
	================================================== */
	if ($('#story-cover').length ) {
		_has_story_cover = true;
		
		_story_cover_height = window.innerHeight;
		
		$('#story-cover').height(_story_cover_height);
		
		$( window ).resize(function() {
			_story_cover_height = window.innerHeight;
			$('#story-cover').height(_story_cover_height);
		});

		
		$('article').waypoint({
			handler: function(direction) {
			
				if (direction === "up") {
					$('.story-cover-content').css("opacity", "1");
					navbarChange(false);
				}
				if (direction === "down") {
					$('.story-cover-content').css("opacity", "0");
					navbarChange(true);
				}
			 
			},
			offset:200
		});
		
		$('.story-cover-arrow').click(function() {
			$.smoothScroll({
				scrollElement: $('body'),
				scrollTarget: 'article'
			});
		});
		
	} else {
		
		$('#navbar-product').addClass('no-cover');
		
		$('article').waypoint({
			handler: function(direction) {
			
				if (direction == "down") {
					$('#navbar').addClass('in-article');
				} else if (direction == "up") {
					$('#navbar').removeClass('in-article');
				}
			 
			},
			offset:-2
		});
		
	}
	
	makeImagesZoomable();
	
	function navbarChange(in_article) {
		var animate_props = {
			
		}
		if (in_article) {
			animate_props.opacity = "0";
			animate_props.marginTop = "0";
		} else {
			animate_props.opacity = "1";
			animate_props.marginTop = "-56px";
		}
		
		$("#navbar").animate(animate_props, _speed/2, "easeInOutCubic", function() {
			
			if (in_article) {
				$('#product-navbar-collapse').css('opacity', '1');
				//$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
				$('#navbar').addClass('in-article');
				$('#navbar').css('marginTop', '-56px');
				$("#navbar").animate({
					marginTop:"0px",
					opacity:"1"
				}, _speed, "easeInOutCubic");
			} else {
				if (_is_index) {
					$('#product-navbar-collapse').css('opacity', '0');
				} else {
					$('#product-navbar-collapse').css('opacity', '1');
				}
				//$('img.knightlab-logo').attr('src', '../css/kngihtlab-logo-NOtagline.png');
				//$('.knightlab-logo img').attr('src', '../css/knightlab-logo-diamond-190.png');
				$('#navbar').removeClass('in-article');
				$('#navbar').css('opacity', '0');
				$('#navbar').css('marginTop', '0');
				$("#navbar").animate({
					opacity:"1"
				}, _speed*2, "easeInOutCubic");
			}
			

  
		});
		
	}
	
});

/* Trace (console.log)
================================================== */
trace = function( msg ) {
	if (window.console) {
		console.log(msg);
	} else if ( typeof( jsTrace ) != 'undefined' ) {
		jsTrace.send( msg );
	} else {
		//alert(msg);
	}
};

/* Create Element
================================================== */
createEl = function(tagName, className) {
	var el = document.createElement(tagName);
	el.className = className;
	return el;
} ;

/* Google Analytics
================================================== */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-537357-22', 'auto');
ga('send', 'pageview');