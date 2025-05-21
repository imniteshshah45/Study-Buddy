// Video Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Video modal script loaded');
    
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoModalContent = videoModal.querySelector('.video-modal-content');
    const videoCloseBtn = document.getElementById('videoCloseBtn');
    const courseDetailsBtns = document.querySelectorAll('.course-details-btn');

    console.log('Found course details buttons:', courseDetailsBtns.length);

    // Video modal state variables
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Function to extract YouTube video ID from URL
    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Function to open video modal
    function openVideoModal(videoUrl) {
        console.log('Opening video modal with URL:', videoUrl);
        const videoId = getYouTubeVideoId(videoUrl);
        if (videoId) {
            videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
            videoModal.style.display = 'flex';
            // Reset position when opening
            xOffset = 0;
            yOffset = 0;
            setTranslate(0, 0, videoModalContent);
        } else {
            console.error('Invalid YouTube URL:', videoUrl);
        }
    }

    // Function to close video modal
    function closeVideoModal() {
        console.log('Closing video modal');
        videoFrame.src = '';
        videoModal.style.display = 'none';
        // Reset position
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, videoModalContent);
    }

    // Add event listeners for course details buttons
    courseDetailsBtns.forEach(btn => {
        console.log('Adding click listener to button:', btn.href);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Course details button clicked:', this.href);
            openVideoModal(this.href);
        });
    });

    // Close video modal when clicking close button
    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeVideoModal);
    }

    // Close video modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // Add dragging functionality
    if (videoModalContent) {
        videoModalContent.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Touch events for mobile
        videoModalContent.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);
    }

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

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}); 