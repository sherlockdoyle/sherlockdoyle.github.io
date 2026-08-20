class PhysicsNode {
  x: number; // x position
  y: number; // y position
  r: number; // rotation
  vx: number; // x velocity
  vy: number; // y velocity
  vr: number; // rotation velocity
  w: number; // width
  h: number; // height

  m: number; // mass
  i: number; // inertia
  e: number = 0.8; // restitution

  g0: DOMMatrix; // initial transform
  g0Inv: DOMMatrix; // inverse of initial transform
  gc: DOMMatrix; // current transform

  constructor(
    public el: HTMLElement,
    public parent: PhysicsNode | undefined,
    containerRect: DOMRect,
  ) {
    const rect = el.getBoundingClientRect();
    this.w = rect.width || 0.1;
    this.h = rect.height || 0.1;

    this.m = this.w * this.h;
    this.i = (this.m * (this.w ** 2 + this.h ** 2)) / 12;

    this.x = rect.left + window.scrollX - containerRect.left + this.w / 2;
    this.y = rect.top + window.scrollY - containerRect.top + this.h / 2;
    this.r = 0;

    const v = Math.random() * Math.PI * 2;
    this.vx = Math.cos(v) * 3;
    this.vy = Math.sin(v) * 2;
    this.vr = (Math.random() - 0.5) * 0.01;

    this.g0 = new DOMMatrix().translate(this.x, this.y);
    this.g0Inv = this.g0.inverse();
    this.gc = this.g0;
  }

  applyImpulse(nx: number, ny: number, pen: number, px: number, py: number) {
    if (pen <= 0) return;

    this.x += nx * pen;
    this.y += ny * pen;

    const rx = px - this.x,
      ry = py - this.y;
    const rvx = this.vx - this.vr * ry,
      rvy = this.vy + this.vr * rx;
    const vn = rvx * nx + rvy * ny;
    if (vn > 0) return;

    const rn = rx * ny - ry * nx;
    const j = (-(1 + this.e) * vn) / (1 / this.m + rn ** 2 / this.i);
    this.vx += (j * nx) / this.m;
    this.vy += (j * ny) / this.m;
    this.vr += (j * rn) / this.i;
  }

  simulateAndCollide(boundsWidth: number, boundsHeight: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.r += this.vr;

    const deg = this.r * (180 / Math.PI);
    const gc = new DOMMatrix().translate(this.x, this.y).rotate(deg);

    const hw = this.w / 2,
      hh = this.h / 2;
    const pts: [x: number, y: number][] = [
      [-hw, -hh],
      [hw, -hh],
      [hw, hh],
      [-hw, hh],
    ];

    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    let ptMinX = pts[0],
      ptMaxX = pts[0],
      ptMinY = pts[0],
      ptMaxY = pts[0];
    for (const [x, y] of pts) {
      const gx = gc.a * x + gc.c * y + gc.e,
        gy = gc.b * x + gc.d * y + gc.f;
      if (gx < minX) {
        minX = gx;
        ptMinX = [gx, gy];
      } else if (gx > maxX) {
        maxX = gx;
        ptMaxX = [gx, gy];
      }
      if (gy < minY) {
        minY = gy;
        ptMinY = [gx, gy];
      } else if (gy > maxY) {
        maxY = gy;
        ptMaxY = [gx, gy];
      }
    }

    let collided = false;
    if (minX < 0) {
      this.applyImpulse(1, 0, -minX, ...ptMinX);
      collided = true;
    } else if (maxX > boundsWidth) {
      this.applyImpulse(-1, 0, maxX - boundsWidth, ...ptMaxX);
      collided = true;
    }
    if (minY < 0) {
      this.applyImpulse(0, 1, -minY, ...ptMinY);
      collided = true;
    } else if (maxY > boundsHeight) {
      this.applyImpulse(0, -1, maxY - boundsHeight, ...ptMaxY);
      collided = true;
    }

    this.gc = collided ? new DOMMatrix().translate(this.x, this.y).rotate(deg) : gc;
  }

  applyLocalTransform() {
    const m = this.parent
      ? this.g0Inv.multiply(this.parent.g0).multiply(this.parent.gc.inverse()).multiply(this.gc)
      : this.g0Inv.multiply(this.gc);
    this.el.style.transform = m.toString();
  }
}

setTimeout(() => {
  document.querySelectorAll<HTMLElement>('.tags').forEach(el => (el.style.overflow = 'visible'));

  const bodyRect = document.body.getBoundingClientRect();
  const nodes: PhysicsNode[] = [];

  const nodeMap = new Map<HTMLElement, PhysicsNode>();
  document.body.querySelectorAll<HTMLElement>('*:not(script, template, template *, main, project-card)').forEach(el => {
    const parent = nodeMap.get(
      el.matches('main, project-card>article') ? el.parentElement!.parentElement! : el.parentElement!,
    );
    const node = new PhysicsNode(el, parent, bodyRect);
    nodeMap.set(el, node);
    nodes.push(node);
  });
  nodeMap.clear();

  const l = nodes.length;
  function step() {
    for (let i = 0; i < l; ++i) {
      nodes[i].simulateAndCollide(bodyRect.width, bodyRect.height);
      nodes[i].applyLocalTransform();
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}, 1000);
