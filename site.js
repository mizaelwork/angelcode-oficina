(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.topbar');
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const closeMenu = (focus = false) => {
    header.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    if (focus) button.focus();
  };
  button.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('is-open')) closeMenu(true); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeMenu(); });
  matchMedia('(min-width: 1101px)').addEventListener('change', () => closeMenu());

  const setupScanner = () => {
    const scanner = document.querySelector('[data-scan]');
    if (!scanner) return;
    const areas = [...scanner.querySelectorAll('[data-area]')];
    const logs = [...scanner.querySelectorAll('[data-log] p')];
    const gaugeBars = [...scanner.querySelectorAll('[data-gauge] i')];
    const power = scanner.querySelector('[data-power]');
    const powerLabel = scanner.querySelector('[data-power-label]');
    const gaugeRead = scanner.querySelector('[data-gauge-read]');
    const dialValue = scanner.querySelector('[data-dial-value]');
    const dialLabel = scanner.querySelector('[data-dial-label]');
    const finalStatus = ['gargalo', 'gargalo', 'gargalo', 'regulado', 'gargalo'];
    const timers = [];

    const showFinalState = () => {
      scanner.classList.remove('is-running');
      scanner.classList.add('is-projecting', 'is-complete');
      areas.forEach((area, index) => {
        area.classList.remove('is-scanning');
        area.classList.add('is-found');
        area.querySelector('[data-status]').textContent = finalStatus[index];
      });
      logs.forEach(line => line.classList.add('is-visible'));
      gaugeBars.forEach((bar, index) => bar.classList.toggle('is-on', index < 25));
      powerLabel.textContent = 'potência projetada';
      power.textContent = '91%';
      gaugeRead.textContent = '91%';
      dialValue.textContent = '91';
      dialLabel.textContent = 'potência projetada';
    };

    if (motion.matches || !('IntersectionObserver' in window)) {
      showFinalState();
      return;
    }

    const countPower = () => {
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(54 + 37 * eased);
        dialValue.textContent = String(value);
        power.textContent = `${value}%`;
        gaugeRead.textContent = `${value}%`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const play = () => {
      scanner.classList.add('is-running');
      areas.forEach((area, index) => {
        area.classList.remove('is-found');
        area.querySelector('[data-status]').textContent = 'aguardando';
        const start = 450 + index * 620;
        timers.push(setTimeout(() => {
          areas.forEach(item => item.classList.remove('is-scanning'));
          area.classList.add('is-scanning');
          area.querySelector('[data-status]').textContent = 'analisando';
        }, start));
        timers.push(setTimeout(() => {
          area.classList.remove('is-scanning');
          area.classList.add('is-found');
          area.querySelector('[data-status]').textContent = finalStatus[index];
          if (logs[index]) logs[index].classList.add('is-visible');
        }, start + 430));
      });
      timers.push(setTimeout(() => {
        scanner.classList.add('is-projecting');
        powerLabel.textContent = 'potência projetada';
        dialLabel.textContent = 'potência projetada';
        gaugeBars.forEach((bar, index) => bar.classList.toggle('is-on', index < 25));
        countPower();
      }, 3900));
      timers.push(setTimeout(showFinalState, 5200));
    };

    const scannerObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      scannerObserver.disconnect();
      play();
    }, { threshold: 0.42 });
    scannerObserver.observe(scanner);
  };

  setupScanner();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.06, rootMargin: '0px 0px 40px 0px' });
    if (!motion.matches) document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('reveal-pending'); observer.observe(el);
      }
    });
    motion.addEventListener('change', () => {
      if (motion.matches) {
        document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
        observer.disconnect();
      }
    });
    new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      {rootMargin: '-90px 0px 0px 0px'}).observe(document.querySelector('.hero'));
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const spy = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => {
        if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }), { rootMargin: '-15% 0px -65% 0px' });
    links.forEach(a => { const section = document.querySelector(a.hash); if (section) spy.observe(section); });
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
