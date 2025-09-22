document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
        root.setAttribute('data-theme', saved);
    }

    const toggle = document.getElementById('themeToggle');
    const setButtonLabel = (theme) => {
        if (!toggle) return;
        const label = theme === 'light' ? 'Light Mode' : 'Dark Mode';
        toggle.textContent = label;
        toggle.setAttribute('aria-label', label);
    };

    // Initialize label based on current theme (default dark if none)
    setButtonLabel(root.getAttribute('data-theme') || 'dark');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', current);
            localStorage.setItem('theme', current);
            setButtonLabel(current);
        });
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
