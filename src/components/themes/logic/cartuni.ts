document.querySelectorAll<HTMLElement>('*').forEach(el => {
  if (el.matches('#about > header > img, #experience > ol > li')) {
    const r = Array.from({ length: 8 }).map(() => Math.floor(Math.random() * 30 + 35));
    el.style.setProperty('--r1', `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`);
  } else {
    const b = Array.from({ length: 8 }).map(() => Math.floor(Math.random() * 250 + 50)),
      s = Array.from({ length: 8 }).map(() => Math.floor(Math.random() * 15 + 5));
    let r1 = `${b[0]}px ${s[0]}px ${b[1]}px ${s[1]}px / ${s[2]}px ${b[2]}px ${s[3]}px ${b[3]}px`,
      r2 = `${s[4]}px ${b[4]}px ${s[5]}px ${b[5]}px / ${b[6]}px ${s[6]}px ${b[7]}px ${s[7]}px`;
    if (Math.random() > 0.5) {
      [r1, r2] = [r2, r1];
    }
    el.style.setProperty('--r1', r1);
    el.style.setProperty('--r2', r2);
  }
});
