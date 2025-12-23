const PRELOADER_MIN_MS = 2000; // minimum time to show preloader
let preloaderShownAt = Date.now();
const hasVisited = sessionStorage.getItem('visited') === '1';

document.addEventListener('DOMContentLoaded', function() {
    // If this is not the first page load in this tab, hide preloader immediately
    const preloader = document.getElementById('preloader');
    if (hasVisited && preloader) {
        preloader.classList.add('hidden');
    }

    // Profile image hover swap
    const profileImg = document.querySelector('.profile-image-wrapper img');
    if (profileImg) {
        const originalSrc = profileImg.getAttribute('src');
        const hoverSrc = profileImg.getAttribute('data-hover-src');
        if (hoverSrc) {
            profileImg.addEventListener('mouseenter', () => {
                profileImg.setAttribute('src', hoverSrc);
            });
            profileImg.addEventListener('mouseleave', () => {
                profileImg.setAttribute('src', originalSrc);
            });
            // Touch devices: tap to toggle
            profileImg.addEventListener('touchstart', () => {
                const current = profileImg.getAttribute('src');
                profileImg.setAttribute('src', current === originalSrc ? hoverSrc : originalSrc);
            }, { passive: true });
        }
    }
});

// Hide preloader when everything is loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    // Only enforce minimum display time on first load
    if (!hasVisited) {
        const elapsed = Date.now() - preloaderShownAt;
        const remaining = Math.max(0, PRELOADER_MIN_MS - elapsed);
        setTimeout(() => {
            preloader.classList.add('hidden');
            sessionStorage.setItem('visited', '1');
        }, remaining);
    } else {
        preloader.classList.add('hidden');
    }
});

// Tech Stack Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('tech-modal');
    const modalClose = document.getElementById('tech-modal-close');
    const modalTitle = document.getElementById('tech-modal-title');
    const modalList = document.getElementById('tech-modal-list');
    const viewAllButtons = document.querySelectorAll('.view-all-btn');

    const categoryTitles = {
        'backend': 'Backend',
        'frontend': 'Frontend',
        'databases': 'Databases',
        'cloudDevops': 'Cloud & DevOps',
        'uiux': 'UI/UX',
        'tools': 'Tools'
    };

    function openModal(category, items) {
        modalTitle.textContent = categoryTitles[category] || category;
        modalList.innerHTML = '';

        items.forEach(item => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            
            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                techItem.appendChild(img);
            } else {
                const textDiv = document.createElement('div');
                textDiv.className = 'tech-item-text';
                textDiv.textContent = item.name;
                techItem.appendChild(textDiv);
            }

            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = item.name;
            techItem.appendChild(tooltip);

            modalList.appendChild(techItem);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open modal on View All button click
    viewAllButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const itemsJson = this.getAttribute('data-items');
            try {
                const items = JSON.parse(itemsJson);
                openModal(category, items);
            } catch (e) {
                console.error('Error parsing tech items:', e);
            }
        });
    });

    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Profile title typewriter effect
document.addEventListener('DOMContentLoaded', function() {
    const titleContainer = document.querySelector('.profile-title');
    if (!titleContainer) return;

    const output = titleContainer.querySelector('.typewriter');
    const cursor = titleContainer.querySelector('.typewriter-cursor');
    const titles = Array.from(titleContainer.querySelectorAll('.typewriter-titles span'))
        .map(node => node.textContent.trim())
        .filter(Boolean);

    if (!output || titles.length === 0) return;

    const TYPE_DELAY = 80;
    const DELETE_DELAY = 45;
    const HOLD_DELAY = 1400;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const current = titles[titleIndex];
        if (!isDeleting) {
            charIndex++;
            output.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, HOLD_DELAY);
                return;
            }
        } else {
            charIndex--;
            output.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }
        setTimeout(tick, isDeleting ? DELETE_DELAY : TYPE_DELAY);
    }

    // Blink cursor
    if (cursor) {
        cursor.classList.add('typewriter-cursor-active');
    }

    tick();
});
