song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;

function preload()
{
	song = loadSound('music 2.mp3');
	song = loadSound('Believer.mp3');
}


function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
  {
	if(results.length > 0)
	{
	  console.log(results);
      leftWristscore = results[0].pose.keypoints[9].score;

	  leftWristX = results[0].pose.leftWrist.x;
	  leftWristY = results[0].pose.leftWrist.y;
	  console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

	  rightWristX = results[0].pose.rightWrist.x;
	  rightWristY = results[0].pose.rightWrist.y;
	  console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	}
  }
  function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    
    if  (leftWristscore > 0.2){
        circle(leftWristX,leftWristY,30);
        v1 = Number(leftWristY);
        v2 = floor(v1);
        volume = v2/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
  }

  function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}