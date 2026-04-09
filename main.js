class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-numbers {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .lotto-number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                }
            </style>
            <div class="lotto-numbers"></div>
        `;
    }

    set numbers(numbers) {
        const container = this.shadowRoot.querySelector('.lotto-numbers');
        container.innerHTML = '';
        numbers.forEach(number => {
            const ball = document.createElement('div');
            ball.className = 'lotto-number';
            ball.textContent = number;
            ball.style.backgroundColor = this.getColor(number);
            container.appendChild(ball);
        });
    }

    getColor(number) {
        const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
        return colors[number % colors.length];
    }
}

customElements.define('lotto-numbers', LottoNumbers);

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersElement = document.querySelector('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

    function updateNumbers() {
        const newNumbers = generateLottoNumbers();
        lottoNumbersElement.numbers = newNumbers;
    }

    generateBtn.addEventListener('click', updateNumbers);

    // Initial generation
    updateNumbers();
});
