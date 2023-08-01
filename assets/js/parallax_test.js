window.addEventListener('scroll', function () {
    let offset = window.pageYOffset;
    let parallaxElement = document.querySelector('.parallax');
    parallaxElement.style.backgroundPositionY = offset * 0.7 + 'px';
  });