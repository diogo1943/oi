const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#e1421f', '#ffa100', '#ffd600', '#07b93d', '#00f4f1', '#0091d5'];
let currentColor = null;

function getNewRandomColor() {
  let newColor;
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentColor);
  currentColor = newColor;
  return newColor;
}

ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.strokeStyle = getNewRandomColor();

let lastX = null;
let lastY = null;
let isMobile = /Mobi|Android/i.test(navigator.userAgent);

// ============ DESKTOP MOUSE DRAWING ============
if (!isMobile) {
  document.addEventListener('mousemove', (e) => {
    if (lastX === null || lastY === null) {
      lastX = e.clientX;
      lastY = e.clientY;
      return;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    lastX = null;
    lastY = null;
  });

  document.addEventListener('mousedown', () => {
    ctx.strokeStyle = getNewRandomColor();
  });
}

// ============ MOBILE GYROSCOPE DRAWING ============
if (isMobile && window.DeviceOrientationEvent) {
  // iOS requires explicit permission
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const button = document.createElement('button');
    button.innerText = 'Enable Motion';
    button.style.position = 'fixed';
    button.style.top = '1rem';
    button.style.left = '1rem';
    button.style.zIndex = 9999;
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          document.body.removeChild(button);
          startGyro();
        }
      }).catch(console.error);
    });
  } else {
    startGyro(); // Android and others
  }
}

function startGyro() {
  let gyroX = window.innerWidth / 2;
  let gyroY = window.innerHeight / 2;

  window.addEventListener("deviceorientation", (event) => {
    if (lastX === null || lastY === null) {
      lastX = gyroX;
      lastY = gyroY;
      return;
    }

    // gamma: left-right (x), beta: front-back (y)
    gyroX += event.gamma * 1.5;
    gyroY += event.beta * 1.5;

    gyroX = Math.max(0, Math.min(window.innerWidth, gyroX));
    gyroY = Math.max(0, Math.min(window.innerHeight, gyroY));

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(gyroX, gyroY);
    ctx.stroke();
    lastX = gyroX;
    lastY = gyroY;
  });

  window.addEventListener('click', () => {
    ctx.strokeStyle = getNewRandomColor();
  });
}

// ============ KEYBOARD CLEAR ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});
