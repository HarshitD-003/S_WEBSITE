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
    var slidingDoor = document.querySelector('.sliding-door');
    var leftPanel = document.querySelector('.left-panel');
    var rightPanel = document.querySelector('.right-panel');
  
    if (isElementInViewport(slidingDoor)) {
      leftPanel.classList.add('show-left');
      rightPanel.classList.add('show-right');
    } 
  }
  
  window.addEventListener('scroll', handleScroll);
  