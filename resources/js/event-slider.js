// TODO: make this a jquery plugin!


/* ------------------Variables------------------ */

// Modifiable Variables
var changeInterval = 8000; 					// How often the slide changes

var navButtonFadeTime = 400; 				// How quickly the left/right nav buttons fade in and out.
var navButtonOpacity = .75; 				// Left/right nav buttons opacity on hover.

var slideInEasing = "easeOutQuart"; 		// Easing for slide entering.

var slideOutEasing = "easeInQuart"; 		// Easing for slide leaving.
var slideInSpeed = 1000; 					// Speed of slide entering.
var slideOutSpeed = 750; 					// Speed of slide leaving.

var peekCaptionSpeed = 250; 				// Speed of caption box peek.
var peekCaptionEasing = "linear"; 			// Easing for caption box peek.
var showCaptionSpeed = 750; 				// Speed of show caption box.
var showCaptionEasing = "easeInOutCubic";	// Easing for showing caption box.
var hideCaptionSpeed = 250; 				// Speed of hiding caption box.
var hideCaptionEasing = "linear"; 			// Easing for hiding caption box.

var titleFadeTime = 400; 				//How quickly the title fades in and out.
var titleOpacity = .75; 					// Title opacity on hover.


// Program variables
var currentSlide = 0;	// The slide the users is currently viewing. Initiates randomly.
var numSlides; 			// Number of slides. Initiates automatically.
var prevSlide; 			// Previous slide index. Handled automatically.
var autoSlide = null;	// setInterval variable used by clearInterval.

/* ----------------Variables End---------------- */


$(document).ready(function () {
    /* --------------Program Controls--------------- */

    // Initiate slider elements
    sliderInit();

    $("a").tooltip({ position: { my: "left+8 bottom-50", at: "left" }, tooltipClass: "sliderTooltip" });

    // Change slides at specified changeInterval
    // This interval is cleared when mouse enters .sliderContainer
    autoSlide = setInterval(slideRight, changeInterval);

    // Show left navigation button on mouse enter
    $("#leftButtonCont").mouseenter(showNavButton);
    // Hide left navigation button on mouse leave
    $("#leftButtonCont").mouseleave(hideNavButton);

    // Show right navigation button on mouse enter
    $("#rightButtonCont").mouseenter(showNavButton);
    // Hide right navigation button on mouse leave
    $("#rightButtonCont").mouseleave(hideNavButton);

    // Change to next slide on right button click
    $("#rightButton").click(slideRight);

    // Change to previous slide on left button click
    $("#leftButton").click(slideLeft);

    // Peek caption box on sliderContainer hover
    $("div.sliderContainer").on('mouseenter', peekCaptionBox);

    // Show caption box on caption hover or click
    $("div.caption").on('mouseenter', showCaptionBox);
    $("div.caption").click(showCaptionBox);

    // Hide caption when mouse leaves the slider
    $("div.sliderContainer").on('mouseleave', hideCaptionBox);

    /* ------------Program Controls End------------- */


    /* ------------------Functions------------------ */

    // Initiate the slider
    function sliderInit() {
        $("#leftButtonCont").fadeTo(0, 0);
        $("#rightButtonCont").fadeTo(0, 0);
        $("div.title").fadeTo(0, 0);

        // These two things need to happen after ASP.Net (C#) attaches the image/caption html
        numSlides = $(".sliderImg").length; // Get the number of slides
        currentSlide = Math.floor(Math.random() * 10000) % numSlides; // chooses a random currentSlide

        // Hide all title, slides, and captions
        $(".sliderTitle").hide();
        $(".sliderImg").hide();
        $(".sliderTxt").hide();

        // Shows the first title, slide, and caption
        $(".sliderTitle#title" + currentSlide).show();
        $(".sliderImg#img" + currentSlide).show();
        $(".sliderTxt#txt" + currentSlide).show();

    } // end init

    // Show the navigation button
    function showNavButton() {
        $(this).stop();
        $(this).fadeTo(navButtonFadeTime, navButtonOpacity);
    }

    // Hide the navigation button
    function hideNavButton() {
        $(this).stop();
        $(this).fadeTo(navButtonFadeTime, 0);
    }

    // Change to previous slide
    function slideLeft() {
        prevSlide = currentSlide;

        if (currentSlide > 0) {
            currentSlide--;

        } else {
            currentSlide = numSlides - 1;
        };

        // change slide and animate!
        $(".sliderImg#img" + prevSlide).stop().hide("fade", { easing: slideOutEasing }, slideOutSpeed, function () {
            $(".sliderImg#img" + currentSlide).stop().show("fade", { easing: slideInEasing }, slideInSpeed);
        });

        /* Sliding method
         $(".sliderImg#img" + prevSlide).stop().hide("slide", { direction: "right", easing: "easeInOutCirc" }, 300, function () {
         $(".sliderImg#img" + currentSlide).stop().show("slide", { direction: "left", easing: "easeInOutCirc" }, 750);
         });
         */

        // change title!
        $(".sliderTitle#title" + prevSlide).stop().hide();
        $(".sliderTitle#title" + currentSlide).stop().show();

        // change caption!
        $(".sliderTxt#txt" + prevSlide).stop().hide();
        $(".sliderTxt#txt" + currentSlide).stop().show();
    }

    // Change to next slide
    function slideRight() {
        prevSlide = currentSlide;
        if (currentSlide < numSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        };

        // change slide and animate!
        $(".sliderImg#img" + prevSlide).stop().hide("fade", { easing: slideOutEasing }, slideOutSpeed, function () {
            $(".sliderImg#img" + currentSlide).stop().show("fade", { easing: slideInEasing }, slideInSpeed);
        });

        /* Sliding method
         $(".sliderImg#img" + prevSlide).stop().hide("slide", { direction: "left", easing: "easeInOutCirc" }, 300, function () {
         $(".sliderImg#img" + currentSlide).stop().show("slide", { direction: "right", easing: "easeInOutCirc" }, 750);
         });
         */

        // change title!
        $(".sliderTitle#title" + prevSlide).stop().hide();
        $(".sliderTitle#title" + currentSlide).stop().show();

        // change caption!
        $(".sliderTxt#txt" + prevSlide).stop().hide();
        $(".sliderTxt#txt" + currentSlide).stop().show();
    }

    // Show the slide title
    function showTitle() {
        if ($(".sliderTitle#title" + currentSlide).text().length > 0) {
            $("div.title").stop();
            $("div.title").fadeTo(titleFadeTime, titleOpacity);
        }
    }
    // Hide the slide title
    function hideTitle() {
        $("div.title").stop();
        $("div.title").fadeTo(titleFadeTime, 0);
    }

    // Peek the caption box, and show the title
    function peekCaptionBox() {
        clearInterval(autoSlide);
        $("div.caption").stop().animate({ bottom: -85 }, peekCaptionSpeed);
        showTitle();
    } // End peek caption

    // Show the whole caption box, and hide the title
    function showCaptionBox() {
        $("div.caption").stop().animate({ bottom: 0 }, showCaptionSpeed, showCaptionEasing);
    } // End show caption

    // Hide the caption box
    function hideCaptionBox() {
        autoSlide = setInterval(slideRight, changeInterval);
        $("div.caption").stop().animate({ bottom: -130 }, hideCaptionSpeed, hideCaptionEasing);
        hideTitle();
    } // End hide caption

    /* ----------------End Functions---------------- */
});