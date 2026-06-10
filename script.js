// ─── NAV scroll effect ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Floating CTA visibility ─────────────────────────────────────────────────
const fcta = document.getElementById('floatcta');
window.addEventListener('scroll', () => {
    fcta.classList.toggle('show', window.scrollY > window.innerHeight * 0.7);
}, { passive: true });

// ─── Mobile menu ─────────────────────────────────────────────────────────────
function openMenu() {
    document.getElementById('mmenu').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById('mmenu').classList.remove('open');
    document.body.style.overflow = '';
}

// ─── Price accordion ─────────────────────────────────────────────────────────
function togglePanel(id) {
    document.getElementById(id).classList.toggle('open');
}

// ─── FAQ accordion ───────────────────────────────────────────────────────────
function toggleFaq(btn) {
    const item = btn.closest('.fitem');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.fitem.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ─── Scroll-in animations ─────────────────────────────────────────────────────
const animObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.anim').forEach(el => animObserver.observe(el));

// ─── Counter animation ───────────────────────────────────────────────────────
function animCount(el, to, suffix, duration = 1800) {
    const start = performance.now();
    const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * to) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

const stripObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('[data-count]').forEach(el => {
            animCount(el, +el.dataset.count, el.dataset.suffix || '');
        });
        stripObserver.unobserve(e.target);
    });
}, { threshold: 0.5 });

const strip = document.querySelector('.strip');
if (strip) stripObserver.observe(strip);

// ─── Lead form submit ─────────────────────────────────────────────────────────
function submitForm(e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    if (phone.replace(/\D/g, '').length < 10) {
        alert('Пожалуйста, введите корректный номер телефона.');
        return;
    }
    alert('Спасибо! Мы перезвоним в течение 15 минут. До встречи на тренировке! 🥊');
    document.getElementById('phone').value = '';
}
