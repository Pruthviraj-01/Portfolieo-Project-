// ============================================
// 1. CUSTOM CURSOR — SMALL DOT
// ============================================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;   // actual mouse position
let ringX = 0,  ringY = 0;    // ring's lagging position

// Instantly move the small dot with mouse
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  // -6 offsets by half width/height (12px) to center the dot on cursor
});


// ============================================
// 2. TRAILING RING ANIMATION (requestAnimationFrame loop)
// ============================================
function animateRing() {
  // Lerp (linear interpolation) — ring slowly catches up to mouse
  // 0.12 = 12% of remaining distance per frame → smooth lag effect
  ringX += (mouseX - ringX - 19) * 0.12;
  ringY += (mouseY - ringY - 19) * 0.12;
  // -19 offsets by half width/height (38px) to center the ring on cursor

  ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

  requestAnimationFrame(animateRing); // loop every frame (~60fps)
}
animateRing(); // kick off the loop


// ============================================
// 3. CURSOR HOVER EFFECTS ON LINKS & BUTTONS
// ============================================
document.querySelectorAll('a, button').forEach(el => {

  // On hover → scale dot up + turn ring purple (accent color)
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2.5)';
    ring.style.borderColor = 'var(--accent)';    // #6c63ff purple
  });

  // On leave → reset ring back to teal (accent2 color)
  el.addEventListener('mouseleave', () => {
    ring.style.borderColor = 'var(--accent2)';   // #00f5d4 teal
  });

});


// ============================================
// 4. SCROLL REVEAL — INTERSECTION OBSERVER
// ============================================

// Select all elements that should animate in on scroll
const reveals = document.querySelectorAll('.reveal');

// IntersectionObserver watches when elements enter the viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // Add 'visible' class → triggers CSS fade-up transition
      e.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12  // trigger when 12% of element is visible
});

// Attach observer to every .reveal element
reveals.forEach(r => observer.observe(r));