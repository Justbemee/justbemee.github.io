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

    const isMobileHome = () => document.body.classList.contains('home-page') &&
        window.matchMedia('(max-width: 700px)').matches;
    const mobileHome = isMobileHome();
    const savedDark = mobileHome
        ? localStorage.getItem('homeMobileDarkMode') === 'true'
        : localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'very';

    if (savedDark) {
        applyTheme(mobileHome ? 'cool' : savedTheme);
    }

    if (toggle) {
        toggle.checked = savedDark;

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;

            if (isMobileHome()) {
                stopAll();
                if (isDark) applyTheme('cool');
                else {
                    document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
                    document.documentElement.style.background = '';
                }
                clearThemeUI();
                localStorage.setItem('homeMobileDarkMode', isDark);
                return;
            }

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
        if (isMobileHome()) {
            stopAll();
            applyTheme('cool');
            localStorage.setItem('homeMobileDarkMode', 'true');
            if (toggle) toggle.checked = true;
            clearThemeUI();
            return;
        }

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

(function () {
    const thumbnails = [...document.querySelectorAll('.page-nav-link img')];
    if (thumbnails.length === 0) return;

    let updateScheduled = false;

    function updateThumbnailFade() {
        updateScheduled = false;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0
            ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
            : 0;

        thumbnails.forEach((thumbnail, index) => {
            const thumbnailProgress = Math.min(1, Math.max(0, progress * thumbnails.length - index));
            thumbnail.style.setProperty('--thumbnail-opacity', String(1 - thumbnailProgress * 0.65));
        });
    }

    function scheduleThumbnailFadeUpdate() {
        if (updateScheduled) return;
        updateScheduled = true;
        window.requestAnimationFrame(updateThumbnailFade);
    }

    window.addEventListener('scroll', scheduleThumbnailFadeUpdate, { passive: true });
    window.addEventListener('resize', scheduleThumbnailFadeUpdate);
    updateThumbnailFade();
})();

document.body.style.visibility = 'visible';
