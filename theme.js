(function () {
    const toggle = document.getElementById('dark-toggle');
    const menu = document.getElementById('theme-menu');
    const msg = document.getElementById('theme-message');
    const timerBox = document.getElementById('theme-timer');
    const toggleUI = document.querySelector('.switch');
    const banner = document.getElementById('top-banner');

    let themeTimerInterval = null;
    let jokeInterval = null;
    let introTimer = null;
    let themeTimeLeft = 15;
    let jokeIndex = 0;

    const jokes = [
        'Choose wisely…😄the internet is watching👀',
        'No pressure…,but also yes pressure 😄',
        'Even the pixels are trying to pick a side.',
        'Your screen has entered its era.',
        'The vibe is choosing you, not the other way around.'
    ];

    function applyTheme(theme) {
        document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
        document.body.classList.add('dark-' + theme);
    }

    function clearThemeUI() {
        if (toggleUI) toggleUI.classList.remove('flash-toggle');
        if (menu) menu.style.display = 'none';
        if (msg) {
            msg.style.opacity = '0';
            msg.style.display = 'none';
        }
        if (timerBox) {
            timerBox.style.opacity = '0';
            timerBox.style.display = 'none';
        }
        if (banner) {
            banner.classList.remove('is-visible');
        }
    }

    function showThemeUI() {
        if (menu) menu.style.display = 'block';
        if (msg) {
            msg.style.display = 'block';
            msg.style.opacity = '1';
        }
        if (timerBox) {
            timerBox.style.display = 'block';
            timerBox.style.opacity = '1';
        }
        if (banner) {
            banner.classList.add('is-visible');
        }
    }

    function stopAll() {
        clearInterval(themeTimerInterval);
        clearInterval(jokeInterval);
        clearTimeout(introTimer);
        themeTimerInterval = null;
        jokeInterval = null;
        introTimer = null;
        if (toggleUI) toggleUI.classList.remove('flash-toggle');
    }

    function finishThemeCountdown() {
        stopAll();

        if (msg) {
            msg.textContent = 'Too slow 😈 the UI has decided.';
        }
        if (timerBox) {
            timerBox.textContent = '';
        }

        setTimeout(() => {
            clearThemeUI();
        }, 2000);
    }

    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'very';

    if (toggle) {
        toggle.checked = false;

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;

            if (isDark) {
                applyTheme(localStorage.getItem('theme') || 'very');
                startThemeCountdown();
            } else {
                stopAll();
                document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
                document.documentElement.style.background = '';
                clearThemeUI();
            }

            localStorage.setItem('darkMode', isDark);
        });
    }

    window.setTheme = function (theme) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('darkMode', 'true');

        applyTheme(theme);

        if (toggle) toggle.checked = true;

        if (msg) {
            msg.style.display = 'block';
            msg.style.opacity = '1';
            msg.textContent = jokes[jokeIndex % jokes.length];
        }
    };

    function startThemeCountdown() {
        themeTimeLeft = 15;
        jokeIndex = 0;

        stopAll();
        showThemeUI();

        if (msg) {
            msg.textContent = 'You have 15 seconds to choose your dark mode 😄';
        }
        if (timerBox) {
            timerBox.textContent = `Time left: ${themeTimeLeft}s`;
        }

        introTimer = setTimeout(() => {
            if (msg) {
                msg.textContent = jokes[jokeIndex % jokes.length];
                jokeIndex++;
            }

            if (!jokeInterval) {
                jokeInterval = setInterval(() => {
                    if (msg) {
                        msg.textContent = jokes[jokeIndex % jokes.length];
                        jokeIndex++;
                    }
                }, 3200);
            }
        }, 3500);

        themeTimerInterval = setInterval(() => {
            themeTimeLeft--;

            if (themeTimeLeft > 4) {
                if (toggleUI) toggleUI.classList.remove('flash-toggle');
                if (timerBox) timerBox.textContent = `Time left: ${themeTimeLeft}s`;
            } else if (themeTimeLeft > 0) {
                if (toggleUI) toggleUI.classList.add('flash-toggle');
                if (timerBox) timerBox.textContent = `FINAL COUNTDOWN: ${themeTimeLeft}s`;
            } else {
                finishThemeCountdown();
            }
        }, 1000);
    }
})();
document.body.style.visibility = 'visible';
