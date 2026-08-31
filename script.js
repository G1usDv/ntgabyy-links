const shareButton = document.getElementById('share-button');
const toast = document.getElementById('toast');

shareButton.addEventListener('click', async () => {
  const shareData = {
    title: 'ntgabyy — links',
    text: 'Overwatch, lives e comunidade.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1900);
  } catch (error) {
    if (error.name !== 'AbortError') {
      toast.textContent = 'Não foi possível compartilhar agora.';
      toast.classList.add('show');
      window.setTimeout(() => {
        toast.classList.remove('show');
        toast.textContent = 'Link copiado. Chama o squad!';
      }, 2200);
    }
  }
});
