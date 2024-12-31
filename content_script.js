const css_class = 'remove'; // For possible future use cases (disable, dim, minimize, etc.)

const hidePaidContent = () => {
  document
  .querySelectorAll('[data-testid="main-lane-container"] article')
  .forEach((article) => {
    const paid_indicators = article.querySelectorAll('.paid-indicator');
    paid_indicators.forEach((indicator) => {
      if (indicator.closest('article') !== article) return;
      if (indicator.closest('.related-articles')) {
        indicator.closest('.related-articles__link').classList.add('hspaid-'+css_class);
        return;
      }
      article.classList.add('hspaid-'+css_class);
    });
  });
  document.querySelectorAll('aside article li').forEach((el) => {
    if (el.querySelector('.paid-indicator')) {
      el.classList.add('hspaid-'+css_class);
    }
  });
  const top_stuff = [...document.querySelectorAll('*')].filter((el) => {
    return Array.from(el.classList).some((cls) => {
      return cls.startsWith('ticker-') && cls.endsWith('-paid');
    });
  });
  top_stuff.forEach((el) => {
    el.classList.add('hspaid-'+css_class);
  });  
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      hidePaidContent();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
