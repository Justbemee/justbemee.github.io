(function () {
    const toggle = document.getElementById('dark-toggle');
    const menu = document.getElementById('theme-menu');

    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'very';

    function applyTheme(theme) {
        document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
        document.body.classList.add('dark-' + theme);
    }

    // APPLY ON EVERY PAGE LOAD
    if (savedDark) {
        applyTheme(savedTheme);
    }

    // only homepage has toggle UI
    if (toggle) {
        toggle.checked = savedDark;
        menu.style.display = savedDark ? 'block' : 'none';

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;

            if (isDark) {
                applyTheme(localStorage.getItem('theme') || 'very');
                menu.style.display = 'block';
            } else {
                document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
                menu.style.display = 'none';
            }

            localStorage.setItem('darkMode', isDark);
        });
    }

    window.setTheme = function (theme) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('darkMode', 'true');

        applyTheme(theme);

        if (toggle) toggle.checked = true;
        if (menu) menu.style.display = 'block';
    };
})();
