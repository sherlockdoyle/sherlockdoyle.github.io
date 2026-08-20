document.body.querySelectorAll<HTMLElement>('*').forEach(el => {
  const dir = Math.floor(Math.random() * 4);
  el.style.translate = dir === 0 ? '1px 0' : dir === 1 ? '-1px 0' : dir === 2 ? '0 1px' : '0 -1px';
  el.style.scale = (0.99 + Math.random() * 0.02).toString();
  el.style.fontSize = `${parseFloat(window.getComputedStyle(el).fontSize) * (0.9 + Math.random() * 0.2)}px`;
  el.style.letterSpacing = `${0.018 + Math.random() * 0.004}em`;
  if (Math.random() < 0.25 && el.id !== 'me' && el.children.length === 0)
    el.style.fontFamily = ['Arial', 'Helvetica', 'Verdana', 'Tahoma'][Math.floor(Math.random() * 4)];
});

let lastY = 0;
window.addEventListener('scroll', () => {
  const d = lastY - window.scrollY;
  if (Math.abs(d) > 1) window.scrollBy({ top: d * 0.5 });
  lastY = window.scrollY;
});
