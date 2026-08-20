const gradient = `
<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
  <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
    <stop offset='0' stop-color='#808080' stop-opacity='1' />
    <stop offset='0.125' stop-color='#808080' stop-opacity='1' />
    <stop offset='0.25' stop-color='#808080' stop-opacity='0.25' />
    <stop offset='1' stop-color='#808080' stop-opacity='0' />
  </linearGradient>
  <rect width='100%' height='100%' fill='url(#g)' />
</svg>
`;
const filter = `
<svg id='filters'>
  <filter id='lava'>
    <feTurbulence type='turbulence' baseFrequency='0.04' numOctaves='4' result='noise' />
    <feColorMatrix type='hueRotate' values='0' in='noise' result='cycledNoise'>
      <animate attributeName='values' from='0' to='360' dur='7s' repeatCount='indefinite' />
    </feColorMatrix>
    <feColorMatrix in='cycledNoise' type='matrix'
                  values='1   0 0 0 -0.2
                          2   0 0 0 -0.15
                          2.5 0 0 0 -0.1
                          0   0 0 1  0' result='contrastGray' />
    <feComponentTransfer in='contrastGray'>
      <feFuncR type='table' tableValues='1 0.9 0.5 0 0 0' />
      <feFuncG type='table' tableValues='0.9 0.4 0 0 0 0 0' />
      <feFuncB type='table' tableValues='0.8 0.4 0 0 0 0 0 0' />
      <feFuncA type='table' tableValues='1 1' />
    </feComponentTransfer>
  </filter>

  <filter id='lava-flow' color-interpolation-filters='sRGB'>
    <feTurbulence type='fractalNoise' baseFrequency='0.01 0.01' numOctaves='3' result='noise' />
    <feColorMatrix type='hueRotate' values='0' in='noise' result='cycledNoise'>
      <animate attributeName='values' from='0' to='360' dur='11s' repeatCount='indefinite' />
    </feColorMatrix>
    <feImage preserveAspectRatio='none' href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(gradient)}" result='gradientMask' />
    <feComposite in='gradientMask' in2='cycledNoise' operator='over' result='gradedNoise' />
    <feDisplacementMap in='SourceGraphic' in2='gradedNoise' scale='40' xChannelSelector='R' yChannelSelector='G' />
  </filter>
</svg>
`;
document.body.insertAdjacentHTML('beforeend', filter);

const GAP = 4;
const roofBottom = document.getElementById('header')!.getBoundingClientRect().bottom,
  content = document.querySelector('main')!,
  tracker = document.getElementById('footer')!;
function processCollisions() {
  let needsRecheck = false;
  do {
    needsRecheck = false;

    const allAlive = Array.from(content.querySelectorAll('*:not(script, template, template *)')).filter(el => {
      const rect = el.getBoundingClientRect();
      return !(rect.top === 0 && rect.left === 0 && rect.width === 0 && rect.height === 0);
    });
    allAlive.forEach(el => {
      if (el.matches('section:not(#quotes), #project-grid')) return;

      const rect = el.getBoundingClientRect();
      if (rect.top - roofBottom < GAP) el.classList.add('fire');
      else el.classList.remove('fire');
    });

    const toLeave = allAlive.filter(el => {
      if (Array.from(el.children).some(el => el.tagName !== 'TEMPLATE' && allAlive.includes(el))) return false;

      const rect = el.getBoundingClientRect();
      return roofBottom - rect.bottom > GAP;
    });
    if (toLeave.length) {
      const baselineTop = tracker.getBoundingClientRect().top;

      toLeave.forEach(el => el.remove());
      needsRecheck = true;

      const newTop = tracker.getBoundingClientRect().top,
        marginTop = parseFloat(content.style.marginTop) || 0;
      const shift = newTop - baselineTop - marginTop;
      content.style.marginTop = '';
      if (shift) {
        const overscroll = window.scrollY + shift;
        if (overscroll < 0) content.style.marginTop = `${-overscroll}px`;
        window.scrollBy({ top: shift, behavior: 'instant' });
      }
    }
  } while (needsRecheck);
}

let changing = false;
function handleChange() {
  if (!changing) {
    window.requestAnimationFrame(() => {
      processCollisions();
      changing = false;
    });
    changing = true;
  }
}
window.addEventListener('scroll', handleChange);
window.addEventListener('resize', handleChange);

const themeDialog = document.getElementById('theme-dialog')!;
themeDialog.addEventListener('toggle', e => {
  if (e.newState !== 'open') return;

  const BUFFER = 50,
    MAX_PARTICLES = 500,
    STRIDE = 8; // x, y, vx, vy, life, maxLife, size, type
  const rect = themeDialog.getBoundingClientRect();

  const burnDialog = document.createElement('dialog');
  burnDialog.id = 'burn';
  document.body.append(burnDialog);
  burnDialog.showModal();

  const canvas = document.createElement('canvas');
  canvas.width = rect.width + BUFFER * 2;
  canvas.height = rect.height + BUFFER * 2;
  canvas.style.right = `${-BUFFER}px`;
  canvas.style.top = `${rect.top - BUFFER}px`;
  burnDialog.append(canvas);

  const NUM_FLAMES = 10;
  const flames: HTMLCanvasElement[] = [];
  for (let i = 0; i < NUM_FLAMES; ++i) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 200;
    offCanvas.height = 200;
    const offCtx = offCanvas.getContext('2d')!;

    const cx = 100,
      cy = 100,
      r = 95;
    const path = new Path2D();
    for (let j = 0; j < 11; ++j) {
      const angle = j * 0.5711986642890533;
      const cr = r * (Math.sin(angle) < 0 ? Math.random() * 0.4 + 0.8 : Math.random() * 0.5 + 0.5);
      const x = cx + Math.cos(angle) * cr,
        y = cy + Math.sin(angle) * cr;
      if (j) path.lineTo(x, y);
      else path.moveTo(x, y);
    }
    path.closePath();

    const gradient = offCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.3, '#ffba0099');
    gradient.addColorStop(0.7, '#ff450080');
    gradient.addColorStop(1, '#f000');
    offCtx.fillStyle = gradient;
    offCtx.fill(path);

    flames.push(offCanvas);
  }

  let activeParticles = 0,
    particleData = new Float32Array(MAX_PARTICLES * STRIDE);
  function spawnParticle(x: number, y: number) {
    if (activeParticles >= MAX_PARTICLES) return;

    const i = activeParticles * STRIDE;
    particleData[i] = x;
    particleData[i + 1] = y;
    particleData[i + 2] = Math.random() * 4 - 2;
    particleData[i + 3] = -Math.random() * 8 - 4;
    particleData[i + 4] = particleData[i + 5] = Math.random() * 0.4 + 0.3;
    particleData[i + 6] = Math.random() * 30 + 15;
    particleData[i + 7] = Math.floor(Math.random() * NUM_FLAMES);

    ++activeParticles;
  }

  const ctx = canvas.getContext('2d')!;
  ctx.globalCompositeOperation = 'lighter';

  let startTs: number;
  function animate(ts: number) {
    if (!startTs) startTs = ts;
    const elapsed = ts - startTs,
      burnProgress = elapsed / 500;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const curY = Math.min(1, burnProgress) * rect.height;
    themeDialog.style.clipPath = `polygon(0 100%, 100% 100%, 100% ${curY}px, 0 ${curY}px)`;

    if (burnProgress < 1)
      for (let i = 0; i < 25; ++i)
        spawnParticle(BUFFER + Math.random() * rect.width, BUFFER + curY + (Math.random() - 0.5) * 25);

    for (let i = 0; i < activeParticles; ++i) {
      const idx = i * STRIDE;
      particleData[idx + 4] -= 0.012;
      if (particleData[idx + 4] < 0) {
        --activeParticles;
        if (i < activeParticles) {
          const lastIdx = activeParticles * STRIDE;
          particleData.copyWithin(idx, lastIdx, lastIdx + STRIDE);
          --i;
        }
        continue;
      }

      particleData[idx] += particleData[idx + 2];
      particleData[idx + 1] += particleData[idx + 3];
      particleData[idx + 3] -= 0.2;

      const lifeRatio = particleData[idx + 4] / particleData[idx + 5],
        size = particleData[idx + 6] * lifeRatio;
      if (size > 1) {
        ctx.globalAlpha = lifeRatio;
        ctx.drawImage(
          flames[particleData[idx + 7]],
          particleData[idx] - size / 2,
          particleData[idx + 1] - size / 2,
          size,
          size,
        );
      }
    }
    ctx.globalAlpha = 1;

    if (burnProgress > 1 && activeParticles === 0) {
      themeDialog.parentElement!.remove();
      burnDialog.remove();
      return;
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
