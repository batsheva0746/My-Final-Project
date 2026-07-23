let numbers = [1, 2, 5, 4, 3, 6, 8, 0, 9, 7];
let exercise;
let i = -1;
let correctAnswer;
let mark = 0;
let one;
let two;
let three;
let place = [];
let time = 30; 
let timerInterval;

function start() {
    i++;
    if (i === 0) {
        timerInterval = setInterval(clock, 1000);
    }
    place = [
        numbers[i] + numbers[numbers.length - 1 - i],
        numbers[i] + numbers[numbers.length - 1 - i] - 1,
        numbers[i] + numbers[numbers.length - 1 - i] + 2
    ];

    one = Math.floor(Math.random() * 3);
    if (one == 0) {
        two = Math.floor(Math.random() * 2) + 1;
        if (two == 1)
            three = 2;
        else 
            three = 1;
    }
    else if (one == 2) {
        two = Math.floor(Math.random() * 2);
        if (two == 1)
            three = 0;
        else 
            three = 1;
    }
    else if (one == 1) {
        two = Math.floor(Math.random() * 3);
        if (two == 2)
            three = 0;
        else if (two == 0)
            three = 2;
        else {
            two = 0;
            three = 2;
        }
    } 
    correctAnswer = numbers[i] + numbers[numbers.length - 1 - i];
    document.getElementById("container").innerHTML = `
    <h1 id="title">התרגיל שלך:</h1>
    <span> זמן שנותר למשחק : </span>
    <span id="timer"> </span>
    <p>${numbers[i]} + ${numbers[numbers.length - i - 1]}</p>
    <div class="options-container">
    <label class="option-item">
    <input type="radio" value="${place[one]}" name="ans"><span>${place[one]}</span>
    </label>
    <label class="option-item">
    <input type="radio" value="${place[two]}" name="ans"><span>${place[two]}</span>
    </label>
    <label class="option-item">
    <input type="radio" value="${place[three]}" name="ans"><span>${place[three]}</span>
    </label>
    </div>
    <button id="start" onclick="check()">לבדיקה</button>`;
}

function check() {
    let selected = document.querySelector('input[name="ans"]:checked');
    if (!selected) return;

    if (numbers[i] + numbers[numbers.length - 1 - i] == selected.value) {
        mark += 20;
    }
    if (i < 4) {
        start();
    } else {
        clearInterval(timerInterval);
        document.getElementById("container").innerHTML = `
        <h2 class="title">הציון שלך:</h2>
        <h1 class="text">${mark}</h1>
        <div class="action-buttons">
            <button onclick="location.reload()">משחק חדש 🔄</button>
            <button class="btn-secondary" onclick="goToMenu()">חזרה לתפריט 🔙</button>
        </div>`;
    }
}

function clock() {
    let timerDisplay = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.innerHTML = time; 
    }

    if (time <= 0) {
        clearInterval(timerInterval); 

        document.getElementById("container").innerHTML = `
        <h1 class="title">נגמר הזמן!</h1>
        <h2 class="title">הציון הסופי שלך:</h2>
        <h1 class="text">${mark}</h1>
        <div class="action-buttons">
            <button onclick="location.reload()">נסה שוב 🔄</button>
            <button class="btn-secondary" onclick="goToMenu()">חזרה לתפריט 🔙</button>
        </div>`;
    }

    time--; 
}

function goToMenu() {
    window.location.href = "../Games-Menu/gamesMenu.html";
}