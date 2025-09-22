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
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        // Build the image list (supports data-images="src1,src2,src3" or falls back to src/default/hover)
        const declaredList = (profileImg.getAttribute('data-images') || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        const initialSrc = profileImg.getAttribute('src');
        const defaultSrc = profileImg.getAttribute('data-default-src') || initialSrc;
        const hoverSrc = profileImg.getAttribute('data-hover-src');

        const unique = (arr) => Array.from(new Set(arr.filter(Boolean)));
        let images = declaredList.length > 0
            ? unique(declaredList)
            : unique([initialSrc, defaultSrc, hoverSrc]);

        // Preload images to reduce flicker
        images.forEach(src => { const img = new Image(); img.src = src; });

        // Track the current baseline index (the one shown when not hovered)
        let currentIndex = Math.max(0, images.indexOf(initialSrc));

        const fadeSwap = (src) => {
            profileImg.src = src;
        };

        const nextIndex = (i) => (i + 1) % images.length;

        // Hover shows the next image, mouse leave restores the baseline
        profileImg.addEventListener('mouseenter', () => {
            if (images.length > 1) {
                const idx = nextIndex(currentIndex);
                fadeSwap(images[idx]);
            }
        });
        profileImg.addEventListener('mouseleave', () => {
            fadeSwap(images[currentIndex]);
        });

        // Make focusable and operable via keyboard
        profileImg.setAttribute('tabindex', '0');
        profileImg.addEventListener('focus', () => {
            if (images.length > 1) {
                const idx = nextIndex(currentIndex);
                fadeSwap(images[idx]);
            }
        });
        profileImg.addEventListener('blur', () => {
            fadeSwap(images[currentIndex]);
        });

        // Click toggles to the next image and updates the baseline
        profileImg.setAttribute('role', 'button');
        const updateBaselineTo = (idx) => { currentIndex = idx; };
        const toggleImage = () => {
            if (images.length === 0) return;
            const idx = nextIndex(currentIndex);
            updateBaselineTo(idx);
            fadeSwap(images[currentIndex]);
        };
        profileImg.addEventListener('click', toggleImage);
        profileImg.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleImage();
            }
        });
    }
});
