const video = document.getElementById('video');

var socket = io.connect('https://normi-dtr-payroll.herokuapp.com');
socket.on( 'connect', function() {
  console.log("SOCKET CONNECTED")
})

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

Promise.all([
  faceapi.loadFaceLandmarkModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadFaceRecognitionModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadTinyFaceDetectorModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadFaceLandmarkModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadFaceLandmarkTinyModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadFaceRecognitionModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
  faceapi.loadFaceExpressionModel("https://normi-dtr-payroll.herokuapp.com/static/face_js/models/"),
])
  .then(startVideo)
  .catch(err => console.error(err));

function startVideo() {
  navigator.getUserMedia(
    {
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);


  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    socket.emit( 'my event', {
      data: detections
    })

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

  }, 100)
})
