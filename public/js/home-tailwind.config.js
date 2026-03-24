/* Loaded after the Tailwind CDN; theme maps utilities to tokens in /css/home.css */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",
        "on-secondary": "var(--color-on-secondary)",
        "primary-container": "var(--color-primary-container)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "tertiary-fixed": "var(--color-tertiary-fixed)",
        "on-secondary-fixed-variant": "var(--color-on-secondary-fixed-variant)",
        primary: "var(--color-primary)",
        "surface-bright": "var(--color-surface-bright)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "surface-container-low": "var(--color-surface-container-low)",
        "on-primary": "var(--color-on-primary)",
        "surface-variant": "var(--color-surface-variant)",
        "primary-fixed": "var(--color-primary-fixed)",
        "on-surface": "var(--color-on-surface)",
        secondary: "var(--color-secondary)",
        "surface-dim": "var(--color-surface-dim)",
        "on-background": "var(--color-on-background)",
        "on-primary-fixed": "var(--color-on-primary-fixed)",
        outline: "var(--color-outline)",
        "on-primary-container": "var(--color-on-primary-container)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container": "var(--color-surface-container)",
        error: "var(--color-error)",
        "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "error-container": "var(--color-error-container)",
        "surface-tint": "var(--color-surface-tint)",
        "on-secondary-fixed": "var(--color-on-secondary-fixed)",
        "outline-variant": "var(--color-outline-variant)",
        "on-tertiary": "var(--color-on-tertiary)",
        "secondary-container": "var(--color-secondary-container)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "inverse-surface": "var(--color-inverse-surface)",
        tertiary: "var(--color-tertiary)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        surface: "var(--color-surface)",
        "inverse-primary": "var(--color-inverse-primary)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "tertiary-container": "var(--color-tertiary-container)",
        "on-error-container": "var(--color-on-error-container)",
        "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
        "on-error": "var(--color-on-error)"
      },
      fontFamily: {
        headline: ["var(--font-family-headline)"],
        body: ["var(--font-family-body)"],
        label: ["var(--font-family-label)"]
      },
      borderRadius: {
        DEFAULT: "var(--radius-default)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)"
      }
    }
  }
};
