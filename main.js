// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/OeE4dVfAj/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const startBtn = document.getElementById('start-btn');
    startBtn.style.display = 'none'; // Hide start button after click

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    const flip = true; 
    webcam = new tmImage.Webcam(300, 300, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Append webcam canvas to DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    // Setup label container with progress bars
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        const resultBar = document.createElement("div");
        resultBar.className = "result-bar";
        
        const label = document.createElement("div");
        label.className = "result-label";
        
        const progressContainer = document.createElement("div");
        progressContainer.className = "progress-container";
        
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar " + (i === 0 ? "dog-bar" : "cat-bar");
        progressBar.style.width = "0%";
        
        const percent = document.createElement("div");
        percent.className = "result-percent";
        percent.textContent = "0%";

        progressContainer.appendChild(progressBar);
        resultBar.appendChild(label);
        resultBar.appendChild(progressContainer);
        resultBar.appendChild(percent);
        labelContainer.appendChild(resultBar);
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

// Run the webcam image through the image model
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className === "Class 1" ? "강아지상" : 
                         prediction[i].className === "Class 2" ? "고양이상" : 
                         prediction[i].className;
        
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const resultBar = labelContainer.childNodes[i];
        resultBar.querySelector(".result-label").textContent = className;
        resultBar.querySelector(".progress-bar").style.width = probability + "%";
        resultBar.querySelector(".result-percent").textContent = probability + "%";
    }
}

// Theme Toggle logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ 라이트 모드';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ 라이트 모드';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 다크 모드';
    }
});
