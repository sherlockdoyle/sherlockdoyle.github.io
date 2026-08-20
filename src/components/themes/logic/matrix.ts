const canvas = document.createElement('canvas');
document.body.prepend(canvas);

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
const FONT_SIZE = 16;
const GREEN = '#00ff41',
  BG_FADE = '#0003000e';
const INTERVAL = 50;

let cols = 0;
let drops: number[] = [],
  speeds: number[] = [];
function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const newCols = Math.floor(width / FONT_SIZE);

  if (newCols > cols)
    for (let i = cols; i < newCols; ++i) {
      drops.push((Math.random() * -height) / FONT_SIZE);
      speeds.push(0.4 + Math.random() * 0.6);
    }
  else {
    drops.length = newCols;
    speeds.length = newCols;
  }

  cols = newCols;
}

const ctx = canvas.getContext('2d')!;
function draw() {
  ctx.fillStyle = BG_FADE;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = GREEN;
  ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

  for (let i = 0; i < cols; ++i) {
    const ch = CHARS[~~(Math.random() * CHARS.length)];
    const x = i * FONT_SIZE,
      y = Math.floor(drops[i]) * FONT_SIZE;
    ctx.fillText(ch, x, y);

    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += speeds[i];
  }
}

let lastTime = 0;
function loop(ts: number) {
  requestAnimationFrame(loop);
  if (ts - lastTime < INTERVAL) return;
  lastTime = ts;
  draw();
}

requestAnimationFrame(loop);
new ResizeObserver(init).observe(document.body);
