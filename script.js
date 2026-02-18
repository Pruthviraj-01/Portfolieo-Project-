// =============================================
// CUSTOM CURSOR
// =============================================
const dot = document.getElementById('cursorDot');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

// Move dot instantly with mouse
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

// Trail follows with smooth lag
(function animTrail() {
  tx += (mx - tx) * 0.13;
  ty += (my - ty) * 0.13;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animTrail);
})();

// Expand trail on hover over links/buttons
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    trail.style.width = '52px';
    trail.style.height = '52px';
    trail.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    trail.style.width = '32px';
    trail.style.height = '32px';
    trail.style.opacity = '0.5';
  });
});

// =============================================
// SCROLL REVEAL ANIMATION
// =============================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// =============================================
// HERO CARD PARALLAX (Mouse Tracking)
// =============================================
document.addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - 0.5) * 14;
  const y = (e.clientY / innerHeight - 0.5) * 14;
  const hs = document.querySelector('.hero-card-stack');
  if (hs) {
    hs.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  }
});
