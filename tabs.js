document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const prevButton = document.querySelector('.nav-btn.prev');
  const nextButton = document.querySelector('.nav-btn.next');

  let currentTabIndex = 0;

  // Enhanced tab animations
  function showTab(index) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    tabButtons[index].classList.add('active');
    tabContents[index].classList.add('active');

    // Scroll tab into view if necessary
    tabButtons[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    // Update navigation buttons
    prevButton.disabled = index === 0;
    nextButton.disabled = index === tabButtons.length - 1;

    currentTabIndex = index;

    // Enhanced animation
    const activeContent = tabContents[index];
    activeContent.style.opacity = '0';
    activeContent.style.transform = 'translateY(30px) scale(0.98)';

    requestAnimationFrame(() => {
      activeContent.style.opacity = '1';
      activeContent.style.transform = 'translateY(0) scale(1)';
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showTab(index);
    });
  });

  prevButton.addEventListener('click', () => {
    if (currentTabIndex > 0) {
      showTab(currentTabIndex - 1);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentTabIndex < tabButtons.length - 1) {
      showTab(currentTabIndex + 1);
    }
  });

  // Initialize the first tab
  showTab(0);

  // Enhanced star rating interaction with smoother animations
  const stars = document.querySelectorAll('.stars i');
  stars.forEach((star, idx) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => {
        if (i <= idx) {
          s.style.transform = 'scale(1.2) rotate(5deg)';
          s.style.color = '#fbbf24';
          s.style.background = 'rgba(251, 191, 36, 0.1)';
        }
      });
    });

    star.addEventListener('mouseout', () => {
      stars.forEach(s => {
        if (!s.classList.contains('selected')) {
          s.style.transform = 'scale(1) rotate(0)';
          s.style.color = '#e5e7eb';
          s.style.background = 'transparent';
        }
      });
    });

    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        if (i <= idx) {
          s.classList.add('selected');
          s.style.color = '#fbbf24';
          s.style.transform = 'scale(1.1) rotate(0)';
          s.style.background = 'rgba(251, 191, 36, 0.1)';
        } else {
          s.classList.remove('selected');
          s.style.color = '#e5e7eb';
          s.style.transform = 'scale(1) rotate(0)';
          s.style.background = 'transparent';
        }
      });
    });
  });

  // Add smooth scroll with offset
  function scrollToTab(tab) {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const container = document.querySelector('.tabs-scroll');
    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const scrollLeft = container.scrollLeft + tabRect.left - containerRect.left -
      (containerRect.width / 2) + (tabRect.width / 2);

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });

    // Scroll page to tabs with header offset
    const tabsSection = document.querySelector('.tabs-section');
    const yOffset = -headerHeight - 20; // Additional 20px buffer
    const y = tabsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }

  // Enhance keyboard navigation
  tabButtons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Add textarea auto-resize
  const textarea = document.querySelector('.feedback-form textarea');
  textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // Add feedback form submission animation
  const feedbackForm = document.querySelector('.feedback-form');
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = feedbackForm.querySelector('button');
    button.innerHTML = '<i class="fas fa-check"></i> Submitted!';
    button.style.background = '#22c55e';
    setTimeout(() => {
      button.innerHTML = 'Submit Feedback';
      button.style.background = '';
      feedbackForm.reset();
    }, 2000);
  });

  const reportBug = document.querySelector('.report-bug');
  const reportModal = document.querySelector('.report-modal');
  const closeModal = document.querySelector('.close-modal');
  const bugForm = document.querySelector('.report-form form');

  reportBug.addEventListener('click', () => {
    reportModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', () => {
    reportModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  reportModal.addEventListener('click', (e) => {
    if (e.target === reportModal) {
      reportModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  bugForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const issueType = document.getElementById('bug-title').value;
    const description = document.getElementById('bug-description').value;
    const email = document.getElementById('bug-email').value;
    const includeScreenshot = document.getElementById('include-screenshot').checked;

    // Here you would typically send this data to your backend
    console.log('Bug Report:', {
      issueType,
      description,
      email,
      includeScreenshot
    });

    // Show success message
    const submitButton = bugForm.querySelector('.submit-bug');
    submitButton.innerHTML = '<i class="fas fa-check"></i> Submitted!';
    submitButton.style.background = '#22c55e';

    // Reset form and close modal after delay
    setTimeout(() => {
      submitButton.innerHTML = 'Submit Report';
      submitButton.style.background = '';
      bugForm.reset();
      reportModal.classList.remove('active');
      document.body.style.overflow = '';
    }, 2000);
  });

  const difficultyBtns = document.querySelectorAll('.difficulty-btn');

  difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      difficultyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Here you would load questions based on difficulty
      loadQuizQuestions(btn.dataset.level);
    });
  });

  // Bubble Sort Tab Interaction
  const bubbleSortBtns = document.querySelectorAll('.bubble-sort-btn');
  const bubbleSortTabs = document.querySelectorAll('.bubble-sort-tab');

  bubbleSortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bubbleSortBtns.forEach(b => b.classList.remove('active'));
      bubbleSortTabs.forEach(tab => tab.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.dataset.bubbleTab;
      document.getElementById(tabId).classList.add('active');
    });
  });
});

function loadQuizQuestions(level) {
  // Implement quiz loading logic here
  console.log(`Loading ${level} questions`);
}

function showQuizResults(score) {
  const results = document.querySelector('.quiz-results');
  const scoreDisplay = results.querySelector('.score-display');
  results.classList.remove('hidden');
  scoreDisplay.textContent = `Your Score: ${score}%`;

  // Add confetti animation
  createConfetti();
}

function createConfetti() {
  // Implement confetti animation
  // You can use a library like canvas-confetti
}