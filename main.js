// Main interactivity: theme toggle, hamburger, smooth scroll, back-to-top, reveal
(function(){
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('.nav-list');
  const loader = document.getElementById('loader');
  const backToTop = document.getElementById('back-to-top');
  const yearEl = document.getElementById('year');

  // Set year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Remove loader after load
  window.addEventListener('load', ()=>{
    if(loader) loader.style.display = 'none';
    document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('revealed'));
  });

  // Theme
  const preferred = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  if(preferred === 'light') document.documentElement.setAttribute('data-theme','light');
  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
  }
  if(themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Hamburger
  if(hamburger){
    hamburger.addEventListener('click', ()=>{
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
      navList.style.flexDirection = 'column';
      navList.style.background = 'transparent';
      navList.style.padding = '8px';
      navList.style.position = 'absolute';
      navList.style.right = '18px';
      navList.style.top = '64px';
      navList.style.zIndex = '60';
    });
  }
 const sections = document.querySelectorAll('section');
  function onScroll(){
    const scrollPos = window.scrollY + (window.innerHeight/3);
    sections.forEach(sec=>{
      const rect = sec.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const id = sec.id;
      const link = document.querySelector('.nav-link[href="#'+id+'"]');
      if(link){
        if(window.scrollY >= top - 80 && window.scrollY < top + rect.height){
          document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });

    // back to top
    if(window.scrollY > 400){backToTop.style.display = 'block'} else {backToTop.style.display = 'none'}
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if(backToTop){
    backToTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  // Reveal on scroll using IntersectionObserver
  const revealEls = document.querySelectorAll('.section, .project-card, .edu-card, .skill-card, .ach-card, .profile-card');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  revealEls.forEach(el=>{el.setAttribute('data-reveal',''); obs.observe(el)});

  // Simple contact form handler (client-only placeholder)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if(!name || !email || !message){
        alert('Please fill the required fields.');
        return;
      }
      alert('Thanks, '+name+"! This is a demo form. Replace with your backend or a service like Formspree.");
      contactForm.reset();
    });
  }
})();
