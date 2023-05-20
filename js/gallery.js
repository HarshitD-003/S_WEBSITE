const thumbImgCont = document.getElementById('thumbnail-section');
const thumbnails = document.getElementsByClassName('thumbnail');
const fullSizeImgs = document.getElementsByClassName('mySlides');
const captionCont = document.querySelector('.caption-container');
const caption = document.getElementById('caption');
/* Acts as an index to retrieve images from 'thumbnails' and 'fullSizeImgs'; 
used with < and > arrow icons */
let currentImage = 0; 


// Removes 'show' classes from large images
// Removes 'active' class from thumbnails
function reset() {
  for (let img of fullSizeImgs) {
    img.classList.remove('show-gal');
  }
  for (let thumbs of thumbnails) {
    thumbs.firstElementChild.classList.remove('active-gal');
  }
}

// Show larger image based on thumbnail index clicked
thumbImgCont.addEventListener('click', (e) => {
  reset();
  // Find index of thumbnail clicked
  const index = [...thumbnails].indexOf(e.target.parentNode);
  // Use that index to show its corrolating larger IMG
  fullSizeImgs[index].classList.add('show-gal');
  // Set caption using img 'alt' tag
  caption.textContent = e.target.getAttribute('alt');
  // Set global variable for currentImage
  currentImage = index;
  // Alter the thumbnail to show it's selected
  hiLiteThumbnail();
})

function hiLiteThumbnail() {
  let thumbnail = thumbnails[currentImage].firstElementChild;
  thumbnail.classList.add('active-gal');
}

// Get Arrow Advancers to work
function goBack(e) {
  reset();
  if (e.target.classList.contains("prev") && currentImage > 0) {
    currentImage -= 1;
    fullSizeImgs[currentImage].classList.add('show-gal');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();
  } else if (e.target.classList.contains("prev") && currentImage === 0) {
    currentImage = thumbnails.length-1;
    fullSizeImgs[currentImage].classList.add('show-gal');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();
  }
}

function goFwd(e) {
  reset();
  if (e.target.classList.contains("next") && currentImage < thumbnails.length-1) {
    currentImage += 1;
    fullSizeImgs[currentImage].classList.add('show-gal');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail(); 
  } else if (e.target.classList.contains("next") && currentImage === thumbnails.length-1) {
    currentImage = 0;
    fullSizeImgs[currentImage].classList.add('show-gal');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();  
  }
}

// Listen for back and forward arrow clicks
captionCont.addEventListener('click', (e) => {
  // Allows only the Arrow icons to trigger event handlers
  if (e.target.nodeName !== 'A') return false;
  // Event Handlers
  e.target.classList.contains("next") ? goFwd(e) : goBack(e);  
});