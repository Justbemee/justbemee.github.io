(function () {
    const toggle = document.getElementById('dark-toggle');
    const menu = document.getElementById('theme-menu');
    const msg = document.getElementById('theme-message');
    const timerBox = document.getElementById('theme-timer');
    const toggleUI = document.querySelector('.switch');

    let themeTimerInterval = null;
    let themeTimeLeft = 15;
    let themeLocked = false;

    const jokes = [
        "Choose wisely… the internet is watching 👀",
        "No pressure… but also yes pressure 😄",
        "Dark mode judges your taste.",
        "Warm mode says you're emotional today.",
        "Cool mode respects your confidence.",
        "Time is an illusion… but this timer is not.",
        "Pick before the pixels get impatient.",
        "The UI is mildly judging your hesitation."
    ];

    function getRandomJoke() {
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    function applyTheme(theme) {
        document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
        document.body.classList.add('dark-' + theme);
    }

    function startThemeCountdown() {
        themeTimeLeft = 15;
        themeLocked = false;

        if (!menu || !msg || !timerBox) return;

        menu.style.display = "block";
        msg.style.display = "block";
        timerBox.style.display = "block";

        msg.textContent = "You have 15 seconds to choose your dark mode 😄";
        timerBox.textContent = `Time left: ${themeTimeLeft}s`;

        clearInterval(themeTimerInterval);

        themeTimerInterval = setInterval(() => {
            themeTimeLeft--;

            if (themeTimeLeft > 0) {

                // LAST 4 SECONDS → FLASH ONLY TOGGLE
                if (themeTimeLeft <= 4) {
                    if (toggleUI) toggleUI.classList.add("flash-toggle");

                    msg.textContent = "HURRY 😄 choose your vibe!";
                    timerBox.textContent = `FINAL COUNTDOWN: ${themeTimeLeft}s`;

                } else {
                    if (toggleUI) toggleUI.classList.remove("flash-toggle");

                    timerBox.textContent = `Time left: ${themeTimeLeft}s`;
                    msg.textContent = getRandomJoke();
                }

            } else {
                clearInterval(themeTimerInterval);
                themeLocked = true;

                if (toggleUI) toggleUI.classList.add("flash-toggle");

                menu.style.display = "none";
                msg.textContent = "Too slow 😈 the UI has decided for you.";
                timerBox.textContent = "";

                setTimeout(() => {
                    if (toggleUI) toggleUI.classList.remove("flash-toggle");
                    msg.style.display = "none";
                    timerBox.style.display = "none";
                }, 2500);
            }
        }, 1000);
    }

    // APPLY ON LOAD
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'very';

    if (savedDark) {
        applyTheme(savedTheme);
    }

    // TOGGLE HANDLING
    if (toggle) {
        toggle.checked = savedDark;
        menu.style.display = savedDark ? 'block' : 'none';

        toggle.addEventListener('change', () => {
            const isDark = toggle.checked;

            if (isDark) {
                applyTheme(localStorage.getItem('theme') || 'very');
                menu.style.display = 'block';

                // START YOUR GAME HERE
                startThemeCountdown();

            } else {
                document.body.classList.remove('dark-very', 'dark-warm', 'dark-cool');
                menu.style.display = 'none';

                clearInterval(themeTimerInterval);
            }

            localStorage.setItem('darkMode', isDark);
        });
    }

    // THEME SELECTION (USER PICKS EARLY = STOP TIMER)
    window.setTheme = function (theme) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('darkMode', 'true');

        applyTheme(theme);

        if (toggle) toggle.checked = true;
        if (menu) menu.style.display = 'block';

        // STOP GAME IF ACTIVE
        clearInterval(themeTimerInterval);

        if (msg) msg.style.display = "none";
        if (timerBox) timerBox.style.display = "none";
        if (toggleUI) toggleUI.classList.remove("flash-toggle");

        themeLocked = false;
    };

})();
