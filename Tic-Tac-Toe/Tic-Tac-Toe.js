let player = "X";
let name1 = "שחקן 1";
let name2 = "שחקן 2";
let isGameOver = false;
let movesCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = sessionStorage.getItem("currentUser");
    const p1Input = document.getElementById("player1-input");
    
    if (currentUser && p1Input) {
        p1Input.value = currentUser;
    }
});

function startGame() {
    const p1Input = document.getElementById("player1-input").value.trim();
    const p2Input = document.getElementById("player2-input").value.trim();

    name1 = p1Input !== "" ? p1Input : "שחקן 1";
    name2 = p2Input !== "" ? p2Input : "שחקן 2";

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-wrapper").style.display = "block";

    updateTurnDisplay();
}

function updateTurnDisplay() {
    const nameSpan = document.getElementById("current-player-name");
    const symbolSpan = document.getElementById("current-player-symbol");
    
    if (nameSpan && symbolSpan) {
        nameSpan.textContent = (player === "X") ? name1 : name2;
        symbolSpan.textContent = player;
    }
}

function turn(char) {
    if (isGameOver || char.innerHTML !== "") {
        return; 
    }

    char.innerHTML = player;
    char.classList.add(player === "X" ? "x-mark" : "o-mark");
    movesCount++;

    let currentName = (player === "X") ? name1 : name2;
    
    if (checkWin(player)) {
        isGameOver = true;
        showEndMessage(`${currentName} ניצח/ת! 🎉`);
        return;
    }

    if (movesCount === 9) {
        isGameOver = true;
        showEndMessage("תיקו! 🤝");
        return;
    }

    player = (player === "X") ? "O" : "X";
    updateTurnDisplay();
}

function checkWin(p) {
    const c1 = document.getElementById("1").innerHTML;
    const c2 = document.getElementById("2").innerHTML;
    const c3 = document.getElementById("3").innerHTML;
    const c4 = document.getElementById("4").innerHTML;
    const c5 = document.getElementById("5").innerHTML;
    const c6 = document.getElementById("6").innerHTML;
    const c7 = document.getElementById("7").innerHTML;
    const c8 = document.getElementById("8").innerHTML;
    const c9 = document.getElementById("9").innerHTML;

    return (
        (c1 === p && c2 === p && c3 === p) ||
        (c4 === p && c5 === p && c6 === p) ||
        (c7 === p && c8 === p && c9 === p) ||
        (c1 === p && c4 === p && c7 === p) ||
        (c2 === p && c5 === p && c8 === p) ||
        (c3 === p && c6 === p && c9 === p) ||
        (c1 === p && c5 === p && c9 === p) ||
        (c3 === p && c5 === p && c7 === p)
    );
}

function showEndMessage(msg) {
    const container = document.getElementById("container");
    container.innerHTML = `
        <h1 class="title">${msg}</h1>
        <div style="display: flex; gap: 15px;">
            <button onclick="restartGame()">משחק חדש</button>
            <button onclick="backToMenu()">חזרה לתפריט</button>
        </div>
    `;
}

function restartGame() {
    isGameOver = false;
    movesCount = 0;
    player = "X";
    
    for (let i = 1; i <= 9; i++) {
        const card = document.getElementById(i.toString());
        if (card) {
            card.innerHTML = "";
            card.classList.remove("x-mark", "o-mark");
        }
    }
    
    const container = document.getElementById("container");
    if (container) {
        container.innerHTML = "";
    }
    
    updateTurnDisplay();
}

function backToMenu() {
    window.location.href = "../Games-Menu/gamesMenu.html";
}