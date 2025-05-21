// Calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const scheduleLink = document.querySelector('a[href="#"]:has(i.fa-calendar-alt)');
    const calendarSection = document.querySelector('.calendar-section');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const calendarDays = document.getElementById('calendarDays');

    // Current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Show calendar section when schedule link is clicked
    scheduleLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide specific sections
        const sectionsToHide = [
            '.courses-container',
            '.quiz-section',
            '.messages-section',
            '.quick-stats',
            '.filters'
        ];
        
        sectionsToHide.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.style.display = 'none';
            }
        });

        // Show calendar section
        if (calendarSection) {
            calendarSection.style.display = 'block';
            // Render calendar
            renderCalendar();
        }
    });

    // Previous month button click
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    // Next month button click
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Render calendar
    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Clear calendar
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Check if it's today
            if (day === currentDate.getDate() && 
                currentMonth === currentDate.getMonth() && 
                currentYear === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }

            // Add event indicator (you can customize this based on your events)
            if (day % 5 === 0) {
                dayElement.classList.add('has-event');
            }

            calendarDays.appendChild(dayElement);
        }

        // Update calendar header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        document.querySelector('.calendar-header h3').textContent = 
            `${monthNames[currentMonth]} ${currentYear}`;
    }
}); 