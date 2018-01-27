// GLOBAL VARIABLES
let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;

// DOM ELEMENTS
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// GET MEDIA STREAM
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    // LINK TO THE VIDEO SRC
    video.srcObject = stream;
    // PLAY VIDEO
    video.play();
  })
  .catch(err => console.error(`Error: ${err}`));

// PLAY WHEN READY
video.addEventListener(
  'canplay',
  function(e) {
    if (!streaming) {
      // SET VIDEO/CANVAS HEIGHT
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);

      // CANVAS
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      streaming = true;
    }
  },
  false
);

// ADD EVENT LISTENER TO PHOTO BUTTOM
photoButton.addEventListener(
  'click',
  function(e) {
    takePicture();
    e.preventDefault();
  },
  false
); // false makes it async

// FILTER BUTTON
photoFilter.addEventListener('change', function(e) {
  e.preventDefault();
  filter = e.target.value;
  video.style.filter = filter;
});

// CLEAR BUTTON
clearButton.addEventListener('click', function(e) {
  e.preventDefault();
  // CLEAR PHOTOS
  photos.innerHTML = '';
  // RESET FILTER
  filter = 'none';
  // RESET
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
});

// TAKE PICTURE FROM CANVAS AND ADD TO DOM
function takePicture() {
  // CREATE CANVAS
  const context = canvas.getContext('2d');
  if (width && height) {
    // SET CANVAS PROPS
    canvas.width = width;
    canvas.height = height;

    // DRAW IMAGE OF VIDEO ON CANVAS
    // 0,0 IS WHERE TO START DRAWING ON X & Y AXIS
    context.drawImage(video, 0, 0, width, height);

    // CREATE IMAGE FROM CANVAS
    const imgUrl = canvas.toDataURL('image/png');
    // CREATE IMAGE ELEMENT
    const image = document.createElement('img');
    // SET IMAGE SRC
    image.setAttribute('src', imgUrl);
    // SET IMAGE FILTER
    image.style.filter = filter;
    // APPEND TO THE DOM
    photos.appendChild(image);
  }
}
