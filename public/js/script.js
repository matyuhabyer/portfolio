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
});
