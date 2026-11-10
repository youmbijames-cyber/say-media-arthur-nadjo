/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, folX = 0, folY = 0;

if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  (function animFollow() {
    folX += (mouseX - folX) * 0.12;
    folY += (mouseY - folY) * 0.12;
    follower.style.left = folX + 'px';
    follower.style.top = folY + 'px';
    requestAnimationFrame(animFollow);
  })();
  document.querySelectorAll('a, button, .card, .opp-card, .btn').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

/* ===== SPA TAB NAVIGATION ===== */
const views = document.querySelectorAll('.view');
const navBtns = document.querySelectorAll('[data-target]');

function showView(id) {
  views.forEach((v) => {
    v.classList.remove('active');
  });
  const target = document.getElementById('view-' + id);
  if (target) {
    void target.offsetWidth;
    target.classList.add('active');
  }
  document.querySelectorAll('.nav-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.target === id);
  });
  document.getElementById('mobileMenu')?.classList.remove('open');
  if (id === 'skills') animateSkills();
  if (id === 'home') animateCounters();
  if (id === 'chine') animateMockCounts();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.dataset.target;
    if (id) showView(id);
  });
});

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

/* ===== TYPEWRITER ===== */
const typeEl = document.getElementById('typewriter');
const phrases = ['Arthur Jeremie NADJO YOUMBI', 'Product \u00b7 Data \u00b7 Growth'];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeWriter() {
  if (!typeEl) return;
  const current = phrases[phraseIndex];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 40 : 70);
}
typeWriter();

/* ===== COUNTERS ===== */
let countersDone = false;
function animateCounters() {
  if (countersDone) {
    document.querySelectorAll('.stat-num').forEach((el) => {
      el.textContent = el.dataset.targetNum;
    });
    return;
  }
  countersDone = true;
  document.querySelectorAll('.stat-num').forEach((el) => {
    const target = parseInt(el.dataset.targetNum, 10);
    const start = performance.now();
    const duration = 1500;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}
animateCounters();

function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach((bar) => {
    bar.style.width = '0';
    requestAnimationFrame(() => {
      bar.style.width = bar.dataset.width + '%';
    });
  });
}

/* ===== CHINE TIMELINE ===== */
document.querySelectorAll('.tl-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tl;
    document.querySelectorAll('.tl-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.tl-panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tl-' + id)?.classList.add('active');
  });
});

/* ===== CASE STUDIES — edit company copy here ===== */
const cases = {
  guangzhou: {
    title: 'Guangzhou Trade Co.',
    body: 'Exportateur d\'electronique grand public vers l\'Afrique de l\'Ouest. Aujourd\'hui : campagnes Facebook Ads basiques. Avec SAY MEDIA : pack Visibilite+, creas adaptees, reporting ROI mensuel.',
    metrics: [
      { val: '250k', lbl: 'Budget test / mois' },
      { val: '+180%', lbl: 'ROI cible' },
      { val: 'FB + IG', lbl: 'Canaux' },
    ],
  },
  shenzhen: {
    title: 'Shenzhen Import Group',
    body: 'Mode & textile via le hub Douala. Pack Communication Premium : TikTok + Instagram, influenceurs locaux, tableau de bord engagement.',
    metrics: [
      { val: '400k', lbl: 'Budget test / mois' },
      { val: '4%+', lbl: 'CTR cible' },
      { val: 'TikTok', lbl: 'Canal prioritaire' },
    ],
  },
  yiwu: {
    title: 'Yiwu Africa Connect',
    body: 'Plateforme B2B wholesale. Objectif : leads grossistes africains. LinkedIn + Facebook, scoring de prospects et pipeline commercial.',
    metrics: [
      { val: 'Leads', lbl: 'Objectif principal' },
      { val: 'LinkedIn', lbl: 'Canal cle' },
      { val: 'Pipeline', lbl: 'Livrable data' },
    ],
  },
  foshan: {
    title: 'Foshan Home & Build',
    body: 'Meubles et materiaux BTP pour l\'immobilier camerounais. Campagnes Instagram showroom + partenaires promoteurs. Preuve via CPA et devis.',
    metrics: [
      { val: 'IG', lbl: 'Canal principal' },
      { val: 'CPA', lbl: 'KPI suivi' },
      { val: 'Devis', lbl: 'Conversion' },
    ],
  },
};

const caseModal = document.getElementById('caseModal');
const caseContent = document.getElementById('caseContent');

document.querySelectorAll('.opp-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.case;
    const data = cases[key];
    if (!data || !caseContent) return;
    caseContent.innerHTML =
      '<h4>' + data.title + '</h4>' +
      '<p>' + data.body + '</p>' +
      '<div class="case-metrics">' +
      data.metrics.map((m) =>
        '<div class="metric"><span class="metric-val">' + m.val + '</span><span class="metric-lbl">' + m.lbl + '</span></div>'
      ).join('') +
      '</div>';
    caseModal.hidden = false;
  });
});

function closeCase() {
  if (caseModal) caseModal.hidden = true;
}
document.getElementById('caseClose')?.addEventListener('click', closeCase);
document.getElementById('caseCloseBtn')?.addEventListener('click', closeCase);

function animateMockCounts() {
  const likes = document.getElementById('countLikes');
  const views = document.getElementById('countViews');
  if (!likes || !views) return;
  const run = (el, target, duration) => {
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('fr-FR');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  run(likes, 12840, 1400);
  run(views, 95600, 1600);
}

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 50;
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function create() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        a: Math.random() * 0.45 + 0.12,
      });
    }
  }
  function draw() {
    if (!document.getElementById('view-home')?.classList.contains('active')) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,243,255,' + p.a + ')';
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(138,43,226,' + (0.1 * (1 - d / 110)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', () => { resize(); create(); });
  resize();
  create();
  draw();
}
