const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const shareButton = document.querySelector('#share-button');
const shareLabel = document.querySelector('#share-label');
const boostButton = document.querySelector('#mercy-mode');
const boostStatus = document.querySelector('#boost-status');
const musicButton = document.querySelector('#music-button');
const musicLabel = document.querySelector('#music-label');
const profileCard = document.querySelector('.profile-card');
const ambientAudio = document.querySelector('#ambient-audio');

shareButton?.addEventListener('click', async () => {
  const shareData = { title: 'ntgabyy — links oficiais', text: 'Chega mais na ntgabyy!', url: window.location.href };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    shareLabel.textContent = 'Link copiado!';
    window.setTimeout(() => { shareLabel.textContent = 'Compartilhar'; }, 2200);
  } catch {
    // Cancelar a janela de compartilhamento não exige mensagem.
  }
});

function toggleMercyMode() {
  const enabled = document.body.classList.toggle('mercy-boosted');
  boostButton?.setAttribute('aria-pressed', String(enabled));
  if (boostStatus) boostStatus.textContent = enabled ? 'MOOD: DAMAGE BOOST' : 'MOOD: BEM ROSA';
}
boostButton?.addEventListener('click', toggleMercyMode);

function setAmbientState(playing) {
  musicButton?.classList.toggle('is-playing', playing);
  musicButton?.setAttribute('aria-pressed', String(playing));
  if (musicLabel) musicLabel.textContent = playing ? 'Som ligado' : 'Som ambiente';
}

async function toggleAmbient() {
  if (!ambientAudio) return;
  if (!ambientAudio.paused) {
    ambientAudio.pause();
    return;
  }
  ambientAudio.volume = 0.22;
  try {
    await ambientAudio.play();
  } catch {
    if (musicLabel) musicLabel.textContent = 'Tente de novo';
  }
}
musicButton?.addEventListener('click', () => { void toggleAmbient(); });
ambientAudio?.addEventListener('play', () => setAmbientState(true));
ambientAudio?.addEventListener('pause', () => setAmbientState(false));

function activateEasterEgg(event) {
  document.body.classList.remove('mercy-rush');
  void document.body.offsetWidth;
  document.body.classList.add('mercy-rush');
  const toast = document.createElement('p');
  toast.className = 'easter-toast';
  toast.textContent = 'MERCY MODE // RESURRECTED';
  document.body.append(toast);

  const centerX = event?.clientX || window.innerWidth / 2;
  const centerY = event?.clientY || window.innerHeight / 2;
  if (!reduceMotion) {
    for (let index = 0; index < 13; index += 1) {
      const spark = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 13;
      const distance = 55 + Math.random() * 90;
      spark.className = 'mercy-spark';
      spark.style.left = centerX + 'px';
      spark.style.top = centerY + 'px';
      spark.style.setProperty('--spark-x', Math.cos(angle) * distance + 'px');
      spark.style.setProperty('--spark-y', Math.sin(angle) * distance + 'px');
      document.body.append(spark);
      window.setTimeout(() => spark.remove(), 1000);
    }
  }
  window.setTimeout(() => {
    document.body.classList.remove('mercy-rush');
    toast.remove();
  }, 2900);
}

profileCard?.addEventListener('dblclick', activateEasterEgg);
profileCard?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    activateEasterEgg(event);
  }
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  const editing = target instanceof HTMLElement && /input|textarea|select/i.test(target.tagName);
  if (!editing && event.key.toLowerCase() === 'm') toggleMercyMode();
});

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.portal-card, .profile-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      const rotateY = ((x - 50) / 50) * 2.5;
      const rotateX = ((50 - y) / 50) * 2.5;
      card.style.setProperty('--pointer-x', x + '%');
      card.style.setProperty('--pointer-y', y + '%');
      card.style.transform = 'translateY(-4px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('transform');
      card.style.removeProperty('--pointer-x');
      card.style.removeProperty('--pointer-y');
    });
    card.addEventListener('pointerdown', () => card.classList.add('is-pressed'));
    card.addEventListener('pointerup', () => card.classList.remove('is-pressed'));
    card.addEventListener('pointercancel', () => card.classList.remove('is-pressed'));
  });
}
