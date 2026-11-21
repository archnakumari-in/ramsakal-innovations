(() => {
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('scrollProgress');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('enquiryForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const clean = value => String(value ?? '').trim();
    const message = [
      'Hello RAMSAKAL INNOVATIONS! I would like to discuss a project.', '',
      `Name: ${clean(data.get('name'))}`,
      `Phone / WhatsApp: ${clean(data.get('phone'))}`,
      `Email: ${clean(data.get('email')) || 'Not provided'}`,
      `Service: ${clean(data.get('service'))}`,
      `Budget: ${clean(data.get('budget')) || 'Not decided'}`,
      '', `Project details: ${clean(data.get('message'))}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/917571054064?text=${encodeURIComponent(message)}`;
    const status = document.getElementById('formStatus');
    status.textContent = 'Your enquiry is ready. WhatsApp will open with all your details filled in. Please press Send in WhatsApp to deliver it to RAMSAKAL INNOVATIONS.';
    status.setAttribute('role', 'status');

    // Navigate in the same tab to avoid popup blockers preventing WhatsApp from opening.
    window.location.assign(whatsappUrl);
  });
})();
