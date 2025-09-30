const PRELOADER_MIN_MS = 2000; // minimum time to show preloader
let preloaderShownAt = Date.now();
const hasVisited = sessionStorage.getItem('visited') === '1';

document.addEventListener('DOMContentLoaded', function() {
    // Smooth page transitions for internal links
    const isInternal = (link) => link.host === window.location.host;
    document.body.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;
        if (!isInternal(anchor)) return;
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#') || anchor.target === '_blank') return;

        e.preventDefault();
        document.body.classList.add('page-fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 300); // match CSS opacity transition duration
    });

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
