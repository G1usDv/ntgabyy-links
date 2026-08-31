document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener('click', () => link.classList.add('visited-link'));
});
