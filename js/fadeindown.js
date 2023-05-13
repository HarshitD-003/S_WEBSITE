function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function handleScroll() {
    var elements = document.querySelectorAll('.fade-in-down');
    elements.forEach(function(element) {
      if (isElementInViewport(element)) {
        element.classList.add('show');
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll);
  