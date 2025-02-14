// Simple confetti effect
function createConfetti() {
  const colors = ['#16a34a', '#22c55e', '#4ade80', '#86efac'];
  const numConfetti = 150;
  
  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.opacity = Math.random();
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    document.querySelector('.confetti-container').appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => confetti.remove(), 5000);
  }
}