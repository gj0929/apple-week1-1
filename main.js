const generateBtn = document.getElementById('generate');
const numbersDiv = document.querySelector('.lotto-numbers');
const numberSpans = numbersDiv.querySelectorAll('.number');

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
    });
});