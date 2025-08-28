// Project Arzenith - JavaScript File
// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project Arzenith - Page Loaded Successfully');
    
    // Initialize page functionality
    initializePageFunctionality();
    
    // Add smooth scroll behavior for navigation
    initializeSmoothScrolling();
    
    // Add keyboard navigation support
    initializeKeyboardNavigation();
    
    // Add image loading optimization
    initializeImageOptimization();
});

// Global Error Handler
window.addEventListener('error', function(e) {
    console.error('Project Arzenith Error:', e.message);
    console.error('Error details:', {
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

// Initialize main page functionality
function initializePageFunctionality() {
    // Get all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    const pageLinks = document.querySelectorAll('.page-link');
    
    // Add click event listeners to grid items
    gridItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Button ${index + 1} clicked`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you can add navigation logic for each button
            handleButtonClick(index + 1);
        });
        
        // Add hover sound effect simulation (visual feedback)
        item.addEventListener('mouseenter', function() {
            console.log(`Hovering over button ${index + 1}`);
        });
    });
    
    // Add active state management for pagination
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            pageLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
}

// Handle button clicks
function handleButtonClick(buttonNumber) {
    // This function can be customized to handle different actions for each button
    console.log(`Processing action for button ${buttonNumber}`);
    
    // Example: You can add different actions based on button number
    switch(buttonNumber) {
        case 1:
            console.log('Button 1: Special action');
            break;
        case 2:
            console.log('Button 2: Another action');
            break;
        default:
            console.log(`Button ${buttonNumber}: Default action`);
    }
    
    // Add visual feedback with neon effect
    showNeonFeedback(buttonNumber);
}

// Show neon feedback effect
function showNeonFeedback(buttonNumber) {
    // Create temporary neon effect
    const body = document.body;
    body.style.boxShadow = 'inset 0 0 50px rgba(222, 56, 200, 0.3)';
    
    setTimeout(() => {
        body.style.boxShadow = '';
    }, 300);
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Add smooth scrolling to pagination links
    const pageLinks = document.querySelectorAll('.page-link');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading effect
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '';
            }, 200);
        });
    });
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const gridItems = document.querySelectorAll('.grid-item');
        const pageLinks = document.querySelectorAll('.page-link');
        
        // Arrow key navigation for grid items
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || 
            e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            
            const focusedElement = document.activeElement;
            const currentIndex = Array.from(gridItems).indexOf(focusedElement);
            
            if (currentIndex !== -1) {
                e.preventDefault();
                let newIndex = currentIndex;
                
                switch(e.key) {
                    case 'ArrowRight':
                        newIndex = (currentIndex + 1) % gridItems.length;
                        break;
                    case 'ArrowLeft':
                        newIndex = (currentIndex - 1 + gridItems.length) % gridItems.length;
                        break;
                    case 'ArrowDown':
                        newIndex = (currentIndex + 8) % gridItems.length;
                        break;
                    case 'ArrowUp':
                        newIndex = (currentIndex - 8 + gridItems.length) % gridItems.length;
                        break;
                }
                
                gridItems[newIndex].focus();
            }
        }
        
        // Number key navigation for pages (1-8)
        if (e.key >= '1' && e.key <= '8') {
            const pageIndex = parseInt(e.key) - 1;
            if (pageLinks[pageIndex]) {
                pageLinks[pageIndex].click();
            }
        }
        
        // Enter key to activate focused element
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('grid-item')) {
                focusedElement.click();
            }
        }
    });
}

// Initialize image loading optimization
function initializeImageOptimization() {
    const images = document.querySelectorAll('.grid-item img');
    
    images.forEach((img, index) => {
        // Add loading state
        img.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        // Remove loading state when loaded
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            console.log(`Image ${index + 1} loaded successfully`);
        });
        
        // Handle image load errors
        img.addEventListener('error', function() {
            console.warn(`Image ${index + 1} failed to load, using fallback`);
            this.style.opacity = '1';
            
            // Add error indicator
            this.style.border = '2px solid rgba(255, 0, 0, 0.3)';
        });
    });
}

// Utility function to get current page number
function getCurrentPageNumber() {
    const currentPage = document.querySelector('.page-link.active');
    return currentPage ? currentPage.textContent.replace('Page ', '') : '1';
}

// Utility function for responsive grid adjustment
function adjustGridForViewport() {
    const gridContainer = document.querySelector('.grid-container');
    const viewportWidth = window.innerWidth;
    
    // Log viewport changes for debugging
    console.log(`Viewport width: ${viewportWidth}px`);
    
    // Add viewport-specific classes if needed
    if (viewportWidth < 600) {
        gridContainer.classList.add('mobile-view');
    } else {
        gridContainer.classList.remove('mobile-view');
    }
}

// Listen for viewport changes
window.addEventListener('resize', function() {
    adjustGridForViewport();
});

// Initialize viewport adjustment on load
window.addEventListener('load', function() {
    adjustGridForViewport();
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Project Arzenith loaded in ${loadTime.toFixed(2)}ms`);
});

// Export functions for potential external use
window.ProjectArzenith = {
    handleButtonClick,
    showNeonFeedback,
    getCurrentPageNumber,
    adjustGridForViewport
};
