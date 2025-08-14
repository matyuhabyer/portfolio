// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightThemeBtn = document.getElementById('light-theme');
    const darkThemeBtn = document.getElementById('dark-theme');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Theme button event listeners
    lightThemeBtn.addEventListener('click', () => {
        setTheme('light');
        localStorage.setItem('theme', 'light');
    });

    darkThemeBtn.addEventListener('click', () => {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    });

    function setTheme(theme) {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
            lightThemeBtn.classList.add('active');
            darkThemeBtn.classList.remove('active');
        } else {
            body.removeAttribute('data-theme');
            darkThemeBtn.classList.add('active');
            lightThemeBtn.classList.remove('active');
        }
    }

    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle navigation for multi-page structure
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a link to the same page with anchor, handle smooth scrolling
            if (href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For external page links, let them work normally
        });
    });
});

// Add loading animation for tech items
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    // Add staggered animation to tech items
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add hover effect for contact items
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
