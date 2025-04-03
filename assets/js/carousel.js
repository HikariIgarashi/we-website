$(document).ready(function() {
  // Initialize the carousel with custom settings
  $('#heroCarousel').carousel({
    interval: 6000,  // Change slides every 6 seconds
    pause: "hover",  // Pause on hover
    wrap: true       // Continue cycling
  });
  
  // Make sure carousel is visible and properly sized
  setTimeout(function() {
    $('#heroCarousel').css({
      'visibility': 'visible',
      'opacity': 1
    }).carousel('cycle');
  }, 500);

  // Add keyboard navigation
  $(document).keyup(function(e) {
    if (e.keyCode === 37) { // left arrow
      $('#heroCarousel').carousel('prev');
    } else if (e.keyCode === 39) { // right arrow
      $('#heroCarousel').carousel('next');
    }
  });
  
  // Fix for possible issues with carousel height
  $(window).on('load resize', function() {
    var windowHeight = $(window).height();
    var headerHeight = $('header.header').outerHeight() || 0;
    $('#heroCarousel').css('height', windowHeight + 'px');
    
    // Adjust the position of sections after carousel
    $('#about').css('margin-top', '0px');
  }).trigger('resize');
}); 