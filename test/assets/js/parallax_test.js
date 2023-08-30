// For better performance on mobile, use requestAnimationFrame
function parallaxScroll() {
    let offset = window.pageYOffset;
    let parallaxElement = document.querySelector('.parallax');
    parallaxElement.style.backgroundPositionY = offset * 0.7 + 'px';
  }
  
  // Throttle the scroll event to reduce the number of function calls
  let throttleTimer;
  function throttleScroll() {
    if (!throttleTimer) {
      throttleTimer = setTimeout(function () {
        throttleTimer = null;
        parallaxScroll();
      }, 50);
    }
  }
  
  window.addEventListener('scroll', throttleScroll);
  