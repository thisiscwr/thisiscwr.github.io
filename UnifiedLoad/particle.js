var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var particlesArray = [];
var count = parseInt(((canvas.height / 150) * canvas.width) / 150);
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.directionY = 0.5 - Math.random();
    this.directionX = 0.5 - Math.random();
  }
  update() {
    this.y += this.directionY * 0.15;
    this.x += this.directionX * 0.15;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(27, 204, 168)";
    ctx.fill();
  }
}

function createParticle() {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  particlesArray.push(new Particle(x, y));
}

function handleParticle() {
  for (var i = 0; i < particlesArray.length; i++) {
    var particle = particlesArray[i];
    particle.update();
    particle.draw();
    if (
      particle.x < 0 ||
      particle.x > canvas.width ||
      particle.y < 0 ||
      particle.y > canvas.height
    ) {
      particlesArray.splice(i, 1);
    }
    for (var j = i+1; j < particlesArray.length; j++) {
      dx = particlesArray[i].x - particlesArray[j].x;
      dy = particlesArray[i].y - particlesArray[j].y;
      long = Math.pow(dx, 2) + Math.pow(dy, 2);
      if (long < 22500) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(27, 204, 168," + (1 - long / 22500) + ")";
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (particlesArray.length < count) {
    createParticle();
  }
  handleParticle();
}
setInterval(() => {
  draw(), 1;
});
