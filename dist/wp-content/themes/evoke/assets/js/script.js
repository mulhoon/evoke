(function($) {
		
    $(document).ready(function() {	

		//Flip EVOKE to INFO every x seconds on MOBILE
		var homeInfoInterval;
		var homeInfoTimer = function(){
			homeInfoInterval = setInterval(function(){
				if($(window).width() < 520) {
					$('.page-title-wrap').addClass('mobile-info-flash');	
					setTimeout(function() {
						$('.page-title-wrap').removeClass('mobile-info-flash');		
					}, 600); 
				}
			}, 5000);
		};
		homeInfoTimer();
				
		//UNIVERSAL MASTER VARZ
		
		var menuOpener = $('.mobile-menu-opener');
		var menuOverlay = $('.main-menu-overlay');
	    
	    //Ajaxify Function

		let ajaxify = new Ajaxify({
			elements: "#content",
			selector : "a:not(.no-ajaxy):not(.no-ajaxy-parent a)",
			aniTime: 0,
			requestDelay : 300,
			bodyClasses : true,
			prefetchoff : true,
			refresh: true,
			forms: false,
			prefetchoff : true,
			inline: true,
			inlinesync: true,
			inlineappend: true,
			pluginon : true,
		});

		setTimeout(function() {
		    //Image Lazyloading
            $(".lazy").myLazyLoad();
            
            //Video Lazyloading
		    videoLazy();
			
			//Add Visible class to Content Wrapper
			$('.content-wrapper').addClass('visible');
        }, 50);
		
		setTimeout(function() {
			
			//Add Visible class to HTML
			$('html').addClass('visible');
						
		}, 350); 
				
		//Homepage Specific
		
	    if($('body').hasClass('page-template-page-home')) {
	        Home();
			HomeOnLoad();
	    }
				
		//Work Project Post Specific
		
		if($('body').hasClass('single-work')) {
			Project();
			ProjectOnLoad();
		}
	            
		//On Page Request Functions

		window.addEventListener('pronto.request', function(event){
			
			var target = event.data.srcElement;
			
			//If homepage is requested, from info page
			if(target == 'https://studioevoke.co.uk/') {
				
				if($('body').hasClass('page-template-page-info')) {
					
					$('html, body').animate({
						scrollTop: 0
					}, {
						duration: 250,
						easing: $.bez([.59, .01, .28, 1])
					});	
					
					setTimeout(function() {
						
						//Remove visible class from content
						$('.content-wrapper').removeClass('visible');
						
						//Add Transitioning Class to Page Title Element
						$('.page-title-wrap').addClass('page-transitioning');
					
					}, 200); 
					
				}
				
			} else {
				
				//Add Transitioning Class to Page Title Element
				$('.page-title-wrap').addClass('page-transitioning');
				
			}
			
			//if Info page is requested
			if(target == 'https://studioevoke.co.uk/info/') {
				
				//Add Info Transitioning Class
				$('.page-title-wrap').addClass('info-transitioning');
				
				//Remove visible class from content
				$('.content-wrapper').removeClass('visible');
				
			} 
		    
		});
		
		//On Beforeload Functions
		
		window.addEventListener('pronto.beforeload', function(event){			    
						
		});
		
		//On Load Functions
		
		window.addEventListener('pronto.load', function(event){			
			
			var target = event.data.srcElement;
			
			//if Info page is requested
			if(target == 'https://397-evoke.cliffstudio.xyz/info/') {
				
				//Remove custom styling from page title wrap
				//$('.page-title-wrap').css('bottom', '');
				
			}
			
		});
		
		//On Render Functions

		window.addEventListener('pronto.render', function(event){
		    		    
		    window.scrollTo(0, 0);			
						
		    //Resize Function
		    Resize();
			    		    		    
		    $('body').attr('id', $('#page-classes').attr('data-id'));

		    setTimeout(function() {

	            //Image Lazyloading
	            $(".lazy").myLazyLoad();
	            
	            //Video Lazyloading
			    videoLazy();
			    
	        }, 50); 

	        setTimeout(function() {
		        
		        //Add Visible class to Content Wrapper
			    $('.content-wrapper').addClass('visible');
				
				//Enable Body Scroll
				bodyScrollLock.enableBodyScroll();
				bodyScrollLock.clearAllBodyScrollLocks();
				
	        }, 200); 
			
			setTimeout(function() {

				//Remove Transitioning Class to Page Title Element
				$('.page-title-wrap').removeClass('page-transitioning');
				
			}, 700); 
			
			//Homepage Specific
			if($('body').hasClass('page-template-page-home')) {
				Home();
				HomeOnRender();
				
				//Clear and restart the HOME to INFO Interval
				clearInterval(homeInfoInterval);
				homeInfoTimer();
				
			}
			
			//Work Project Post Specific
			if($('body').hasClass('single-work')) {
				Project();
				ProjectOnRender();
			}
			
			//Remove Info Transitioning Class
			$('.page-title-wrap').removeClass('info-transitioning');
			     		    
		})

	    //General Scroll Functions
	    
	    var goMobileContact = true;
		var goDesktopProject = true;
		var goMobileProject = true;
	    $(window).on( 'scroll', function() {
						
			//INFO PAGE SPECIFIC
			if($('body').hasClass('page-template-page-info')) {
				
				var bottomOfWindowMarker = ($(document).height() - $(window).height()) - ($(window).height() / 4);
				
	        	if ($(this).scrollTop() > bottomOfWindowMarker && goMobileContact) {
								
	        		$('.mobile-contact-scroller').addClass('hidden');
					
	            	goMobileContact = false;
	            	
	        	} else if ($(this).scrollTop() < bottomOfWindowMarker && !goMobileContact) {
	            	
	        		$('.mobile-contact-scroller').removeClass('hidden');
	            	
	            	goMobileContact = true;
	        	}
			
			}
			
			//PROJECT PAGE SPECIFIC
			if($('body').hasClass('single-work')) {
								
				var readTitleDummy = $('.read-title-dummy'),
					readTitleDummyTop = readTitleDummy.offset().top,
					desktopReadTitle = $('.page-wrap#project-page .project-landing-panel .read-title-wrap').offset().top;
					readTitleDummyBottom = readTitleDummyTop + readTitleDummy.outerHeight(),
					mobileReadMarker = readTitleDummyBottom - $(window).height(),
					backToTopButton = $('.back-to-top');
				
				if($(window).width() < 520) {
					scrollReadMarker = readTitleDummyTop;
				} else {
					scrollReadMarker = desktopReadTitle - 3;
				}
				
				//Scrolling past READ point
				if ($(this).scrollTop() > scrollReadMarker && goDesktopProject) {
					
					backToTopButton.fadeIn('fast');
					
					goDesktopProject = false;
					
				} else if ($(this).scrollTop() < scrollReadMarker && !goDesktopProject) {
					
					backToTopButton.fadeOut('fast');
					
					goDesktopProject = true;
				}
				
				//Mobile Specific – Making the 'READ' title absolutely positioned on scroll past
				if($(window).width() < 520) {
					
					if ($(this).scrollTop() > mobileReadMarker && goMobileProject) {
						
						$('.page-wrap#project-page .project-landing-panel .read-title-wrap').addClass('absolute');		
						
						goMobileProject = false;
						
					} else if ($(this).scrollTop() < mobileReadMarker && !goMobileProject) {
						
						$('.page-wrap#project-page .project-landing-panel .read-title-wrap').removeClass('absolute');	
						
						goMobileProject = true;
					}
				
				}
				
			}
		    
	    });
	    	
	    //Click to open and Close Menu Overlay
	    
	    $(document).on('click', '.page-title-wrap .link', function(e) {
			
			var infoPageLink = $(this).attr('data-link');
			
		    ajaxify.pronto(0, '/info');
		    
	    });	
	    
	    //Click to scroll to bottom of page on INFO
	    
	    $(document).on('click', '.page-wrap#info .mobile-contact-scroller', function(e) {

            $('html, body').animate({
                scrollTop: $(document).height() - $(window).height()
            }, {
                duration: 700,
                easing: $.bez([.59, .01, .28, 1])
            });	
		    
	    });
		
		//When hovering off next project block, return position of text
		
		$(document).on('mouseleave', '.image-carousel-wrap .image-carousel .swiper-slide.next-project-block', function(e) {
			
			$(this).find('.next-text').animate({
				top: "50%",
				left: "50%"
			}, {
				duration: 300,
				easing: $.bez([.59, .01, .28, 1])
			});	
			
		});
		
		//Click to Open READ Content on project page
						
		$(document).on('click', '.read-title-wrap .work-read-opener', function(e) {
			
			var workReadButton = $(this);
			var workReadTitleWrap = workReadButton.parent('.read-title-wrap');
			var workReadPanel = $('.project-read-panel');
			
			if($(window).width() > 520) {
				var workReadScrollMarker = workReadTitleWrap.offset().top;
			} else {
				var workReadScrollMarker = $('.read-title-dummy').offset().top;
			}
			
			//If read Panel is already open
			if(workReadPanel.hasClass('visible')) {
				
				$('html, body').animate({
					scrollTop: workReadScrollMarker
				}, {
					duration: 700,
					easing: $.bez([.59, .01, .28, 1])
				});	
				
			//If read panel isn't open, just run the scrolling animation	
			} else {
							
				workReadPanel.slideDown(200, "easeInOutQuad", function() {
					Resize();
					workReadPanel.addClass('visible');
					
					$('html, body').animate({
						scrollTop: workReadScrollMarker
					}, {
						duration: 700,
						easing: $.bez([.59, .01, .28, 1])
					});	
					
				});
			
			}
		
		});
		
		//Click to Mute / Unmute Videos DESKTOP
						
		$(document).on('click', '.image-carousel-wrap .image-carousel .swiper-slide .volume-toggle', function(e) {
			
			var thisVolumeToggle = $(this),
				thisSwiperSlide = thisVolumeToggle.parent('.swiper-slide'),
				thisVideo = thisSwiperSlide.children('video');
			
			//Mute all other Videos
			$('.image-carousel-wrap .image-carousel .swiper-slide .volume-toggle').not(thisVolumeToggle).each(function () {
				
				var otherVolumeToggles = $(this),
					otherSwiperSlides = otherVolumeToggles.parent('.swiper-slide'),
					otherVideos = otherSwiperSlides.children('video');
				
				otherVideos.prop('muted', true);
				otherVolumeToggles.removeClass('unmuted').addClass('muted');
				
			});
			
			//Mute / Unmute selected video
			if(thisVolumeToggle.hasClass('muted')) {
				
				thisVideo.prop('muted', false);
				
				thisVolumeToggle.removeClass('muted').addClass('unmuted');
				
				e.stopImmediatePropagation();
			} else if(thisVolumeToggle.hasClass('unmuted')) {
				
				thisVideo.prop('muted', true);
				
				thisVolumeToggle.removeClass('unmuted').addClass('muted');
				
				e.stopImmediatePropagation();
			}
			
		});
		
		//Click to Mute / Unmute Videos MOBILE
						
		$(document).on('click', '.mobile-images-wrap .mobile-image-wrap .volume-toggle', function(e) {
			
			var thisVolumeToggle = $(this),
				thisMobileImageWrap = thisVolumeToggle.parent('.mobile-image-wrap'),
				thisVideo = thisMobileImageWrap.children('video');
			
			//Mute all other Videos
			$('.mobile-images-wrap .mobile-image-wrap .volume-toggle').not(thisVolumeToggle).each(function () {
				
				var otherVolumeToggles = $(this),
					otherMobileImageWraps = otherVolumeToggles.parent('.mobile-image-wrap'),
					otherVideos = otherMobileImageWraps.children('video');
				
				otherVideos.prop('muted', true);
				otherVolumeToggles.removeClass('unmuted').addClass('muted');
				
			});
			
			//Mute / Unmute selected video
			if(thisVolumeToggle.hasClass('muted')) {
				
				thisVideo.prop('muted', false);
				
				thisVolumeToggle.removeClass('muted').addClass('unmuted');
				
				e.stopImmediatePropagation();
			} else if(thisVolumeToggle.hasClass('unmuted')) {
				
				thisVideo.prop('muted', true);
				
				thisVolumeToggle.removeClass('unmuted').addClass('muted');
				
				e.stopImmediatePropagation();
			}
			
		});
		
		//Click to Go BACK TO TOP
						
		$(document).on('click', '.back-to-top', function(e) {
		
			$('html, body').animate({
				scrollTop: 0
			}, {
				duration: 700,
				easing: $.bez([.59, .01, .28, 1])
			});	
		
		});
			    	    
    });
    
    //RESIZE FUNCTION

    $(document).ready(function () {
        Resize();
    });
    
    $(window).load(function () {
        Resize();
        
        setTimeout(function() {
			Resize();
        }, 800);
    });

    $(window).resize(function () {
        Resize();
    });

    function Resize() {

        var windowHeight = $(window).height(),
            finalHeight = windowHeight + 'px';        
        var windowWidth = $(window).width(),
        	finalWindowWidth = windowWidth + 'px';
    		
        $('#content').css('width', finalWindowWidth);
        $('.fullscreen').css('height', finalHeight);
        $('.min-fullscreen').css('min-height', finalHeight);
        $('.full-height-margin').css('margin-top', finalHeight);
		
		//Page Title Specific
		var pageTitleWrapHeight = $('.page-title-wrap').outerHeight();
		var readTitleWrapHeight = $('.read-title-wrap').outerHeight();
		
		$('.page-title-dummy').css('height', pageTitleWrapHeight + 'px');
		$('.read-title-dummy').css('height', readTitleWrapHeight + 'px');
		
		$('.page-title-wrap').css('bottom', 'calc(100% - ' + pageTitleWrapHeight + 'px)');
		
		//Image Carousel Sizing Specific
		if ($(".image-carousel-wrap").length) {
			
			var titleSizingHeight = $('.title-sizing-element').outerHeight(),
				imageCarouselHeight = windowHeight - titleSizingHeight;
			
			$(".image-carousel-wrap").css('height', imageCarouselHeight + 'px');
			
			//Swiper Slide Sizing Functions
			$('.image-carousel-wrap .image-carousel .swiper-slide').each(function () {
				
				var imageCarouselSlide = $(this),
					imageCarouselMediaWidth = imageCarouselSlide.children('.swiper-slide-media').width();
				
				imageCarouselSlide.css('width', imageCarouselMediaWidth + 'px');
				
			});
			
			//Next Project Block Sizing
			var nextProjectBlock = $('.image-carousel-wrap .image-carousel .swiper-slide.next-project-block'),
				nextProjectBlockHeight = nextProjectBlock.outerHeight();
			
			nextProjectBlock.css('width', nextProjectBlockHeight + 'px');
			
		}
		
		//Project Page Specific
		if($('body').hasClass('single-work')) {
			var testimonialHeight = $('.page-wrap#project-page .project-read-panel .right-column').outerHeight(),
				testimonialTopAmount = windowHeight - testimonialHeight;
				
			$('.page-wrap#project-page .project-read-panel .right-column').css('top', testimonialTopAmount + 'px');
				
		}
		
    }

    //HOMEPAGE SPECIFIC FUNCTION
    
    function Home() {	
		
		//Image Carousel Swiper JS Function
		var imageCarousel = new Swiper('.image-carousel', {
			// Optional parameters
			slidesPerView: 'auto',
			direction: 'horizontal',
			watchSlidesProgress: true,
			loop: false,
			mousewheel: {
				eventsTarget: '.image-carousel-wrap',
				invert: false,
				releaseOnEdges: true,
				forceToAxis: false,
				sensitivity: 0.2,
				thresholdDelta: 50
			},
			navigation: {
				nextEl: '.swiper-nav.next',
				prevEl: '.swiper-nav.prev',
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 4,
			},
		
		});
		
		//When Slide Changes
		imageCarousel.on('slideChangeTransitionEnd', function () {
			videoLazy();
		});
		
		//When Lazyload Images are ready
		imageCarousel.on('lazyImageReady', function (swiper, slideEl, imageEl) {
			$(slideEl).children('.loading-overlay').fadeOut(300);
		});
		
		//Make arrows follows cursor
		$('.swiper-nav').on('mousemove', function(e){
						
			var swiperNavButton = $(this).offset();
			
			xSwiperNav = event.pageX- swiperNavButton.left;
			ySwiperNav = event.pageY- swiperNavButton.top;
						
			$(this).find('img.arrow').css({
			   left: xSwiperNav + 'px',
			   top: ySwiperNav + 'px'
			});
			
		});
		
		//Make VIEW text follows cursor on 'hover overlays'
		$('.swiper-slide').on('mousemove', function(e){
						
			var hoverOverlay = $(this).offset();
			
			xHover = event.pageX- hoverOverlay.left;
			yHover = event.pageY- hoverOverlay.top;
						
			$(this).find('.view-text').css({
			   left: xHover + 'px',
			   top: yHover + 'px'
			});
			
		});

    }
	
	//HOME – ON LOAD SPECIFIC
	
	function HomeOnLoad() {
		
		setTimeout(function() {
						
			$('.page-loading-overlay').fadeOut(400, "easeInOutQuad", function() {
				$('.page-loading-overlay').remove();	
			});
		
		}, 750); 
				
	}
	
	//HOME – ON RENDER SPECIFIC
	
	function HomeOnRender() {
		
		setTimeout(function() {
			
			$('.page-loading-overlay').fadeOut(400, "easeInOutQuad", function() {
				$('.page-loading-overlay').remove();	
			});
		
		}, 500); 
		
	}
	
	//WORK PROJECT SPECIFIC FUNCTION
	
	function Project() {
		
		//Image Carousel Swiper JS Function
		var imageCarousel = new Swiper('.image-carousel', {
			// Optional parameters
			slidesPerView: 'auto',
			direction: 'horizontal',
			watchSlidesProgress: true,
			loop: false,
			mousewheel: {
				eventsTarget: '.image-carousel-wrap',
				invert: false,
				releaseOnEdges: true,
				forceToAxis: false,
				sensitivity: 0.2,
				thresholdDelta: 50
			},
			navigation: {
				nextEl: '.swiper-nav.next',
				prevEl: '.swiper-nav.prev',
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 4,
			},
		
		});
		
		//When Slide Changes
		imageCarousel.on('slideChangeTransitionEnd', function () {
			videoLazy();
		});
		
		//When Lazyload Images are ready
		imageCarousel.on('lazyImageReady', function (swiper, slideEl, imageEl) {
			setTimeout(function() {
				$(slideEl).find('.loading-overlay').fadeOut(400, "easeInOutQuad");			
			}, 200); 
		});
		
		//Make arrows follows cursor
		$('.swiper-nav').on('mousemove', function(e){
						
			var swiperNavButton = $(this).offset();
			
			xSwiperNav = event.pageX- swiperNavButton.left;
			ySwiperNav = event.pageY- swiperNavButton.top;
						
			$(this).find('img.arrow').css({
			   left: xSwiperNav + 'px',
			   top: ySwiperNav + 'px'
			});
			
		});
		
		//Make NEXT text follows cursor on 'next project' block
		$('.image-carousel-wrap .image-carousel .swiper-slide.next-project-block').on('mousemove', function(e){
						
			var nextProjectBlock = $(this).offset();
			
			xNext = event.pageX- nextProjectBlock.left;
			yNext = event.pageY- nextProjectBlock.top;
						
			$(this).children('.next-text').css({
			   left: xNext + 'px',
			   top: yNext + 'px'
			});
			
		});
		
	}
	
	//PROJECT – ON LOAD SPECIFIC
	
	function ProjectOnLoad() {
		
		setTimeout(function() {
						
			$('.page-loading-overlay').fadeOut(400, "easeInOutQuad", function() {
				$('.page-loading-overlay').remove();	
			});
		
		}, 750); 
		
	}
	
	//PROJECT – ON RENDER SPECIFIC
	
	function ProjectOnRender() {
		
		setTimeout(function() {
			
			$('.page-loading-overlay').fadeOut(400, "easeInOutQuad", function() {
				$('.page-loading-overlay').remove();	
			});
		
		}, 500); 
		
	}

    //OUT OF VIEW FUNCTION

    function outOf() {

        $('.out-of-view').inViewport(
        function() {
            $(this).addClass("am-in-view");
        },
        function() {}
        );

        $('.out-of-opacity').inViewport(
        function() {
            $(this).addClass("in-opacity");
        },
        function() {}
        );
		
    }

    //BLAZY VIDEO LOADING FUNCTION

    function videoLazy() {

        if ($(".b-lazy").length) {
            var bLazy = new Blazy({
                success: function(ele) {
	                Resize();
					$(ele).siblings('.video-placeholder').fadeOut(300);
					$(ele).siblings('.loading-overlay').fadeOut(300);
                }, 
                loadInvisible: true,
            });
        }

    }

    //IMAGE LAZYLOADING

    $.fn.myLazyLoad = function() {
        this.lazyload({
            threshold: 1500,
            delay: 100,
            load: function(elements_left, settings) {
                var thisImg = $(this);

                thisImg.addClass('loaded');
                setTimeout(function() {
                    thisImg.siblings('.loading-overlay').fadeOut(700);
                    thisImg.children('.loading-overlay').fadeOut(700);
                }, 200);
 
            }
        });
    };
    
    $.fn.myLazyFaded = function() {
        this.lazyload({
            threshold: 1500,
            delay: 100,
            effect : "fadeIn", 
			effectspeed: 700,
            load: function(elements_left, settings) {
                var thisImg = $(this);

                thisImg.addClass('loaded');
 
            }
        });
    };

    //Hey there, what you doing here? Nosey parker.

})(jQuery);