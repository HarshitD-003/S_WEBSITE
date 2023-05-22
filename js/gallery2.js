var galleryItems = document.querySelectorAll('[data-fancybox="gallery"]');

galleryItems.forEach(function(item) {
  item.addEventListener('click', function() {
    var options = {
      buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
      ],
      loop: false,
      protect: true
    };
    
    item.classList.add("gallery-active"); // Add "gallery-active" class to the clicked item

    
  });
});
