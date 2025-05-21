// Sample course data
const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        instructor: "John Smith",
        category: "Technology",
        rating: 4.8,
        students: 1200,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Business Analytics Fundamentals",
        instructor: "Sarah Johnson",
        category: "Business",
        rating: 4.6,
        students: 850,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "UI/UX Design Principles",
        instructor: "Michael Chen",
        category: "Design",
        rating: 4.9,
        students: 1500,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        title: "Data Science Essentials",
        instructor: "Emily Davis",
        category: "Science",
        rating: 4.7,
        students: 2000,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// DOM Elements
const coursesContainer = document.getElementById('coursesContainer');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Current filter state
let currentFilter = 'All';
let currentSearch = '';

// Appearance Settings
const appearanceLink = document.querySelector('.appearance-link');
const appearanceModal = document.getElementById('appearanceModal');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const saveBtn = document.querySelector('.save-btn');
const themeOptions = document.querySelectorAll('.theme-option');
const fontOptions = document.querySelectorAll('.font-option');
const colorOptions = document.querySelectorAll('.color-option');

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Toggle theme
function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize the page
function init() {
    displayCourses(courses);
    setupEventListeners();
    initTheme();
}

// Display courses in the grid
function displayCourses(coursesToDisplay) {
    coursesContainer.innerHTML = '';
    
    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.setAttribute('data-course-id', course.id);
        
        courseCard.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="course-image">
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
                <div class="course-meta">
                    <span class="course-rating">${course.rating} ★</span>
                    <span>${course.students} students</span>
                </div>
            </div>
        `;
        
        // Add click event listener to the course card
        courseCard.addEventListener('click', () => {
            window.location.href = `course-details.html?id=${course.id}`;
        });
        
        coursesContainer.appendChild(courseCard);
    });
}

// Filter courses based on category and search term
function filterCourses() {
    let filteredCourses = courses;
    
    // Apply category filter
    if (currentFilter !== 'All') {
        filteredCourses = filteredCourses.filter(course => course.category === currentFilter);
    }
    
    // Apply search filter
    if (currentSearch) {
        const searchTerm = currentSearch.toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm)
        );
    }
    
    displayCourses(filteredCourses);
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.textContent;
            filterCourses();
        });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterCourses();
    });
    
    // Search button
    searchButton.addEventListener('click', () => {
        currentSearch = searchInput.value;
        filterCourses();
    });
}

// Open modal
appearanceLink.addEventListener('click', (e) => {
    e.preventDefault();
    appearanceModal.style.display = 'flex';
});

// Close modal
function closeAppearanceModal() {
    appearanceModal.style.display = 'none';
}

closeModal.addEventListener('click', closeAppearanceModal);
cancelBtn.addEventListener('click', closeAppearanceModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === appearanceModal) {
        closeAppearanceModal();
    }
});

// Theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Font size selection
fontOptions.forEach(option => {
    option.addEventListener('click', () => {
        fontOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Color scheme selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Save appearance settings
saveBtn.addEventListener('click', () => {
    // Get selected theme
    const selectedTheme = document.querySelector('.theme-option.active').dataset.theme;
    document.body.className = selectedTheme === 'dark' ? 'dark-mode' : '';

    // Get selected font size
    const selectedFont = document.querySelector('.font-option.active').dataset.size;
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${selectedFont}`);

    // Get selected color scheme
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    document.body.classList.remove('color-purple', 'color-blue', 'color-green', 'color-red');
    document.body.classList.add(`color-${selectedColor}`);

    // Save settings to localStorage
    localStorage.setItem('appearanceSettings', JSON.stringify({
        theme: selectedTheme,
        fontSize: selectedFont,
        colorScheme: selectedColor
    }));

    closeAppearanceModal();
});

// Load saved appearance settings
function loadAppearanceSettings() {
    const savedSettings = localStorage.getItem('appearanceSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply theme
        document.body.className = settings.theme === 'dark' ? 'dark-mode' : '';
        
        // Apply font size
        document.body.classList.add(`font-${settings.fontSize}`);
        
        // Apply color scheme
        document.body.classList.add(`color-${settings.colorScheme}`);
        
        // Update active states in modal
        document.querySelector(`.theme-option[data-theme="${settings.theme}"]`).classList.add('active');
        document.querySelector(`.font-option[data-size="${settings.fontSize}"]`).classList.add('active');
        document.querySelector(`.color-option[data-color="${settings.colorScheme}"]`).classList.add('active');
    }
}

// Load settings when page loads
document.addEventListener('DOMContentLoaded', loadAppearanceSettings);

// Initialize the application
init(); 