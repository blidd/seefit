// bicep
let video;
let poseNet;
let pose;
let skeleton;
let sound;
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  sound = loadSound("correct_sound.aiff");
}
function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}
function modelLoaded() {
  console.log('poseNet ready');
}
let numReps = 0;
let repFlag = 0;
function draw() {
  image(video, 0, 0);
  if (pose) {
    let wstL = pose.leftWrist;
    let wstR = pose.rightWrist;
    let shldrL = pose.leftShoulder;
    let shldrR = pose.rightShoulder;
    if ((wstR.y - shldrR.y < 30 || wstL.y - shldrL.y < 30) &&                repFlag == 0) {
      console.log(numReps);
      sound.play();
      repFlag = 1;
      numReps = numReps + 1;
    }
    if (shldrR.y < wstR.y - 100 || shldrL.y < wstL.y - 100) {
      repFlag = 0;
    }
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);
    }
  }
}