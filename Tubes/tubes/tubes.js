document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("gameLevel");
    level = 1;

    start_game();
});

let sounds_error = new Audio('../../Audio/sounds_error.wav');
let sound_click = new Audio('../../Audio/Clicking_on_tube.mp3');
let sound_drop = new Audio('../../Audio/sound-drop.wav');
let sound_applause = new Audio('../../Audio/Applause.mp3');
let sound_end_stage = new Audio('../../Audio/End_of_stage.mp3');
let sound_final_seconds = new Audio('../../Audio/final_seconds_sound.mp3');

function stopAllSounds() {
    let allSounds = [sounds_error, sound_click, sound_drop, sound_applause, sound_end_stage, sound_final_seconds];
    allSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

let TubeArr = [];
let TargetArr = [];
let time = 30;
let timerInterval;
let selectedTube = null;
let level = 1;
let currentGameSession = null;

function color(num) {
    switch (num) {
        case 1: return '#ffb7b2';
        case 2: return '#b3f5e4';
        case 3: return '#ffeaa7';
        case 4: return '#e0d4ff';
        case 5: return '#ffdac1';
        case 6: return '#a8c0ff';
    }
}

function card() {
    TargetArr = JSON.parse(JSON.stringify(TubeArr));
    for (let i = 0; i < TargetArr.length; i++) {
        TargetArr[i] = Mixing(TargetArr[i]);
    }
    let cardBoard = document.getElementById("card");
    cardBoard.innerHTML = "";
    for (let i = 0; i < TubeArr.length; i++) {
        let mini_tube = document.createElement("div");
        mini_tube.className = "mini_tube";
        for (let j = 0; j < TargetArr[i].length; j++) {
            let mini_ball = document.createElement("div");
            mini_ball.className = "mini_ball";
            mini_ball.style.background = TargetArr[i][j];
            mini_tube.appendChild(mini_ball);
        }
        cardBoard.appendChild(mini_tube);
    }
}

function start_game() {
    stopAllSounds();
    let levelDisplay = document.getElementById("level");
    if (levelDisplay) {
        levelDisplay.innerHTML = "שלב: " + level;
    }
    TubeArr = [];
    let container = document.getElementById("container");
    if (container) {
        container.innerHTML = "";
    }
    selectedTube = null;
    time = 30 + (level - 1) * 25;
    let colorsNum = level + 1; 
    let TubesNum = colorsNum + 2;

    let ColorArr = [];
    for (let i = 0; i < TubesNum; i++) {
        TubeArr.push([]);
    }

    for (let i = 0; i < colorsNum; i++) {
        let num = Math.floor(Math.random() * 6) + 1;
        let numberColor = color(num);
        if (ColorArr.includes(numberColor)) {
            i--;
        } else {
            ColorArr.push(numberColor);
        }
    }
    let ballArr = [];
    let ballsPerColor = (level === 1) ? 4 : 5;

    for (let i = 0; i < colorsNum; i++) {
        for (let j = 0; j < ballsPerColor; j++) {
            ballArr.push(ColorArr[i]);
        }
    }
    ballArr = Mixing(ballArr);
    for (let i = 0; i < colorsNum; i++) {
        for (let j = 0; j < ballsPerColor; j++) {
            TubeArr[i].push(ballArr.pop());
        }
    }

    TubeArr = Mixing(TubeArr);

    currentGameSession = { level: level, startTime: Date.now() };

    card();
    renderBoard();
    clearInterval(timerInterval);
    timerInterval = setInterval(clock, 1000);
}

function Mixing(ballArr) {
    for (let i = ballArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = ballArr[i];
        ballArr[i] = ballArr[j];
        ballArr[j] = temp;
    }
    return ballArr;
}

function renderBoard() {
    let board = document.getElementById("game-board");
    board.innerHTML = "";
    for (let i = 0; i < TubeArr.length; i++) {
        let tube = document.createElement("div");
        tube.className = "tube";
        if (selectedTube === i) {
            tube.classList.add("selected");
        }
        tube.addEventListener("click", () => {
            Clicking(i);
        });
        for (let j = 0; j < TubeArr[i].length; j++) {
            let ball = document.createElement("div");
            ball.className = "ball";
            ball.style.background = TubeArr[i][j];
            tube.appendChild(ball);
        }
        board.appendChild(tube);
    }
}

function clock() {
    let timerDisplay = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.innerHTML = time;
    }

    if (time <= 5 && time > 0) {
        sound_final_seconds.play();
    }

    if (time <= 0) {
        clearInterval(timerInterval);
        stopAllSounds();

        document.getElementById("container").innerHTML = `
            <h1 class="title">נגמר הזמן!</h1>
            <div style="display: flex; gap: 15px;">
                <button onclick="restartFromLevelOne()">נסה שוב</button>
                <button onclick="backToMenu()">חזרה לתפריט</button>
            </div>`;

        let currentUser = sessionStorage.getItem("currentUser");
        let allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
        let user = allUsers.find(findUser => findUser.name === currentUser);
        if (user) {
            user.games = (user.games || 0) + 1;
            user.losses = (user.losses || 0) + 1;
            if (currentGameSession) {
                let playTime = Math.round((Date.now() - currentGameSession.startTime) / 1000);
                user.totalPlayTime = (user.totalPlayTime || 0) + playTime;
            }
            localStorage.setItem("myUsers", JSON.stringify(allUsers));
        }
        return;
    }

    time--;
}

function Clicking(indexTube) {
    if (time <= 0) return;

    if (selectedTube == null) {
        if (TubeArr[indexTube].length === 0) {
            sounds_error.play();
            return;
        }
        sound_click.play();
        selectedTube = indexTube;
        renderBoard();
        return;
    }
    if (selectedTube === indexTube) {
        selectedTube = null;
        renderBoard();
        return;
    }
    if (TubeArr[indexTube].length === 5) {
        sounds_error.play();
        selectedTube = null;
        renderBoard();
        return;
    }
    TubeArr[indexTube].push(TubeArr[selectedTube].pop());
    sound_drop.play();
    selectedTube = null;
    win(indexTube);
    renderBoard();
}

function win(indexTube) {
    for (let i = 0; i < TubeArr.length; i++) {
        if (TubeArr[i].length !== TargetArr[i].length) return;
        for (let j = 0; j < TubeArr[i].length; j++) {
            if (TubeArr[i][j] !== TargetArr[i][j]) return;
        }
    }

    clearInterval(timerInterval);
    stopAllSounds();
    sound_applause.play();

    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    setTimeout(() => {
        sound_end_stage.play();
        if (level >= 5) {
            sessionStorage.removeItem("gameLevel");
            document.getElementById("container").innerHTML = `
                <h1 class="title">מדהים! סיימת את כל השלבים! 🏆🎉</h1>
                <button onclick="backToMenu()">חזרה לתפריט</button>
            `;
        } else {
            level++;
            sessionStorage.setItem("gameLevel", level);
            document.getElementById("container").innerHTML = `
                <h1 class="title">כל הכבוד! ניצחת! 🎉</h1>
                <div style="display: flex; gap: 15px;">
                    <button onclick="nextLevel()">לשלב הבא</button>
                    <button onclick="backToMenu()">חזרה לתפריט</button>
                </div>
            `;
        }
    }, 1500);

    let currentUser = sessionStorage.getItem("currentUser");
    let allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    let user = allUsers.find(findUser => findUser.name === currentUser);
    if (user) {
        user.wins = (user.wins || 0) + 1;
        user.games = (user.games || 0) + 1;
        if (!user.bestTime || time > user.bestTime) {
            user.bestTime = time;
        }
        if (currentGameSession) {
            let playTime = Math.round((Date.now() - currentGameSession.startTime) / 1000);
            user.totalPlayTime = (user.totalPlayTime || 0) + playTime;
        }
        localStorage.setItem("myUsers", JSON.stringify(allUsers));

        let score = level * 100 + time * 10;
        saveScore(currentUser, score);
    }
}

function nextLevel() {
    stopAllSounds();
    start_game();
}

function saveScore(playerName, score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let scoreEntry = { playerName: playerName, score: score, date: new Date().toLocaleDateString("he-IL") };
    highScores.push(scoreEntry);
    highScores.sort((a, b) => b.score - a.score);
    if (highScores.length > 10) highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function backToMenu() {
    stopAllSounds();
    sessionStorage.removeItem("gameLevel"); 
    window.location.href = "../../Menu/Menu.html";
}

function restartFromLevelOne() {
    stopAllSounds();
    level = 1;
    sessionStorage.removeItem("gameLevel");
    start_game();
}