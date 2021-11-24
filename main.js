const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

let balls = [];
//My functions starts here, i declare 3 ints which i am going to use in my functions.
let ballsQuantity = 0;
let differentSizes = 0;
let upOrDown = 1;

//Function for adding the ball. The amount can be found in the while loop at the end of the document.
//I also had to move the while loop into the loop function since it wouldn't draw the balls otherwise.
function addBall(){
  ballsQuantity++;
}

//Function for removing the ball, i use an if statement here so that ballsQuantity doesn't become negative.
function removeBall(){
  if (balls.length > 0){
    ballsQuantity--;
    balls.pop();
  }
  else{
    console.log("You can't do that")
  }
}

//This function changes so that the "Ball.prototype.draw" function doesn't draw the full circle which creates weird sizes.
function weirdSizes(){
    differentSizes = random(0, 12);
}

//This makes the balls go horizontally
function travelDirectionHorizont(){
  upOrDown = 2;
}

//This makes the balls go vertically
function travelDirectionVertical(){
  upOrDown = 3;
}

/*I create the specialLength int since it wouldn't work with "balls.length" in the for 
loop because the array with the balls in it was being removed at the same time.
*/
let specialLength = 0;

//This function fully resets all earlier functions.
function fullReset(){
  differentSizes = 0;
  upOrDown = 1;
  specialLength = balls.length;
  for (let i = 0; i < specialLength; i++) {
    balls.pop();
    ballsQuantity--;
  }
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, differentSizes, 2 * Math.PI);
    ctx.fill();
  }

  let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
  testBall.x
  testBall.size
  testBall.color
  testBall.draw()

  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    
    //Here we declare which direction the ball will be traveling
    if(upOrDown == 1){
      this.x += this.velX;
      this.y += this.velY;
    }
    else if(upOrDown == 2){
      this.x += this.velX;
      this.y == this.velY;
    }
    else if(upOrDown == 3){
      this.x == this.velX;
      this.y += this.velY;
    }
  }

  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
  while (balls.length < ballsQuantity) {
    let size = random(12,24);
    let ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-4,1),
      random(-4,1),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
  
    balls.push(ball);
  }
}

loop();