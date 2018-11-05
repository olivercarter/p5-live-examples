// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

let angle = 50;
let growth  = 0.05;
let maxLevel = 8;
// var sliderAngle: any;
// var sliderBranches: any;

var sketch = (p: p5) => {
  p.preload = () => {

  }
  
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // sliderAngle = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
    // sliderBranches = p.createSlider(1, 50, 4);
  }
  
  p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  let currentLevel = 0;
  let currentLevelGrowth = 0;
  let finishedGrowing = false;
  p.draw = () => {
    p.background(51);
    // angle = sliderAngle.value();
    p.translate(p.width/2, p.height);

    if(!finishedGrowing) {
      currentLevelGrowth += growth;
      if(currentLevelGrowth > 1) {
        currentLevel++;
        currentLevelGrowth = 0;
      }
      if(currentLevel > maxLevel) {
        currentLevel = maxLevel;
        finishedGrowing = true;
        currentLevelGrowth = 1;
      }
    }
    branch(p.height/3, 1, 0, currentLevel);   
  }

  let branchAngles: {
    [index: string]: number
  } = {};
  const branch = (len: number, level: number, branchno: number, maxLevel: number) => {
  
    if(branchAngles[`${level}_${branchno}_1`] == null) {
      branchAngles[`${level}_${branchno}_1`] =  p.random(0,2);
    }
    if(branchAngles[`${level}_${branchno}_2`] == null) {
      branchAngles[`${level}_${branchno}_2`] =  p.random(0,2);
    }

    p.stroke(p.color(255));
    p.strokeWeight(maxLevel / level);
    const lastBranch = (level > maxLevel);
    
    if(lastBranch) {
      p.stroke(p.color('red'));
      let partialLen = p.lerp(0, -len, currentLevelGrowth);
      p.line(0, 0, 0, partialLen);
    }
    else {
      p.line(0, 0, 0, -len);
    }

    p.translate(0, -len);
    if (!lastBranch) {
      const newLevel = level + 1;
      p.push();
      p.rotate(angle / branchAngles[`${level}_${branchno}_1`]); // divide by 2 for wind?
      branch(len * 0.67, newLevel, 1, maxLevel);
      p.pop();
      p.push();
      p.rotate(-angle / branchAngles[`${level}_${branchno}_2`]);
      branch(len * 0.67, newLevel, 2, maxLevel);
      p.pop();
    }
  
  }

}

var sketchP = new p5(sketch);