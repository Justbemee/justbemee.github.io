(function () {
    const toggle = document.getElementById('dark-toggle');
    const menu = document.getElementById('theme-menu');
    const msg = document.getElementById('theme-message');
    const timerBox = document.getElementById('theme-timer');

    const toggleUI = document.querySelector(".switch");

    let themeTimerInterval = null;
    let themeTimeLeft = 15;

    let jokeInterval = null;

    const jokes = [
        "Choose wisely…😄the internet is watching👀",
        "No pressure…,but also yes pressure 😄",
        "Dark mode judges your taste 😄.",
        "Pick before the pixels get impatient.",
        "Cool mode approves your logic👀."
    ];

    let jokeIndex = 0;

    function applyTheme(theme) {
        document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
        document.body.classList.add('dark-' + theme);
    }

    // Load saved theme
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'very';

    if (savedDark) {
        applyTheme(savedTheme);
    }

    if (toggle) {
        toggle.checked = savedDark;

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;

            if (isDark) {
                applyTheme(localStorage.getItem('theme') || 'very');
                startThemeCountdown();
            } else {
                stopAll();
                document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
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
            msg.style.display = "block";
            msg.textContent = "Selected ✔";
        }
    };

    function startThemeCountdown() {
        themeTimeLeft = 15;
        jokeIndex = 0;

        clearInterval(themeTimerInterval);
        clearInterval(jokeInterval);

        if (menu) menu.style.display = "block";
        if (msg) msg.style.display = "block";
        if (timerBox) timerBox.style.display = "block";

        msg.textContent = "You have 15 seconds to choose your dark mode 😄";
        timerBox.textContent = `Time left: ${themeTimeLeft}s`;

        themeTimerInterval = setInterval(() => {
            themeTimeLeft--;

        // Phase 1: intro (first 4 seconds)
        if (themeTimeLeft > 11) {
            timerBox.textContent = `Time left: ${themeTimeLeft}s`;
        }

            // Phase 2: jokes (every ~2.5s)
            else if (themeTimeLeft > 4) {
                if (!jokeInterval) {
                    jokeInterval = setInterval(() => {
                        msg.textContent = jokes[jokeIndex % jokes.length];
                        jokeIndex++;
                    }, 2500);
                }

                timerBox.textContent = `Time left: ${themeTimeLeft}s`;
            }

            // Phase 3: last 4 seconds
            else if (themeTimeLeft > 0) {
                clearInterval(jokeInterval);

                if (toggleUI) toggleUI.classList.add("flash-toggle");

                msg.textContent = "HURRY 😄 choose your vibe!";
                timerBox.textContent = `FINAL COUNTDOWN: ${themeTimeLeft}s`;
            }

            // End
            else {
                stopAll();

                msg.textContent = "Too slow 😈 the UI has decided.";
                timerBox.textContent = "";

                setTimeout(() => {
                    if (menu) menu.style.display = "none";
                    if (msg) msg.style.display = "none";
                    if (timerBox) timerBox.style.display = "none";
                    if (toggleUI) toggleUI.classList.remove("flash-toggle");
                }, 2000);
            }

        }, 1000);
    }

    function stopAll() {
        clearInterval(themeTimerInterval);
        clearInterval(jokeInterval);
        jokeInterval = null;
    }

})();
document.body.style.visibility = "visible";
