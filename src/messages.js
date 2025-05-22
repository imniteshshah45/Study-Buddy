// Messages functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const messagesLink = document.querySelector('a[href="#"]:has(i.fa-comment)');
    const messagesSection = document.querySelector('.messages-section');
    const messagesSearch = document.querySelector('.messages-search input');
    const messageItems = document.querySelectorAll('.message-item');

    // Show messages section when messages link is clicked
    messagesLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide specific sections
        const sectionsToHide = [
            '.courses-container',
            '.quiz-section',
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

        // Show messages section
        if (messagesSection) {
            messagesSection.style.display = 'block';
        }
    });

    // Search functionality
    messagesSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        messageItems.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const preview = item.querySelector('.message-preview').textContent.toLowerCase();
            if (name.includes(searchTerm) || preview.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Handle message item clicks
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove unread status
            this.classList.remove('unread');
            // Get user name
            const userName = this.querySelector('h4').textContent;
            // Show chat interface (you can implement this later)
            alert(`Opening chat with ${userName}`);
        });
    });
}); 