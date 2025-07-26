document.addEventListener('DOMContentLoaded', function() {
    // Questions data
    const questionsBySubject = {
        physics: [
            {
                id: 1,
                title: "Which one of these is a vector quantity?",
                difficulty: "medium",
                type: "MCQ",
                options: ["Force", "Mass", "Pressure", "None"],
                answer: "Force",
                explanation: "Force is a vector quantity because it has both magnitude and direction. Mass and pressure are scalar quantities as they only have magnitude."
            

            },
            {
                id: 2,  // Increment ID
            title: "What is the SI unit of electric current?",
            difficulty: "easy",
            type: "MCQ",
            options: ["Ampere", "Volt", "Ohm", "Watt"],
            answer: "Ampere",
            explanation: "The ampere (A) is the SI base unit of electric current..."
            }
           
        ],

         math: [  // Add a new subject category
        {
            id: 1,
            title: "What is the value of π (pi) to two decimal places?",
            difficulty: "easy",
            type: "MCQ",
            options: ["3.14", "3.16", "3.12", "3.18"],
            answer: "3.14",
            explanation: "π is a mathematical constant approximately equal to 3.14159..."
        }
    ]
    };

    // Modal elements
    const modal = document.getElementById('questionsModal');
    const modalTitle = document.getElementById('modalSubjectTitle');
    const questionsList = document.getElementById('questionsList');
    const closeModal = document.querySelector('.close-modal');

    // Function to open modal with questions for a subject
    function openQuestionsModal(subject) {
        const subjectName = document.querySelector(`.subject-card[data-subject="${subject}"] h3`).textContent;
        modalTitle.textContent = `${subjectName} Questions`;
        
        // Clear previous questions
        questionsList.innerHTML = '';
        
        // Get questions for this subject
        const questions = questionsBySubject[subject] || [];
        
        if (questions.length === 0) {
            questionsList.innerHTML = '<p>No questions available for this subject yet.</p>';
        } else {
            questions.forEach(question => {
                const questionItem = document.createElement('div');
                questionItem.className = 'question-item';
                
                // Determine difficulty class
                let difficultyClass = '';
                switch(question.difficulty) {
                    case 'easy': difficultyClass = 'difficulty-easy'; break;
                    case 'medium': difficultyClass = 'difficulty-medium'; break;
                    case 'hard': difficultyClass = 'difficulty-hard'; break;
                }
                
                questionItem.innerHTML = `
                    <div class="question-header">
                        <h3>${question.title}</h3>
                        <span class="question-difficulty ${difficultyClass}">
                            ${question.difficulty}
                        </span>
                    </div>
                    <div class="question-options">
                        ${question.options.map(opt => 
                            `<div class="option">${opt}</div>`
                        ).join('')}
                    </div>
                    ${question.explanation ? 
                        `<div class="explanation">
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>` : ''}
                `;
                questionsList.appendChild(questionItem);
                
                // Add click events to options
                questionItem.querySelectorAll('.option').forEach(option => {
                    option.addEventListener('click', function() {
                        // Remove previous selections
                        this.parentNode.querySelectorAll('.option').forEach(opt => {
                            opt.classList.remove('correct', 'incorrect');
                        });
                        
                        // Mark selected option
                        if (this.textContent === question.answer) {
                            this.classList.add('correct');
                        } else {
                            this.classList.add('incorrect');
                            // Also highlight the correct answer
                            this.parentNode.querySelectorAll('.option').forEach(opt => {
                                if (opt.textContent === question.answer) {
                                    opt.classList.add('correct');
                                }
                            });
                        }
                    });
                });
            });
        }
        
        modal.style.display = 'block';
    }

    // Close modal when clicking X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add click events to subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            openQuestionsModal(subject);
        });
    });
});