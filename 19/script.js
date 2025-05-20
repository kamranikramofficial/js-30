const video = document.querySelector('.webcam');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const takePhotoButton = document.querySelector('#take-photo');
const downloadButton = document.querySelector('#download');
const effectButtons = document.querySelectorAll('.effects button');

let streaming = false;
let currentEffect = 'normal';
let lastPhotoData = null;

async function getWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();
    video.addEventListener('canplay', function() {
      if (!streaming) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        streaming = true;
        paintToCanvas();
      }
    });
  } catch (err) {
    console.error('Oh no!', err);
    alert('Unable to access webcam. Please allow camera access and refresh the page.');
  }
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = applyEffect(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function applyEffect(pixels) {
  switch (currentEffect) {
    case 'red':
      return redEffect(pixels);
    case 'green':
      return greenEffect(pixels);
    case 'blue':
      return blueEffect(pixels);
    case 'grayscale':
      return grayscaleEffect(pixels);
    case 'invert':
      return invertEffect(pixels);
    case 'pixelate':
      return pixelateEffect(pixels);
    default:
      return pixels;
  }
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] *= 0.5;
    pixels.data[i + 1] += 100;
    pixels.data[i + 2] -= 50;
  }
  return pixels;
}

function blueEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] -= 50;
    pixels.data[i + 1] *= 0.5;
    pixels.data[i + 2] += 100;
  }
  return pixels;
}

function grayscaleEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const avg = (pixels.data[i + 0] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
    pixels.data[i + 0] = avg;
    pixels.data[i + 1] = avg;
    pixels.data[i + 2] = avg;
  }
  return pixels;
}

function invertEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = 255 - pixels.data[i + 0];
    pixels.data[i + 1] = 255 - pixels.data[i + 1];
    pixels.data[i + 2] = 255 - pixels.data[i + 2];
  }
  return pixels;
}

function pixelateEffect(pixels) {
  const pixelSize = 10;
  const width = canvas.width;
  const height = canvas.height;
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = width;
  tempCanvas.height = height;
  tempCtx.putImageData(pixels, 0, 0);
  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const pixelData = tempCtx.getImageData(x, y, 1, 1).data;
      ctx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }

  return ctx.getImageData(0, 0, width, height);
}

function takePhoto() {
  const snapSound = new Audio();
  snapSound.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...';
  snapSound.play();
  const data = canvas.toDataURL('image/jpeg');
  lastPhotoData = data;
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'webcam-fun');
  link.innerHTML = `<img src="${data}" alt="Webcam Photo"/>`;
  strip.insertBefore(link, strip.firstChild);
  downloadButton.disabled = false;
}

function downloadPhoto() {
  if (lastPhotoData) {
    const link = document.createElement('a');
    link.href = lastPhotoData;
    link.setAttribute('download', `webcam-fun-${Date.now()}.jpg`);
    link.click();
  }
}

takePhotoButton.addEventListener('click', takePhoto);
downloadButton.addEventListener('click', downloadPhoto);

effectButtons.forEach(button => {
  button.addEventListener('click', function() {
    effectButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    currentEffect = this.dataset.effect;
  });
});

getWebcam();

window.addEventListener('resize', function() {
  if (streaming) {
    const displayWidth = video.offsetWidth;
    const aspectRatio = video.videoHeight / video.videoWidth;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = (displayWidth * aspectRatio) + 'px';
  }
});
