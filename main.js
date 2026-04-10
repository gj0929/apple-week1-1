const generateBtn = document.getElementById('generate');
const numbersDiv = document.querySelector('.lotto-numbers');
const numberSpans = numbersDiv.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Lotto Number Generation logic
generateBtn.addEventListener('click', () => {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        if (!lottoNumbers.includes(randomNumber)) {
            lottoNumbers.push(randomNumber);
        }
    }
    lottoNumbers.sort((a, b) => a - b);
    numberSpans.forEach((span, index) => {
        span.textContent = lottoNumbers[index];
        // Visual feedback for generation
        span.style.transform = 'scale(1.1)';
        setTimeout(() => {
            span.style.transform = 'scale(1)';
        }, 200);
    });
});

// Theme Toggle logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});
