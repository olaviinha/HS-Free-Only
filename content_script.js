const css_class = 'remove';
const html = document.querySelector('html');

const hidePaidContent = () => {
  document
  .querySelectorAll('[data-testid="main-lane-container"] article')
  .forEach((article) => {
    const paidIndicators = article.querySelectorAll('.paid-indicator');
    paidIndicators.forEach((indicator) => {
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
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      hidePaidContent();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
