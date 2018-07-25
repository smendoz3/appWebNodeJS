//Muestra el pop up con los juegos
// Get the modal
var modal = document.getElementById('videoPopUp');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function OpenPopUp(){
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
	stopVideo();
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		stopVideo();
    }
}
// When the user clicks the video, the video stops or plays
function togglePlayPause() {
  var video = document.getElementById("Video");
  if (video.paused || video.ended) {
    video.play();
  }
  else {
    video.pause();
  }
}


function stopVideo() {
  var video = document.getElementById("Video");
  video.pause();
  video.currentTime = 0;
}
