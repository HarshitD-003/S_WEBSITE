jQuery(document).ready(function($){
	var itemInfoWrapper = $('.cd-single-item');
	
	itemInfoWrapper.each(function(){
		var container = $(this),
			// create slider pagination
			sliderPagination = createSliderPagination(container);
		
		//update slider navigation visibility
		updateNavigation(container, container.find('.cd-slider li').eq(0));

		container.find('.cd-slider').on('click', function(event){
			//enlarge slider images 
			if( !container.hasClass('cd-slider-active') && $(event.target).is('.cd-slider')) {
				itemInfoWrapper.removeClass('cd-slider-active');
				container.addClass('cd-slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body,html').animate({'scrollTop':container.offset().top}, 200);
				});
			}
		});

		container.find('.cd-close').on('click', function(){
			//shrink slider images 
			container.removeClass('cd-slider-active');
		});

		//update visible slide
		container.find('.cd-next').on('click', function(){
			nextSlide(container, sliderPagination);
		});

		container.find('.cd-prev').on('click', function(){
			prevSlide(container, sliderPagination);
		});

		container.find('.cd-slider').on('swipeleft', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':last-child') && bool) {nextSlide(container, sliderPagination);}
		});

		container.find('.cd-slider').on('swiperight', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':first-child') && bool) {prevSlide(container, sliderPagination);}
		});

		sliderPagination.on('click', function(){
			var selectedDot = $(this);
			if(!selectedDot.hasClass('selected')) {
				var selectedPosition = selectedDot.index(),
					activePosition = container.find('.cd-slider .selected').index();
				if( activePosition < selectedPosition) {
					nextSlide(container, sliderPagination, selectedPosition);
				} else {
					prevSlide(container, sliderPagination, selectedPosition);
				}
			}
		});
	});	
		
	//keyboard slider navigation
	$(document).keyup(function(event){
		if(event.which=='37' && $('.cd-slider-active').length > 0 && !$('.cd-slider-active .cd-slider .selected').is(':first-child')) {
			prevSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
		} else if( event.which=='39' && $('.cd-slider-active').length && !$('.cd-slider-active .cd-slider .selected').is(':last-child')) {
			nextSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
		} else if(event.which=='27') {
			itemInfoWrapper.removeClass('cd-slider-active');
		}
	});

	function createSliderPagination($container){
		var wrapper = $('<ul class="cd-slider-pagination"></ul>').insertAfter($container.find('.cd-slider-navigation'));
		$container.find('.cd-slider li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			dot.text(index+1);
		});
		return wrapper.children('li');
	}

	function nextSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.cd-slider .selected'),
			navigationDot = $container.find('.cd-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() + 1;
		visibleSlide.removeClass('selected');
		$container.find('.cd-slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
		navigationDot.removeClass('selected')
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.cd-slider li').eq($n));
	}

	function prevSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.cd-slider .selected'),
			navigationDot = $container.find('.cd-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() - 1;
		visibleSlide.removeClass('selected')
		$container.find('.cd-slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
		navigationDot.removeClass('selected');
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.cd-slider li').eq($n));
	}

	function updateNavigation($container, $active) {
		$container.find('.cd-prev').toggleClass('inactive', $active.is(':first-child'));
		$container.find('.cd-next').toggleClass('inactive', $active.is(':last-child'));
	}

	function enableSwipe($container) {
		var mq = window.getComputedStyle(document.querySelector('.cd-slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
		return ( mq=='mobile' || $container.hasClass('cd-slider-active'));
	}
});

"use strict";
$(document).ready(function() {

  var rows = 4; //change this also in css
  var cols = 6; //change this also in css
  var staggerTime = 150;

  var urls = [
    "../sankalpimg/agamswarupy21.jpg",
    "https://kiyutink.github.io/nyc/nyc2.jpg",
    "https://kiyutink.github.io/nyc/nyc3.jpg",
    "https://kiyutink.github.io/nyc/nyc4.jpg",
    "https://kiyutink.github.io/nyc/nyc5.jpg",
    "https://kiyutink.github.io/london/london1.jpg",
    "https://kiyutink.github.io/london/london2.jpg",
    "https://kiyutink.github.io/london/london3.jpg",
    "https://kiyutink.github.io/madrid/madrid1.jpg",
    "https://kiyutink.github.io/madrid/madrid2.jpg",
    "https://kiyutink.github.io/madrid/madrid3.jpg",
    "https://kiyutink.github.io/beijing/beijing1.jpg",
    "https://kiyutink.github.io/beijing/beijing2.jpg",
    "https://kiyutink.github.io/beijing/beijing3.jpg",
    "https://kiyutink.github.io/moscow/moscow1.jpg",
    "https://kiyutink.github.io/moscow/moscow2.jpg",
    "https://kiyutink.github.io/moscow/moscow3.jpg",
    "https://kiyutink.github.io/sidney/sidney1.jpg",
    "https://kiyutink.github.io/sidney/sidney2.jpg",
    "https://kiyutink.github.io/sidney/sidney3.jpg",
    "https://kiyutink.github.io/tokyo/tokyo1.jpg",
    "https://kiyutink.github.io/tokyo/tokyo2.jpg",
    "https://kiyutink.github.io/tokyo/tokyo3.jpg",
    "https://kiyutink.github.io/la/la3.jpg"
  ];

  var $gallery = $(".demo__gallery");
  var $help = $(".demo__help");
  var partsArray = [];
  var reqAnimFr = (function() {
    return window.requestAnimationFrame || function(cb) {
      setTimeout(cb, 1000 / 60);
    }
  })();

  
  $gallery.html('');
  for (let row = 1; row <= rows; row++) {
    partsArray[row - 1] = [];
    for (let col = 1; col <= cols; col++) {
      $gallery.append(`<div class="show-front demo__part demo__part-${row}-${col}" row="${row}" col="${col}"><div class="demo__part-back"><div class="demo__part-back-inner"></div></div><div class="demo__part-front"></div></div>`);
      partsArray[row - 1][col - 1] = new Part();
    }
  }
  
  var $parts = $(".demo__part");
  var $image = $(".demo__part-back-inner");
  var help = true;

  for (let i = 0; i < $parts.length; i++) {
    $parts.find(".demo__part-front").eq(i).css("background-image", `url(${urls[i]})`);
  }

  $gallery.on("click", ".demo__part-front", function() {

    $image.css("background-image", $(this).css("background-image"));
    if (help) {
      $help.html("Click any of the tiles to get back");
      help = false;
    }

    let row = +$(this).closest(".demo__part").attr("row");
    let col = +$(this).closest(".demo__part").attr("col");
    waveChange(row, col);
  });

  $gallery.on("click", ".demo__part-back", function() {
    if (!isShowingBack()) return;

    $help.html(`Check out my other <a target="blank" href="https://codepen.io/kiyutink/">pens</a> and follow me on <a target="_blank" href="https://twitter.com/kiyutin_k">twitter</a>`);

    setTimeout(function() {
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          partsArray[row - 1][col - 1].showing = "front";
        }
      }
    }, staggerTime + $parts.length * staggerTime / 10);
    
    
    showFront(0, $parts.length);
    
  });
  
  function showFront(i, maxI) {
    if (i >= maxI) return;
    $parts.eq(i).addClass("show-front");
    
    reqAnimFr(function() {
      showFront(i + 1);
    });
  }

  function isShowingBack() {
    return partsArray[0][0].showing == "back" && partsArray[0][cols - 1].showing == "back" && partsArray[rows - 1][0].showing == "back" && partsArray[rows - 1][cols - 1].showing == "back";
  }

  function Part() {
    this.showing = "front";
  }

  function waveChange(rowN, colN) {
    if (rowN > rows || colN > cols || rowN <= 0 || colN <= 0) return;
    if (partsArray[rowN - 1][colN - 1].showing == "back") return;
    $(".demo__part-" + rowN + "-" + colN).removeClass("show-front");
    partsArray[rowN - 1][colN - 1].showing = "back";
    setTimeout(function() {
      waveChange(rowN + 1, colN);
      waveChange(rowN - 1, colN);
      waveChange(rowN, colN + 1);
      waveChange(rowN, colN - 1);
    }, staggerTime);
  }
});