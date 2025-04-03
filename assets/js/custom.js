/**
 * Custom JavaScript for Women's Eye nonprofit website
 * Adds animations, scroll effects, and responsive enhancements
 */

$(document).ready(function() {
  
  // Add page loader with fade effect
  $('body').prepend('<div id="page-loader"><div class="loader-inner"></div></div>');
  
  // Immediately remove page loader and set body as loaded
  $('#page-loader').remove();
  $('body').addClass('loaded');
  
  // Handle animated elements on scroll
  function handleAnimations() {
    $('.animate-fade-in').each(function() {
      if ($(this).visible(true)) {
        $(this).css({
          'opacity': 1,
          'transform': 'translateY(0)'
        });
      }
    });
  }
  
  // Run once on page load
  handleAnimations();
  
  // And run again on scroll
  $(window).on('scroll', function() {
    handleAnimations();
    
    // Header scroll effect
    if ($(window).scrollTop() > 50) {
      $('.header').addClass('scrolled');
    } else {
      $('.header').removeClass('scrolled');
    }
  });
  
  // Mobile navigation improvements
  $('.navbar-toggle').on('click', function() {
    $(this).toggleClass('active');
  });
  
  // Smooth scrolling for all anchor links
  $('a.scrollto').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    
    if (target.length) {
      event.preventDefault();
      
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 60 // Offset for fixed header
      }, 1000, 'swing');
      
      // Close mobile menu if open
      if ($('.navbar-collapse').hasClass('in')) {
        $('.navbar-toggle').click();
      }
    }
  });
  
  // Initialize popovers and tooltips if Bootstrap is loaded
  if (typeof $.fn.popover !== 'undefined') {
    $('[data-toggle="popover"]').popover();
  }
  
  if (typeof $.fn.tooltip !== 'undefined') {
    $('[data-toggle="tooltip"]').tooltip();
  }
  
  // Responsive tables
  $('.table').wrap('<div class="table-responsive"></div>');
  
  // Image lightbox effect
  $('.thumbnail img').on('click', function() {
    // If you add a lightbox library, initialize it here
  });
  
  // Form validation
  $('form').on('submit', function(e) {
    var requiredFields = $(this).find('[required]');
    var valid = true;
    
    requiredFields.each(function() {
      if (!$(this).val()) {
        $(this).addClass('is-invalid');
        valid = false;
      } else {
        $(this).removeClass('is-invalid');
      }
    });
    
    if (!valid) {
      e.preventDefault();
      alert('必須項目を入力してください。');
    }
  });
  
  // Only bind these events on touch devices
  if ('ontouchstart' in window) {
    // Add touch-specific interaction classes
    $('body').addClass('touch-device');
    
    // Better handling for touch interactions on dropdown menus
    $('.dropdown-toggle').on('click', function(e) {
      e.preventDefault();
      
      $(this).parent().toggleClass('open');
      
      // Close other open dropdowns
      $('.dropdown').not($(this).parent()).removeClass('open');
    });
  }
  
  // Responsive video embeds
  $('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function() {
    if (!$(this).parent().hasClass('embed-responsive')) {
      $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    }
  });
  
  // Detect when animations would finish
  setTimeout(function() {
    $('.animate-fade-in').css({
      'transition': 'none'
    });
  }, 2000);
  
  // Smooth scrolling for navigation links with offset for fixed header
  $('.scrollto').on('click', function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    var headerHeight = $('.header').outerHeight();
    
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - headerHeight
    }, 900, 'swing', function() {
      window.location.hash = target;
    });
  });
  
  // Add active class to nav items on scroll
  $(window).scroll(function() {
    var scrollPos = $(document).scrollTop();
    var headerHeight = $('.header').outerHeight();
    
    $('.nav li a').each(function() {
      var currLink = $(this);
      if (currLink.attr("href") && currLink.attr("href").startsWith('#')) {
        var refElement = $(currLink.attr("href"));
        if (refElement.length > 0) {
          if (refElement.position().top - headerHeight <= scrollPos && 
              refElement.position().top + refElement.height() > scrollPos) {
            $('.nav li').removeClass("active");
            currLink.parent().addClass("active");
          } else {
            currLink.parent().removeClass("active");
          }
        }
      }
    });
    
    // Parallax effect for promo section
    if ($('.promo').length > 0) {
      var scrolled = $(window).scrollTop();
      $('.promo').css('background-position', 'center ' + (scrolled * 0.15) + 'px');
    }
  });
  
  // Hover effects for highlighting card elements
  $('.thumbnail, .project-card').hover(
    function() {
      $(this).find('.btn').addClass('btn-pulse');
    },
    function() {
      $(this).find('.btn').removeClass('btn-pulse');
    }
  );
  
  // Add button pulse effect
  $('<style>.btn-pulse{animation: btnPulse 1.5s infinite;}@keyframes btnPulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}</style>').appendTo('head');
  
  // Form validation with improved UX
  $('form').submit(function(e) {
    e.preventDefault();
    var isValid = true;
    var $form = $(this);
    
    // Reset previous errors
    $form.find('.form-group').removeClass('has-error');
    $form.find('.error-message').remove();
    
    // Validate each required field
    $form.find('input, textarea').each(function() {
      var $field = $(this);
      
      if ($field.prop('required') && $field.val() === '') {
        showFieldError($field, '必須項目です');
        isValid = false;
      }
      
      // Email validation
      if ($field.attr('type') === 'email' && $field.val() !== '') {
        if (!isValidEmail($field.val())) {
          showFieldError($field, 'メールアドレスの形式が正しくありません');
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      // Show loading state
      var $submitBtn = $form.find('button[type="submit"]');
      var originalText = $submitBtn.text();
      $submitBtn.prop('disabled', true)
               .html('<i class="fa fa-spinner fa-spin"></i> 送信中...');
      
      // Simulate form submission (replace with actual AJAX submission)
      setTimeout(function() {
        $form.fadeOut(300, function() {
          $(this).closest('.panel-body').append('<div class="alert alert-success text-center">' +
            '<i class="fa fa-check-circle fa-3x mb-3 d-block"></i>' +
            '<p class="lead">フォームが送信されました。ありがとうございます！</p>' +
            '<p>できるだけ早くご連絡いたします。</p>' +
          '</div>');
        });
      }, 1000);
    }
  });
  
  // Helper function to show field errors
  function showFieldError($field, message) {
    $field.closest('.form-group').addClass('has-error');
    $field.after('<div class="error-message text-danger mt-2"><small><i class="fa fa-exclamation-circle"></i> ' + message + '</small></div>');
    
    // Focus on first error
    if (!$('.has-error input, .has-error textarea').is(':focus')) {
      $('.has-error input, .has-error textarea').first().focus();
    }
  }
  
  // Email validation helper function
  function isValidEmail(email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
  }
}); 