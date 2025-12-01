// Timeless site JS: nav toggle, reveal on scroll, dynamic links
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // Theme initialization + toggle
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark' || savedTheme === 'light'){
    root.setAttribute('data-theme', savedTheme);
  } else {
    // Default to light mode, ignore system preference unless user chooses
    root.setAttribute('data-theme','light');
  }
  const themeBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-fab');
  function currentTheme(){ return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function setTheme(t){ root.setAttribute('data-theme', t); localStorage.setItem('theme', t); }
  if(themeBtn){
    themeBtn.addEventListener('click', ()=>{
      // Add a temporary class to animate theme-related properties
      document.body.classList.add('theme-anim');
      setTheme(currentTheme()==='dark' ? 'light' : 'dark');
      // Remove the animation class after the transition ends
      setTimeout(()=> document.body.classList.remove('theme-anim'), 320);
    });
  }

  // Auto-contrast for assets when in dark mode
  function applyAssetContrast(){
    const isDark = currentTheme()==='dark';
    // Wordmark (brand-type) is a red/black image; boost visibility on dark
    $$('.brand-type').forEach(img=>{
      const inHeader = img.closest('.site-header');
      const inFooter = img.closest('.site-footer');
      // Let CSS handle header/footer variants (footer uses invert to stay white; header uses dark-specific filter)
      if(inFooter || (isDark && inHeader)){
        img.style.filter = '';
        return;
      }
      img.style.filter = isDark ? 'brightness(1.1) contrast(1.05)' : '';
    });
    // Gallery / preview images: subtly lift brightness on dark
    $$('.gallery-tile img, .hero-preview img, .gallery-preview .placeholder img').forEach(img=>{
      img.style.filter = isDark ? 'brightness(1.06) contrast(1.03)' : '';
    });
  }
  applyAssetContrast();
  // Re-apply after theme change animations settle
  window.addEventListener('storage', (e)=>{ if(e.key==='theme') applyAssetContrast(); });
  // Also observe attribute change
  const mo = new MutationObserver(applyAssetContrast); mo.observe(root,{attributes:true, attributeFilter:['data-theme']});

  // Mobile nav toggle
  const navToggle = $('#nav-toggle');
  const menu = $('#menu');
  const backdrop = $('#nav-backdrop');
  if(navToggle && menu){
    const setOpen = (open) => {
      menu.classList.toggle('open', open);
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      if(backdrop){
        backdrop.classList.toggle('show', open);
        backdrop.toggleAttribute('hidden', !open);
      }
      document.body.classList.toggle('nav-open', open);
    };
    navToggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    if(backdrop){ backdrop.addEventListener('click', () => setOpen(false)); }
  }

  // Brand logo fallback loader (handles both filename variants and legacy ones)
  const brandLogos = $$('.brand-logo');
  if (brandLogos.length) {
    const candidates = [
      'timelessbackground.jpeg', // nama yang diinginkan (baru)
      'timelessagencybackground.jpeg', // nama lama
      'timelessagencybackgground.jpeg', // kemungkinan salah ketik
      'timeless.png',
      'timeless,.png'
    ];
    brandLogos.forEach(img => {
      let i = 0;
      const tryNext = () => {
        if (i >= candidates.length) return;
        const src = candidates[i++];
        if (img.getAttribute('src') !== src) img.src = src;
      };
      img.addEventListener('error', tryNext);
      // Force start from first candidate to ensure consistent look
      tryNext();
    });
  }

  // Smooth reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    })
  },{threshold: .12});
  $$('.reveal').forEach(el=>observer.observe(el));

  // Year footer
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Contact links (update phone and username as needed)
  const PHONE = '6285183565910'; // Nomor WhatsApp tujuan (format internasional, tanpa +)
  const IG_URL = 'https://www.instagram.com/timeless.projct/?utm_source=ig_web_button_share_sheet';
  const EMAIL = 'timelessgacor25@gmail.com'; // Alamat email tujuan

  function buildWaLink(text){
    const msg = encodeURIComponent(text || 'Halo Timeless, saya tertarik dengan layanan Anda.');
    const ua = navigator.userAgent || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    // On desktop, go straight to web.whatsapp.com to avoid api.whatsapp.com blocks
    if(!isMobile){
      return `https://web.whatsapp.com/send?phone=${PHONE}&text=${msg}&app_absent=0`;
    }
    // On mobile, wa.me is the most reliable universal link
    return `https://wa.me/${PHONE}?text=${msg}&app_absent=0`;
  }
  function buildIgLink(){
    return IG_URL;
  }

  const waButtons = ['#cta-wa', '#cta-wa-2', '#footer-wa', '#wa-hero', '#wa-contact']
    .map(sel=>$(sel)).filter(Boolean);
  waButtons.forEach(btn=>{
    btn.setAttribute('href', buildWaLink());
    btn.setAttribute('target','_blank');
    btn.setAttribute('rel','noopener');
  });

  const igButtons = ['#cta-ig', '#footer-ig', '#ig-contact']
    .map(sel=>$(sel)).filter(Boolean);
  igButtons.forEach(btn=>{
    btn.setAttribute('href', buildIgLink());
    btn.setAttribute('target','_blank');
    btn.setAttribute('rel','noopener');
  });

  // Direct email links
  function buildMailto(subject, body){
    const sub = encodeURIComponent(subject || 'Brief Layanan Timeless');
    const bod = encodeURIComponent(body || 'Halo Timeless, saya ingin mendiskusikan kebutuhan saya.');
    return `mailto:${EMAIL}?subject=${sub}&body=${bod}`;
  }
  const emailLinks = ['#email-direct', '#footer-email']
    .map(sel=>$(sel)).filter(Boolean);
  emailLinks.forEach(a => {
    a.setAttribute('href', buildMailto());
  });

  // Gallery lazy loader (reads data-src to support future assets)
  const lazyImgs = $$('img[data-src]');
  if(lazyImgs.length){
    const lazyObs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const img = e.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          lazyObs.unobserve(img);
        }
      })
    },{rootMargin:'200px'});
    lazyImgs.forEach(img=>lazyObs.observe(img));
  }

  // Autoplay/pause videos (hero + gallery) when in/out of view
  (function(){
    const videos = [
      ...$$('.hero-preview video'),
      ...$$('.gallery-tile.video video'),
      ...$$('.gallery-preview .placeholder.video video')
    ];
    if(!videos.length) return;

    // Ensure safe autoplay settings
    videos.forEach(v => { v.muted = true; v.playsInline = true; v.setAttribute('playsinline',''); });

    const tryPlay = (v)=>{
      const p = v.play();
      if(p && typeof p.then === 'function'){
        p.catch(()=>{/* ignore autoplay rejection */});
      }
    };
    const pause = (v)=>{ try{ v.pause(); }catch(_){} };

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(({isIntersecting, target})=>{
        if(isIntersecting){ tryPlay(target); } else { pause(target); }
      });
    },{rootMargin:'0px 0px -10% 0px', threshold: .2});

    videos.forEach(v=>io.observe(v));

    // Page visibility handling
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden){ videos.forEach(pause); }
      else {
        videos.forEach(v => {
          // Only play if in view
          const rect = v.getBoundingClientRect();
          const inView = rect.bottom > 0 && rect.right > 0 && rect.top < (window.innerHeight||document.documentElement.clientHeight) && rect.left < (window.innerWidth||document.documentElement.clientWidth);
          if(inView) tryPlay(v);
        });
      }
    });
  })();
})();
