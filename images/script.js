// Theme handling
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeText = themeToggle.querySelector('.theme-text');

// Certificate handling
const modal = document.getElementById('certificateModal');
const closeModal = document.querySelector('.close-modal');
const certificateForm = document.getElementById('certificateForm');
let currentCourseId = null;

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle certificate form submission
certificateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const course = document.getElementById('courseName').value;
    const date = document.getElementById('completionDate').value;
    
    if (!name || !course || !date) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        await generateCertificate(name, course, date);
        modal.style.display = 'none';
    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('There was an error generating the certificate. Please try again.');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    themeText.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
}

// Sample course data
const courses = [
    {
        id: 1,
        title: "Web Development",
        description: "Learn full-stack web development",
        image: "web.jpg",
        roadmap: [
            { title: "HTML & CSS Basics", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "JavaScript Fundamentals", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "React & Node.js", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Web Development Quiz",
            questions: [
                {
                    question: "What is HTML?",
                    options: ["A programming language", "A markup language", "A styling language", "A database language"],
                    correct: 1
                },
                {
                    question: "Which of these is a JavaScript framework?",
                    options: ["Django", "Flask", "React", "Laravel"],
                    correct: 2
                },
                {
                    question: "What does CSS stand for?",
                    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
                    correct: 2
                }
            ],
            timeLimit: 300 // 5 minutes in seconds
        }
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Master Python programming language",
        image: "python3.jpg",
        roadmap: [
            { title: "Python Basics", videoUrl: "https://youtu.be/K5KVEU3aaeQ?si=VP2DFrk-GsVHBAu3" },
            { title: "Data Structures", videoUrl: "https://youtu.be/pkYVOmU3MgA?si=TBtR6w8aL8orbtf9" },
            { title: "Object-Oriented Programming", videoUrl: "https://youtu.be/ecJCVJOSfcs?si=onkowOt9M0PwUbAA" }
        ],
        quiz: {
            title: "Python Programming Quiz",
            questions: [
                {
                    question: "Which of the following is used to define a function in Python?",
                    options: ["function", "def", "fun", "define"],
                    correct: 1
                },
                {
                    question: "Which of the following is not a valid Python data type?",
                    options: ["int", "float", "real", "str"],
                    correct: 2
                },
                {
                    question: "How do you start a comment in Python?",
                    options: ["//", "#", "--", "/*"],
                    correct: 1
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 3,
        title: "Data Science",
        description: "Learn data analysis and visualization",
        image: "data.jpg",
        roadmap: [
            { title: "Data Analysis Basics", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "Data Visualization", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "Machine Learning Intro", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Data Science Quiz",
            questions: [
                {
                    question: "What is the primary purpose of data visualization?",
                    options: ["To store data", "To analyze data", "To communicate insights", "To clean data"],
                    correct: 2
                },
                {
                    question: "Which library is commonly used for data analysis in Python?",
                    options: ["TensorFlow", "Pandas", "Django", "Flask"],
                    correct: 1
                },
                {
                    question: "What is the first step in the data science process?",
                    options: ["Model Building", "Data Collection", "Data Visualization", "Feature Engineering"],
                    correct: 1
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 4,
        title: "Cloud Computing",
        description: "Master cloud platforms and services",
        image: "cc.jpg",
        roadmap: [
            { title: "Cloud Fundamentals", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "AWS Services", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "Cloud Security", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Cloud Computing Quiz",
            questions: [
                {
                    question: "What is the main advantage of cloud computing?",
                    options: ["Lower costs", "Better security", "Faster internet", "More storage"],
                    correct: 0
                },
                {
                    question: "Which service model provides virtual machines?",
                    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
                    correct: 2
                },
                {
                    question: "What does AWS stand for?",
                    options: ["Amazon Web Services", "Advanced Web Systems", "Automated Web Solutions", "Application Web Services"],
                    correct: 0
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 5,
        title: "Cybersecurity",
        description: "Learn security fundamentals and practices",
        image: "cyber.jpg",
        roadmap: [
            { title: "Security Basics", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "Network Security", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "Ethical Hacking", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Cybersecurity Quiz",
            questions: [
                {
                    question: "What is the purpose of a firewall?",
                    options: ["To store data", "To block unauthorized access", "To speed up internet", "To backup files"],
                    correct: 1
                },
                {
                    question: "Which of these is a common type of cyber attack?",
                    options: ["Data backup", "System update", "Phishing", "File compression"],
                    correct: 2
                },
                {
                    question: "What is encryption used for?",
                    options: ["To delete data", "To compress files", "To protect data", "To speed up systems"],
                    correct: 2
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 6,
        title: "Artificial Intelligence",
        description: "Explore AI and machine learning",
        image: "ai.jpg",
        roadmap: [
            { title: "AI Fundamentals", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "Machine Learning", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "Deep Learning", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "AI Quiz",
            questions: [
                {
                    question: "What is machine learning?",
                    options: ["A type of computer", "A programming language", "A subset of AI", "A database system"],
                    correct: 2
                },
                {
                    question: "Which of these is a common ML algorithm?",
                    options: ["HTML", "CSS", "JavaScript", "Neural Network"],
                    correct: 3
                },
                {
                    question: "What is the purpose of training data in ML?",
                    options: ["To store results", "To teach the model", "To backup data", "To display graphics"],
                    correct: 1
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 7,
        title: "Operating Systems",
        description: "Learn OS concepts and management",
        image: "operating.jpg",
        roadmap: [
            { title: "OS Basics", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "Process Management", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "Memory Management", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Operating Systems Quiz",
            questions: [
                {
                    question: "What is the main function of an OS?",
                    options: ["To run games", "To manage hardware", "To browse internet", "To edit photos"],
                    correct: 1
                },
                {
                    question: "Which of these is not an OS?",
                    options: ["Windows", "Linux", "Python", "macOS"],
                    correct: 2
                },
                {
                    question: "What is a process in OS?",
                    options: ["A file", "A program in execution", "A folder", "A device"],
                    correct: 1
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 8,
        title: "Blockchain",
        description: "Master blockchain technology",
        image: "bc.jpg",
        roadmap: [
            { title: "Blockchain Basics", videoUrl: "https://youtu.be/UB1O30fR-EE?si=YwXqXqXqXqXqXqXq" },
            { title: "Smart Contracts", videoUrl: "https://youtu.be/W6NZfCO5SIk?si=YwXqXqXqXqXqXqXq" },
            { title: "DApps Development", videoUrl: "https://youtu.be/4UZrsTqkcyY?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "Blockchain Quiz",
            questions: [
                {
                    question: "What is a blockchain?",
                    options: ["A type of database", "A programming language", "A computer", "A network protocol"],
                    correct: 0
                },
                {
                    question: "What is a smart contract?",
                    options: ["A legal document", "Self-executing code", "A type of cryptocurrency", "A blockchain"],
                    correct: 1
                },
                {
                    question: "Which cryptocurrency uses blockchain?",
                    options: ["Bitcoin", "Python", "Java", "C++"],
                    correct: 0
                }
            ],
            timeLimit: 300
        }
    },
    {
        id: 9,
        title: "UI/UX Design",
        description: "Master user interface and experience design",
        image: "ui.jpg",
        roadmap: [
            { title: "Design Principles & Figma Basics", videoUrl: "https://youtu.be/FTFaQWZBqQ8?si=YwXqXqXqXqXqXqXq" },
            { title: "User Research & Wireframing", videoUrl: "https://youtu.be/0WtYhkkTRHk?si=YwXqXqXqXqXqXqXq" },
            { title: "Prototyping & User Testing", videoUrl: "https://youtu.be/1wQqG6N4opU?si=YwXqXqXqXqXqXqXq" }
        ],
        quiz: {
            title: "UI/UX Design Quiz",
            questions: [
                {
                    question: "What is the difference between UI and UX?",
                    options: ["They are the same", "UI is visual, UX is experience", "UI is code, UX is design", "UI is backend, UX is frontend"],
                    correct: 1
                },
                {
                    question: "What is wireframing?",
                    options: ["A type of animation", "A visual guide for layout", "A coding language", "A design tool"],
                    correct: 1
                },
                {
                    question: "What is the purpose of user testing?",
                    options: ["To find bugs", "To improve user experience", "To speed up the app", "To add features"],
                    correct: 1
                }
            ],
            timeLimit: 300
        }
    }
];

// Generate certificate function
async function generateCertificate(name, course, date) {
    const template = document.getElementById('certificateTemplate');
    const certificate = template.cloneNode(true);
    certificate.id = 'generatedCertificate';
    certificate.style.display = 'flex';
    
    // Set certificate content
    certificate.querySelector('.cert-name').textContent = name;
    certificate.querySelector('.cert-course').textContent = course;
    certificate.querySelector('.cert-date').textContent = new Date(date).toLocaleDateString();
    
    // Generate QR code
    const qrContainer = certificate.querySelector('.certificate-qr');
    const qrCode = new QRCode(qrContainer, {
        text: `https://ashreya.com/verify/${Math.random().toString(36).substring(2)}`,
        width: 80,
        height: 80,
        colorDark: '#6c5ce7',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Add certificate to document
    document.body.appendChild(certificate);
    
    // Convert to image
    html2canvas(certificate, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Certificate_${name.replace(/\s+/g, '_')}_${course.replace(/\s+/g, '_')}_${date.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Remove temporary certificate
        document.body.removeChild(certificate);
    });
}

// Quiz handling
const quizModal = document.getElementById('certificateQuizModal');
const closeQuizModal = document.querySelector('.close-quiz-modal');
const prevQuizBtn = document.getElementById('prevQuizBtn');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const submitQuizBtn = document.getElementById('submitQuizBtn');
const quizTimer = document.getElementById('quizTimer');
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 0;
let timerInterval = null;

// Close quiz modal
closeQuizModal.addEventListener('click', () => {
    quizModal.style.display = 'none';
    stopTimer();
});

// Start quiz
function startQuiz(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.quiz) return;

    currentQuiz = course.quiz;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    timeLeft = currentQuiz.timeLimit;
    
    // Reset UI
    document.getElementById('currentQuestion').textContent = '1';
    document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
    document.getElementById('quizQuestionContainer').innerHTML = '';
    document.getElementById('quizOptionsContainer').innerHTML = '';
    
    // Show quiz modal
    quizModal.style.display = 'block';
    
    // Start timer
    startTimer();
    
    // Show first question
    showQuestion();
}

// Show question
function showQuestion() {
    if (!currentQuiz || !currentQuiz.questions[currentQuestionIndex]) return;

    const question = currentQuiz.questions[currentQuestionIndex];
    const questionContainer = document.getElementById('quizQuestionContainer');
    const optionsContainer = document.getElementById('quizOptionsContainer');

    // Update question text
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
    `;

    // Update options
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="quiz-option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}" 
             onclick="selectOption(${index})">
            <input type="radio" name="option" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
            <label>${option}</label>
        </div>
    `).join('');

    // Update navigation buttons
    prevQuizBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    nextQuizBtn.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'none' : 'block';
    submitQuizBtn.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'block' : 'none';
}

// Select option
window.selectOption = function(index) {
    userAnswers[currentQuestionIndex] = index;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, i) => {
        option.classList.toggle('selected', i === index);
        option.querySelector('input[type="radio"]').checked = i === index;
    });
};

// Previous question
prevQuizBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
        showQuestion();
    }
});

// Next question
nextQuizBtn.addEventListener('click', () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
        showQuestion();
    }
});

// Submit quiz
submitQuizBtn.addEventListener('click', () => {
    stopTimer();
    const score = userAnswers.filter((ans, idx) => ans === currentQuiz.questions[idx].correct).length;
    const percentage = (score / currentQuiz.questions.length) * 100;
    
    // Show results
    const questionContainer = document.getElementById('quizQuestionContainer');
    const optionsContainer = document.getElementById('quizOptionsContainer');
    
    questionContainer.innerHTML = `
        <div class="results-header">
            <h3>Quiz Results</h3>
        </div>
        <div class="final-score">
            <div class="score-circle ${percentage >= 70 ? 'passed' : 'failed'}">
                <span class="score-number">${score}</span>
                <span class="score-total">/${currentQuiz.questions.length}</span>
            </div>
            <p class="score-message">
                ${percentage >= 70 
                    ? '<span style="color: #00b894; font-weight: bold;">Congratulations! You passed the exam.</span>' 
                    : '<span style="color: #d63031; font-weight: bold;">You did not pass. Keep practicing!</span>'}
            </p>
        </div>
    `;

    // Show summary
    optionsContainer.innerHTML = `
        <div class="quiz-summary">
            <h4>Question Summary</h4>
            <div class="quiz-summary-table">
                <div class="summary-header">
                    <span>Question</span>
                    <span>Status</span>
                </div>
                ${currentQuiz.questions.map((q, i) => {
                    const userAns = userAnswers[i];
                    const isCorrect = userAns === q.correct;
                    return `
                    <div class="summary-row ${isCorrect ? 'correct' : 'incorrect'}">
                        <span>Question ${i + 1}</span>
                        <span class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Hide navigation buttons
    prevQuizBtn.style.display = 'none';
    nextQuizBtn.style.display = 'none';
    submitQuizBtn.style.display = 'none';

    // If passed, show certificate button
    if (percentage >= 70) {
        const certificateBtn = document.createElement('button');
        certificateBtn.className = 'quiz-nav-btn';
        certificateBtn.textContent = 'Generate Certificate';
        certificateBtn.onclick = () => {
            quizModal.style.display = 'none';
            openCertificateModal(currentCourseId);
        };
        optionsContainer.appendChild(certificateBtn);
    } else {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'quiz-nav-btn';
        retryBtn.textContent = 'Try Again';
        retryBtn.onclick = () => {
            quizModal.style.display = 'none';
            startQuiz(currentCourseId);
        };
        optionsContainer.appendChild(retryBtn);
    }
});

// Timer functions
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            stopTimer();
            submitQuizBtn.click();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    quizTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Open certificate modal
function openCertificateModal(courseId) {
    currentCourseId = courseId;
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        alert('Course not found');
        return;
    }

    document.getElementById('courseName').value = course.title;
    document.getElementById('completionDate').valueAsDate = new Date();
    document.getElementById('studentName').value = ''; // Clear previous name
    modal.style.display = 'block';
}

// Video Modal handling
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalContent = videoModal.querySelector('.video-modal-content');
const videoCloseBtn = document.getElementById('videoCloseBtn');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Add dragging functionality
videoModalContent.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

// Touch events for mobile
videoModalContent.addEventListener('touchstart', dragStart);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', dragEnd);

function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === videoModalContent || e.target.parentNode === videoModalContent) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, videoModalContent);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

// Close video modal when clicking the close button
videoCloseBtn.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoFrame.src = ''; // Stop video playback
    // Reset position
    xOffset = 0;
    yOffset = 0;
    setTranslate(0, 0, videoModalContent);
});

// Close video modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // Stop video playback
        // Reset position
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, videoModalContent);
    }
});

// Function to extract YouTube video ID or playlist ID from URL
function getYouTubeVideoId(url) {
    // Handle playlist URLs
    if (url.includes('playlist?list=')) {
        const playlistId = url.split('playlist?list=')[1].split('&')[0];
        return {
            type: 'playlist',
            id: playlistId
        };
    }
    
    // Handle regular video URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return {
            type: 'video',
            id: match[2]
        };
    }
    
    return null;
}

// Function to open video modal
function openVideoModal(videoUrl) {
    const videoInfo = getYouTubeVideoId(videoUrl);
    if (videoInfo) {
        if (videoInfo.type === 'playlist') {
            videoFrame.src = `https://www.youtube.com/embed/videoseries?list=${videoInfo.id}`;
        } else {
            videoFrame.src = `https://www.youtube.com/embed/${videoInfo.id}`;
        }
        videoModal.style.display = 'block';
        // Reset position when opening
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, videoModalContent);
    }
}

// Add search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-desc').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Add image error handling
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/300x200?text=Course+Image';
        this.onerror = null;
    };
}

// Add progress tracking
function updateCourseProgress(courseId, progress) {
    const progressKey = `course_progress_${courseId}`;
    // Ensure progress doesn't exceed 100%
    const finalProgress = Math.min(progress, 100);
    localStorage.setItem(progressKey, finalProgress);
    
    // Find the certificate button for this course
    const courseCard = document.querySelector(`.course-card:nth-child(${courseId})`);
    if (courseCard) {
        const certificateButton = courseCard.querySelector('.certificate-button');
        const progressBar = courseCard.querySelector('.progress');
        const progressText = courseCard.querySelector('.progress-text');
        
        // Update progress bar and text
        progressBar.style.width = `${finalProgress}%`;
        progressText.textContent = `Progress: ${finalProgress}%`;
        
        // Update certificate button state
        if (finalProgress >= 100) {
            certificateButton.disabled = false;
            certificateButton.innerHTML = '<span class="cert-icon">🎓</span> Generate Certificate';
        } else {
            certificateButton.disabled = true;
            certificateButton.innerHTML = '<span class="cert-icon">🎓</span> Complete Course to Generate Certificate';
        }
    }
}

function getCourseProgress(courseId) {
    const progressKey = `course_progress_${courseId}`;
    return localStorage.getItem(progressKey) || 0;
}

// Modify createCourseCards function to include progress tracking
function createCourseCards() {
    const coursesGrid = document.getElementById('coursesGrid');
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        const progress = getCourseProgress(course.id);
        
        card.innerHTML = `
            <div class="course-image-wrapper">
                <img src="${course.image}" alt="${course.title}" class="course-image" onerror="handleImageError(this)">
            </div>
            <div class="course-content">
                <h2 class="course-title">${course.title}</h2>
                <p class="course-desc">${course.description}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%"></div>
                </div>
                <p class="progress-text">Progress: ${progress}%</p>
                <button class="toggle-roadmap" onclick="toggleRoadmap(${course.id})">
                    <span class="toggle-icon">📋</span> <span class="toggle-text">Show Roadmap</span>
                </button>
                <ul class="roadmap-list" id="roadmap-${course.id}">
                    ${course.roadmap.map((item, index) => `
                        <li class="roadmap-item">
                            <span class="roadmap-step-icon">▶️</span>
                            <a href="javascript:void(0)" onclick="openVideoModal('${item.videoUrl}'); updateCourseProgress(${course.id}, ${Math.round((index + 1) * (100 / course.roadmap.length))})">
                                ${item.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
                <button class="certificate-button" onclick="openCertificateModal(${course.id})" ${progress < 100 ? 'disabled' : ''}>
                    <span class="cert-icon">🎓</span> ${progress < 100 ? 'Complete Course to Generate Certificate' : 'Generate Certificate'}
                </button>
            </div>
        `;
        coursesGrid.appendChild(card);
    });
}

// Function to toggle roadmap visibility
function toggleRoadmap(courseId) {
    const roadmap = document.getElementById(`roadmap-${courseId}`);
    const button = roadmap.previousElementSibling;
    
    if (roadmap.classList.contains('active')) {
        roadmap.classList.remove('active');
        button.classList.remove('active');
        button.textContent = 'Show Roadmap';
    } else {
        // Close any other open roadmaps
        document.querySelectorAll('.roadmap-list.active').forEach(openRoadmap => {
            if (openRoadmap.id !== `roadmap-${courseId}`) {
                openRoadmap.classList.remove('active');
                openRoadmap.previousElementSibling.classList.remove('active');
                openRoadmap.previousElementSibling.textContent = 'Show Roadmap';
            }
        });
        
        roadmap.classList.add('active');
        button.classList.add('active');
        button.textContent = 'Hide Roadmap';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    // Create and display course cards
    createCourseCards();
}); 