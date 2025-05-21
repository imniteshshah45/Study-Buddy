// Quiz functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const quizLink = document.querySelector('a[href="#"]:has(i.fa-question-circle)');
    const quizSection = document.getElementById('quiz-section');
    const quizSearch = document.querySelector('.quiz-search input');
    const quizItems = document.querySelectorAll('.quiz-item');
    const startQuizBtns = document.querySelectorAll('.start-quiz-btn');
    const courseDetailsBtns = document.querySelectorAll('.course-details-btn');
    const quizModal = document.getElementById('quizModal');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const timerDisplay = document.getElementById('timer');

    // Quiz state variables
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let timeLeft = 0;
    let timerInterval = null;
    let resultSlideIndex = 0;

    // Comprehensive quiz data
    const quizData = {
        'c-basic': {
            title: 'C Programming - Basic',
            timeLimit: 1800,
            questions: [
                { question: 'Which of the following is a valid C variable name?', options: ['int', 'float', 'my_var', 'double'], correct: 2 },
                { question: 'What is the correct value to return to the OS upon successful program termination?', options: ['0', '1', '-1', 'None'], correct: 0 },
                { question: 'Which symbol is used to denote a preprocessor directive?', options: ['#', '$', '@', '%'], correct: 0 },
                { question: 'Which function is used to print to the screen in C?', options: ['print()', 'printf()', 'cout', 'echo'], correct: 1 },
                { question: 'What is the size of an int on a 32-bit system?', options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'], correct: 1 },
                { question: 'Which header file is required for the printf function?', options: ['<conio.h>', '<stdio.h>', '<stdlib.h>', '<string.h>'], correct: 1 },
                { question: 'How do you declare a pointer in C?', options: ['int *ptr;', 'int ptr*;', '*int ptr;', 'ptr int*;'], correct: 0 },
                { question: 'Which operator is used to access the value at the address stored in a pointer?', options: ['&', '*', '#', '%'], correct: 1 },
                { question: 'What is the output of: printf("%d", 5+2*3);', options: ['21', '11', '17', 'None'], correct: 1 },
                { question: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'None'], correct: 2 },
                { question: 'Which of the following is not a storage class in C?', options: ['auto', 'register', 'static', 'dynamic'], correct: 3 },
                { question: 'What is the default return type of a function in C?', options: ['void', 'int', 'float', 'char'], correct: 1 },
                { question: 'Which function is used to read a character from the keyboard?', options: ['getchar()', 'gets()', 'scanf()', 'read()'], correct: 0 },
                { question: 'Which of the following is not a valid keyword in C?', options: ['continue', 'break', 'repeat', 'return'], correct: 2 },
                { question: 'What is the correct way to declare an array of 10 integers?', options: ['int arr[10];', 'array int arr[10];', 'int arr;', 'arr[10] int;'], correct: 0 },
                { question: 'Which operator is used for logical AND in C?', options: ['&&', '&', 'and', '||'], correct: 0 },
                { question: 'Which function is used to allocate memory dynamically?', options: ['malloc()', 'alloc()', 'calloc()', 'Both 1 and 3'], correct: 3 },
                { question: 'What is the output of: printf("%c", 65);', options: ['A', '65', 'a', 'Error'], correct: 0 },
                { question: 'Which of the following is not a loop structure in C?', options: ['for', 'while', 'repeat', 'do-while'], correct: 2 },
                { question: 'Which keyword is used to prevent modification of a variable?', options: ['const', 'static', 'volatile', 'register'], correct: 0 }
            ]
        },
        'cpp-basic': {
            title: 'C++ Programming - Basic',
            timeLimit: 1800,
            questions: [
                { question: 'Which of the following is not a C++ keyword?', options: ['class', 'public', 'private', 'function'], correct: 3 },
                { question: 'Which operator is used to resolve the scope in C++?', options: ['::', '.', '->', ':'], correct: 0 },
                { question: 'What is the default access specifier for class members?', options: ['public', 'private', 'protected', 'None'], correct: 1 },
                { question: 'Which of the following is used to create an object in C++?', options: ['object obj;', 'class obj;', 'obj = new object();', 'object obj = new object();'], correct: 0 },
                { question: 'Which function is called when an object is created?', options: ['constructor', 'destructor', 'main', 'init'], correct: 0 },
                { question: 'Which of the following is not a type of constructor?', options: ['Default', 'Copy', 'Friend', 'Parameterized'], correct: 2 },
                { question: 'Which keyword is used to inherit a class?', options: ['extends', 'inherits', ':', 'implements'], correct: 2 },
                { question: 'Which of the following is not a type of inheritance?', options: ['Single', 'Multiple', 'Multilevel', 'Hierarchical'], correct: 3 },
                { question: 'Which operator is overloaded for output in C++?', options: ['<<', '>>', '==', '!='], correct: 0 },
                { question: 'Which of the following is not a feature of OOP?', options: ['Encapsulation', 'Polymorphism', 'Abstraction', 'Compilation'], correct: 3 },
                { question: 'Which keyword is used to define a constant in C++?', options: ['const', 'define', 'static', 'final'], correct: 0 },
                { question: 'Which function is used to allocate memory in C++?', options: ['malloc()', 'calloc()', 'new', 'alloc()'], correct: 2 },
                { question: 'Which function is used to deallocate memory in C++?', options: ['delete', 'free()', 'remove()', 'dealloc()'], correct: 0 },
                { question: 'Which of the following is not a valid C++ data type?', options: ['int', 'float', 'string', 'real'], correct: 3 },
                { question: 'Which of the following is used for input in C++?', options: ['cin', 'cout', 'scanf', 'print'], correct: 0 },
                { question: 'Which of the following is not a valid access specifier?', options: ['public', 'private', 'protected', 'internal'], correct: 3 },
                { question: 'Which keyword is used to prevent inheritance?', options: ['final', 'sealed', 'static', 'const'], correct: 0 },
                { question: 'Which of the following is not a loop in C++?', options: ['for', 'while', 'repeat', 'do-while'], correct: 2 },
                { question: 'Which of the following is used to define a namespace?', options: ['namespace', 'package', 'module', 'space'], correct: 0 },
                { question: 'Which of the following is not a valid operator in C++?', options: ['+', '-', '++', '==='], correct: 3 }
            ]
        },
        'python-basic': {
            title: 'Python Programming - Basic',
            timeLimit: 1800,
            questions: [
                { question: 'Which of the following is used to define a function in Python?', options: ['function', 'def', 'fun', 'define'], correct: 1 },
                { question: 'Which of the following is not a valid Python data type?', options: ['int', 'float', 'real', 'str'], correct: 2 },
                { question: 'How do you start a comment in Python?', options: ['//', '#', '--', '/*'], correct: 1 },
                { question: 'Which of the following is used to print in Python?', options: ['echo', 'print()', 'printf()', 'cout'], correct: 1 },
                { question: 'Which of the following is not a valid variable name?', options: ['my_var', '2var', '_var', 'var2'], correct: 1 },
                { question: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'exp', '^^'], correct: 1 },
                { question: 'Which of the following is not a loop in Python?', options: ['for', 'while', 'do-while', 'None'], correct: 2 },
                { question: 'Which function is used to get input from the user?', options: ['input()', 'scan()', 'get()', 'read()'], correct: 0 },
                { question: 'Which of the following is not a Python keyword?', options: ['pass', 'continue', 'break', 'stop'], correct: 3 },
                { question: 'Which of the following is used to import a module?', options: ['import', 'include', 'require', 'using'], correct: 0 },
                { question: 'Which of the following is not a valid string method?', options: ['upper()', 'lower()', 'capitalize()', 'toupper()'], correct: 3 },
                { question: 'Which of the following is used to create a list?', options: ['()', '[]', '{}', '<>'], correct: 1 },
                { question: 'Which of the following is not a valid conditional statement?', options: ['if', 'elif', 'else', 'elseif'], correct: 3 },
                { question: 'Which of the following is used to define a class in Python?', options: ['class', 'Class', 'define', 'object'], correct: 0 },
                { question: 'Which of the following is not a valid logical operator?', options: ['and', 'or', 'not', 'nor'], correct: 3 },
                { question: 'Which of the following is used to handle exceptions?', options: ['try-except', 'try-catch', 'catch', 'handle'], correct: 0 },
                { question: 'Which of the following is not a valid list method?', options: ['append()', 'insert()', 'add()', 'remove()'], correct: 2 },
                { question: 'Which of the following is used to create a dictionary?', options: ['()', '[]', '{}', '<>'], correct: 2 },
                { question: 'Which of the following is not a valid set method?', options: ['add()', 'remove()', 'discard()', 'append()'], correct: 3 },
                { question: 'Which of the following is used to exit a loop?', options: ['break', 'exit', 'stop', 'end'], correct: 0 }
            ]
        },
        'linux-basic': {
            title: 'Linux - Basic',
            timeLimit: 1800,
            questions: [
                { question: 'Which command is used to list files in a directory?', options: ['ls', 'cd', 'pwd', 'cat'], correct: 0 },
                { question: 'Which command is used to change directories?', options: ['ls', 'cd', 'pwd', 'cat'], correct: 1 },
                { question: 'Which command is used to print the current directory?', options: ['ls', 'cd', 'pwd', 'cat'], correct: 2 },
                { question: 'Which command is used to display the contents of a file?', options: ['ls', 'cd', 'pwd', 'cat'], correct: 3 },
                { question: 'Which command is used to create a new directory?', options: ['mkdir', 'rmdir', 'touch', 'rm'], correct: 0 },
                { question: 'Which command is used to remove a file?', options: ['rm', 'rmdir', 'touch', 'mkdir'], correct: 0 },
                { question: 'Which command is used to remove a directory?', options: ['rm', 'rmdir', 'touch', 'mkdir'], correct: 1 },
                { question: 'Which command is used to copy files?', options: ['cp', 'mv', 'rm', 'ls'], correct: 0 },
                { question: 'Which command is used to move files?', options: ['cp', 'mv', 'rm', 'ls'], correct: 1 },
                { question: 'Which command is used to change file permissions?', options: ['chmod', 'chown', 'chgrp', 'ls'], correct: 0 },
                { question: 'Which command is used to change file ownership?', options: ['chmod', 'chown', 'chgrp', 'ls'], correct: 1 },
                { question: 'Which command is used to display running processes?', options: ['ps', 'top', 'jobs', 'all of the above'], correct: 3 },
                { question: 'Which command is used to kill a process?', options: ['kill', 'end', 'stop', 'terminate'], correct: 0 },
                { question: 'Which command is used to search for a pattern in a file?', options: ['find', 'grep', 'search', 'look'], correct: 1 },
                { question: 'Which command is used to display the first 10 lines of a file?', options: ['head', 'tail', 'less', 'more'], correct: 0 },
                { question: 'Which command is used to display the last 10 lines of a file?', options: ['head', 'tail', 'less', 'more'], correct: 1 },
                { question: 'Which command is used to display the manual of a command?', options: ['help', 'man', 'info', 'doc'], correct: 1 },
                { question: 'Which command is used to display disk usage?', options: ['df', 'du', 'ls', 'pwd'], correct: 1 },
                { question: 'Which command is used to display free disk space?', options: ['df', 'du', 'ls', 'pwd'], correct: 0 },
                { question: 'Which command is used to display the current user?', options: ['whoami', 'who', 'users', 'id'], correct: 0 }
            ]
        },
        'nn-basic': {
            title: 'Neural Networks - Basic Concepts',
            timeLimit: 1800,
            questions: [
                {
                    question: 'What is a neural network?',
                    options: ['A computer program', 'A network of artificial neurons', 'A database system', 'A programming language'],
                    correct: 1
                },
                {
                    question: 'What is an activation function?',
                    options: ['A function to initialize weights', 'A function to normalize inputs', 'A function to introduce non-linearity', 'A function to calculate loss'],
                    correct: 2
                },
                {
                    question: 'Which of these is not a common activation function?',
                    options: ['ReLU', 'Sigmoid', 'Tanh', 'Cosine'],
                    correct: 3
                },
                {
                    question: 'What is backpropagation?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to normalize inputs', 'A way to calculate loss'],
                    correct: 1
                },
                {
                    question: 'What is a loss function?',
                    options: ['A function to initialize weights', 'A function to normalize inputs', 'A function to calculate error', 'A function to update weights'],
                    correct: 2
                },
                {
                    question: 'Which of these is not a common loss function?',
                    options: ['MSE', 'Cross-entropy', 'MAE', 'Variance'],
                    correct: 3
                },
                {
                    question: 'What is a weight in a neural network?',
                    options: ['A constant value', 'A learnable parameter', 'An input value', 'An output value'],
                    correct: 1
                },
                {
                    question: 'What is a bias in a neural network?',
                    options: ['A constant value', 'A learnable parameter', 'An input value', 'An output value'],
                    correct: 1
                },
                {
                    question: 'What is a layer in a neural network?',
                    options: ['A single neuron', 'A group of neurons', 'A weight matrix', 'A bias vector'],
                    correct: 1
                },
                {
                    question: 'What is a perceptron?',
                    options: ['A single neuron', 'A group of neurons', 'A weight matrix', 'A bias vector'],
                    correct: 0
                },
                {
                    question: 'What is gradient descent?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to normalize inputs', 'A way to calculate loss'],
                    correct: 1
                },
                {
                    question: 'What is overfitting?',
                    options: ['When model performs well on training data', 'When model performs poorly on training data', 'When model performs well on test data', 'When model performs poorly on test data'],
                    correct: 3
                },
                {
                    question: 'What is underfitting?',
                    options: ['When model performs well on training data', 'When model performs poorly on training data', 'When model performs well on test data', 'When model performs poorly on test data'],
                    correct: 1
                },
                {
                    question: 'What is regularization?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to prevent overfitting', 'A way to calculate loss'],
                    correct: 2
                },
                {
                    question: 'What is dropout?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to prevent overfitting', 'A way to calculate loss'],
                    correct: 2
                },
                {
                    question: 'What is batch normalization?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to normalize inputs', 'A way to calculate loss'],
                    correct: 2
                },
                {
                    question: 'What is a convolutional layer?',
                    options: ['A layer for image processing', 'A layer for text processing', 'A layer for audio processing', 'A layer for video processing'],
                    correct: 0
                },
                {
                    question: 'What is a pooling layer?',
                    options: ['A layer for image processing', 'A layer for text processing', 'A layer for audio processing', 'A layer for video processing'],
                    correct: 0
                },
                {
                    question: 'What is a recurrent layer?',
                    options: ['A layer for image processing', 'A layer for text processing', 'A layer for audio processing', 'A layer for video processing'],
                    correct: 1
                },
                {
                    question: 'What is transfer learning?',
                    options: ['A way to initialize weights', 'A way to update weights', 'A way to reuse pre-trained models', 'A way to calculate loss'],
                    correct: 2
                }
            ]
        },
        'os-process': {
            title: 'Operating Systems - Process Management',
            timeLimit: 1800,
            questions: [
                {
                    question: 'What is a process?',
                    options: ['A program in execution', 'A program in memory', 'A program in disk', 'A program in cache'],
                    correct: 0
                },
                {
                    question: 'What is a thread?',
                    options: ['A process', 'A lightweight process', 'A program', 'A file'],
                    correct: 1
                },
                {
                    question: 'What is process scheduling?',
                    options: ['Creating processes', 'Destroying processes', 'Allocating CPU to processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'Which of these is not a process scheduling algorithm?',
                    options: ['FCFS', 'SJF', 'Round Robin', 'BFS'],
                    correct: 3
                },
                {
                    question: 'What is context switching?',
                    options: ['Creating a process', 'Destroying a process', 'Switching between processes', 'Allocating memory to a process'],
                    correct: 2
                },
                {
                    question: 'What is a deadlock?',
                    options: ['A process waiting for CPU', 'A process waiting for memory', 'A process waiting for I/O', 'A process waiting for resources'],
                    correct: 3
                },
                {
                    question: 'Which of these is not a condition for deadlock?',
                    options: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'No starvation'],
                    correct: 3
                },
                {
                    question: 'What is process synchronization?',
                    options: ['Creating processes', 'Destroying processes', 'Coordinating processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'What is a semaphore?',
                    options: ['A process', 'A thread', 'A synchronization tool', 'A memory location'],
                    correct: 2
                },
                {
                    question: 'What is a mutex?',
                    options: ['A process', 'A thread', 'A synchronization tool', 'A memory location'],
                    correct: 2
                },
                {
                    question: 'What is process creation?',
                    options: ['Creating a new process', 'Destroying a process', 'Switching between processes', 'Allocating memory to a process'],
                    correct: 0
                },
                {
                    question: 'What is process termination?',
                    options: ['Creating a new process', 'Destroying a process', 'Switching between processes', 'Allocating memory to a process'],
                    correct: 1
                },
                {
                    question: 'What is process state?',
                    options: ['A process', 'A thread', 'A condition of a process', 'A memory location'],
                    correct: 2
                },
                {
                    question: 'Which of these is not a process state?',
                    options: ['New', 'Ready', 'Running', 'Sleeping'],
                    correct: 3
                },
                {
                    question: 'What is process priority?',
                    options: ['A process', 'A thread', 'A number indicating importance', 'A memory location'],
                    correct: 2
                },
                {
                    question: 'What is process scheduling?',
                    options: ['Creating processes', 'Destroying processes', 'Allocating CPU to processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'What is process synchronization?',
                    options: ['Creating processes', 'Destroying processes', 'Coordinating processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'What is process communication?',
                    options: ['Creating processes', 'Destroying processes', 'Exchanging data between processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'What is process scheduling?',
                    options: ['Creating processes', 'Destroying processes', 'Allocating CPU to processes', 'Allocating memory to processes'],
                    correct: 2
                },
                {
                    question: 'What is process synchronization?',
                    options: ['Creating processes', 'Destroying processes', 'Coordinating processes', 'Allocating memory to processes'],
                    correct: 2
                }
            ]
        }
    };

    // Trim each quiz to 15 questions
    Object.keys(quizData).forEach(key => {
        if (quizData[key].questions.length > 15) {
            quizData[key].questions = quizData[key].questions.slice(0, 15);
        }
    });

    // Show quiz section when quiz link is clicked
    if (quizLink) {
        quizLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections first
            const sectionsToHide = [
                '.courses-container',
                '.messages-section',
                '.calendar-section',
                '.quick-stats',
                '.filters'
            ];
            
            sectionsToHide.forEach(selector => {
                const section = document.querySelector(selector);
                if (section) {
                    section.style.display = 'none';
                }
            });

            // Show quiz section
            if (quizSection) {
                quizSection.style.display = 'block';
                quizSection.style.visibility = 'visible';
                quizSection.style.opacity = '1';
            }
        });
    }

    // Search functionality
    if (quizSearch) {
        quizSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            quizItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Start quiz when start button is clicked
    startQuizBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quizItem = this.closest('.quiz-item');
            const quizTitle = quizItem.querySelector('h4').textContent;
            
            // Map quiz titles to their corresponding data keys
            const quizKeyMap = {
                'C Programming (Basic Syntax)': 'c-basic',
                'C++ Programming (Basic Syntax)': 'cpp-basic',
                'Python Programming (Basic Syntax)': 'python-basic',
                'Linux (Basic Commands)': 'linux-basic'
            };
            
            const quizKey = quizKeyMap[quizTitle];
            if (quizKey && quizData[quizKey]) {
                currentQuiz = quizData[quizKey];
                startQuiz();
            } else {
                console.error('Quiz data not found for:', quizTitle);
            }
        });
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', function() {
        quizModal.style.display = 'none';
        stopTimer();
    });

    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);

    // Start quiz function
    function startQuiz() {
        if (!currentQuiz) return;
        
        currentQuestionIndex = 0;
        userAnswers = new Array(currentQuiz.questions.length).fill(null);
        timeLeft = currentQuiz.timeLimit;
        
        // Update modal title with quiz name
        document.querySelector('.quiz-modal-header h3').textContent = currentQuiz.title;
        
        // Show modal and start quiz
        quizModal.style.display = 'flex';
        showQuestion();
        startTimer();
    }

    // Show current question
    function showQuestion() {
        if (!currentQuiz || !currentQuiz.questions[currentQuestionIndex]) return;

        const question = currentQuiz.questions[currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');
        const optionsContainer = document.getElementById('optionsContainer');

        // Update question text
        questionContainer.innerHTML = `
            <h3>Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</h3>
            <p>${question.question}</p>
        `;

        // Update options
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="option ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}" 
                 onclick="selectOption(${index})">
                <input type="radio" name="option" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                ${option}
            </div>
        `).join('');

        // Update navigation buttons
        prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'none' : 'block';
        submitBtn.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'block' : 'none';
    }

    // Select option
    window.selectOption = function(index) {
        userAnswers[currentQuestionIndex] = index;
        const options = document.querySelectorAll('.option');
        options.forEach((option, i) => {
            option.classList.toggle('selected', i === index);
            option.querySelector('input[type="radio"]').checked = i === index;
        });
    };

    // Show previous question
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    }

    // Show next question
    function showNextQuestion() {
        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        }
    }

    // Timer functions
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                stopTimer();
                submitQuiz();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Submit quiz
    function submitQuiz() {
        stopTimer();
        const score = userAnswers.filter((ans, idx) => ans === currentQuiz.questions[idx].correct).length;
        const questionContainer = document.getElementById('questionContainer');
        const optionsContainer = document.getElementById('optionsContainer');
        
        // Show final score
        questionContainer.innerHTML = `
            <div class="results-header">
                <h3>Quiz Results</h3>
                <button class="close-results-btn" onclick="closeQuizModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="final-score">
                <div class="score-circle ${score >= 10 ? 'passed' : 'failed'}">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/${currentQuiz.questions.length}</span>
                </div>
                <p class="score-message">
                    ${score >= 10 
                        ? '<span style="color: #00b894; font-weight: bold;">Congratulations! You passed the exam.</span>' 
                        : '<span style="color: #d63031; font-weight: bold;">You did not pass. Keep practicing!</span>'}
                </p>
            </div>
        `;

        // Show simple summary table
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
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }

    // Add close quiz modal function
    window.closeQuizModal = function() {
        const quizModal = document.getElementById('quizModal');
        quizModal.style.display = 'none';
        stopTimer();
    };

    // Sidebar navigation
    const dashboardLink = document.querySelector('.sidebar-nav li:first-child a');
    const coursesContainer = document.querySelector('.courses-container');
    const quickStats = document.querySelector('.quick-stats');
    const filters = document.querySelector('.filters');
    const messagesSection = document.querySelector('.messages-section');
    const calendarSection = document.querySelector('.calendar-section');

    dashboardLink.addEventListener('click', function(e) {
        e.preventDefault();

        // Show dashboard sections
        if (coursesContainer) coursesContainer.style.display = 'block';
        if (quickStats) quickStats.style.display = 'grid';
        if (filters) filters.style.display = 'flex';

        // Hide other sections
        if (quizSection) quizSection.style.display = 'none';
        if (messagesSection) messagesSection.style.display = 'none';
        if (calendarSection) calendarSection.style.display = 'none';
    });

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }

    // Toggle theme
    function toggleTheme() {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Set up event listener for the toggle
    themeToggle.addEventListener('change', toggleTheme);

    // Call initTheme on page load
    document.addEventListener('DOMContentLoaded', initTheme);
}); 