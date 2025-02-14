const quizQuestions = {
  beginner: [
    {
      question: "What is Bubble Sort?",
      options: [
        "A sorting algorithm that works by repeatedly swapping adjacent elements",
        "A search algorithm",
        "A data structure"
      ],
      correct: 0
    },
    {
      question: "What is the best case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n²)", "O(log n)"],
      correct: 0
    },
    // Add more beginner questions
  ],
  intermediate: [
    {
      question: "What modification makes Bubble Sort adaptive?", 
      options: [
        "Adding a flag to check if any swaps occurred",
        "Reducing the array size",
        "Using recursion"
      ],
      correct: 0
    },
    {
      question: "Is Bubble Sort stable?",
      options: ["Yes", "No", "Depends on implementation"],
      correct: 0
    },
    // Add more intermediate questions
  ],
  advanced: [
    {
      question: "What is the space complexity of Bubble Sort?",
      options: ["O(1)", "O(n)", "O(n²)"],
      correct: 0
    },
    {
      question: "Which optimization technique works best with nearly sorted arrays?",
      options: [
        "Early termination with flag",
        "Recursive implementation", 
        "Parallel sorting"
      ],
      correct: 0
    },
    // Add more advanced questions
  ]
};

class Quiz {
  constructor(questions, container) {
    this.questions = questions;
    this.container = container;
    this.currentQuestion = 0;
    this.score = 0;
    this.container.innerHTML = '';
  }

  showQuestion() {
    const question = this.questions[this.currentQuestion];
    const questionHTML = `
      <div class="question">
        <h3>Question ${this.currentQuestion + 1}/${this.questions.length}</h3>
        <p>${question.question}</p>
        <div class="options">
          ${question.options.map((option, index) => `
            <button class="option-btn" data-index="${index}">
              ${option}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    this.container.innerHTML = questionHTML;
    
    // Add event listeners to options
    const options = this.container.querySelectorAll('.option-btn');
    options.forEach(option => {
      option.addEventListener('click', () => this.checkAnswer(parseInt(option.dataset.index)));
    });
  }

  checkAnswer(selected) {
    const question = this.questions[this.currentQuestion];
    if (selected === question.correct) {
      this.score++;
    }
    
    this.currentQuestion++;
    
    if (this.currentQuestion < this.questions.length) {
      this.showQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const percentage = (this.score / this.questions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
      message = 'Perfect! Outstanding performance! ';
    } else if (percentage >= 80) {
      message = 'Excellent work! Keep it up! ';
    } else if (percentage >= 60) {
      message = 'Good job! Room for improvement! ';
    } else {
      message = 'Keep practicing! You can do better! ';
    }

    this.container.innerHTML = `
      <div class="quiz-results">
        <div class="score-display">Your Score: ${percentage}%</div>
        <p class="appreciation">${message}</p>
        <div class="confetti-container"></div>
      </div>
    `;
    
    // Show confetti for scores above 60%
    if (percentage >= 60) {
      createConfetti();
    }
  }
}

// Quiz initialization
document.addEventListener('DOMContentLoaded', () => {
  const quizSections = document.querySelectorAll('.quiz-section');
  
  quizSections.forEach(section => {
    const quizContainer = section.querySelector('.quiz-container');
    const difficultyBtns = section.querySelectorAll('.difficulty-btn');
    
    // Initialize with beginner questions
    let currentQuiz = new Quiz(quizQuestions.beginner, quizContainer);
    currentQuiz.showQuestion();
    
    // Handle difficulty selection
    difficultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const difficulty = btn.dataset.level;
        currentQuiz = new Quiz(quizQuestions[difficulty], quizContainer);
        currentQuiz.showQuestion();
      });
    });
  });
});

function createConfetti() {
  // Implement confetti animation
  // You can use a library like canvas-confetti
}