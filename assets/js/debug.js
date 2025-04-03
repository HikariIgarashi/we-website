// Debug script to check visibility of sections
document.addEventListener('DOMContentLoaded', function() {
  // Log that page has loaded
  console.log('Debug: Page loaded');
  
  // Check if sections exist
  let sections = ['activities', 'news', 'reports'];
  sections.forEach(function(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
      console.log('Debug: Section #' + sectionId + ' exists in DOM');
      
      // Check visibility CSS properties
      let style = window.getComputedStyle(section);
      console.log('Debug: #' + sectionId + ' - display: ' + style.display);
      console.log('Debug: #' + sectionId + ' - visibility: ' + style.visibility);
      console.log('Debug: #' + sectionId + ' - opacity: ' + style.opacity);
      
      // Force visibility
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.opacity = '1';
    } else {
      console.error('Debug: Section #' + sectionId + ' not found in DOM');
    }
  });
  
  // Check for any animations that might be hiding content
  document.querySelectorAll('.animate-fade-in, .animate-slide-up, .thumbnail, .project-card, .panel').forEach(function(el) {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });
  
  // Make sure containers are visible
  document.querySelectorAll('.section .container').forEach(function(container) {
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.opacity = '1';
  });
  
  // Log success
  console.log('Debug: Visibility enforcement complete');
}); 