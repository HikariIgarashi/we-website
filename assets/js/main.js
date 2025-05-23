jQuery(document).ready(function($) {

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400});

    /* ======= Fixed header when scrolled ======= */

    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 50) {
             $('#header').addClass('navbar-fixed-top');
         }
         else {
             $('#header').removeClass('navbar-fixed-top');
         }
    });

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){

        //store hash
        var target = this.hash;
        if (!target) return;

        e.preventDefault();

        $('body').scrollTo(target, 800, {offset: -70, 'axis':'y'});
        //Collapse mobile menu after clicking
        if ($('.navbar-collapse').hasClass('in')){
          $('.navbar-collapse').removeClass('in').addClass('collapse');
        }

    });
    
    // Force sections to be visible
    $('#activities, #news, #reports').css({
        'display': 'block', 
        'visibility': 'visible', 
        'opacity': 1
    });

});
