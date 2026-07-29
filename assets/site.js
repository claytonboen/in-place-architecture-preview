(() => {
  const trigger = document.querySelector('.menu-trigger');
  const menu = document.querySelector('.site-menu');
  const menuLinks = menu ? Array.from(menu.querySelectorAll('a')) : [];
  let open = false;

  function setMenu(nextOpen, restoreFocus = false) {
    open = nextOpen;
    if (!trigger || !menu) return;
    trigger.textContent = open ? 'Close' : 'Menu';
    trigger.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('site-menu--open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuLinks.forEach((link) => link.tabIndex = open ? 0 : -1);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menuLinks[0]?.focus();
    if (!open && restoreFocus) trigger.focus();
  }

  trigger?.addEventListener('click', () => setMenu(!open));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) setMenu(false, true);
  });

  const choices = Array.from(document.querySelectorAll('.gateway__choices > a'));
  const stageImage = document.querySelector('.gateway__stage img');
  const captions = document.querySelectorAll('.gateway__stage figcaption span');

  choices.forEach((choice, index) => {
    const preview = choice.querySelector('.gateway__mobile-image');
    const title = choice.querySelector('.gateway__title');
    const activate = () => {
      choices.forEach((item) => item.classList.remove('is-active'));
      choice.classList.add('is-active');
      if (stageImage && preview) {
        stageImage.src = preview.src;
        stageImage.srcset = preview.srcset;
        stageImage.alt = preview.alt;
      }
      if (captions[0]) captions[0].textContent = String(index + 1).padStart(2, '0');
      if (captions[1] && title) captions[1].textContent = title.textContent;
    };
    choice.addEventListener('mouseenter', activate);
    choice.addEventListener('focus', activate);
  });
})();