const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Get webcam stream
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    alert("Error accessing webcam: " + err);
  });

video.addEventListener("play", function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  function drawFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let length = frame.data.length;

    for (let i = 0; i < length; i += 4) {
      // Simple crazy RGB split effect
      let red = frame.data[i];
      frame.data[i] = frame.data[i + 1];       // G → R
      frame.data[i + 1] = frame.data[i + 2];   // B → G
      frame.data[i + 2] = red;                 // R → B
    }

    ctx.putImageData(frame, 0, 0);
    requestAnimationFrame(drawFrame);
  }

  drawFrame();
});
