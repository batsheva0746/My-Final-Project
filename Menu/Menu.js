document.addEventListener("DOMContentLoaded", () => {
    const userName = sessionStorage.getItem("currentUser") || "אורח";
    const userContainer = document.getElementById("link-user");
    
    if (userContainer) {
        userContainer.innerHTML = `
            <h2>שלום ${userName}</h2>
            <button onclick="personal_area()">כניסה לאזור האישי</button>
        `;
    }
});

function TICTACTOE() {
    window.location.href = "../Tic-Tac-Toe/Tic-Tac-Toe.html";
}

function MATH_TEST() {
    window.location.href = "../Math-Test/math-test.html";
}

function TUBES_GAME() {
    window.location.href = "../Tubes/Home/tubesHome.html";
}

function personal_area() {
    document.addEventListener("DOMContentLoaded", () => {
    showHighScores();
});

function showHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    let bestPerPlayer = {};
    highScores.forEach(entry => {
        if (!bestPerPlayer[entry.playerName] || entry.score > bestPerPlayer[entry.playerName].score) {
            bestPerPlayer[entry.playerName] = entry;
        }
    });

    let topPlayers = Object.values(bestPerPlayer)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

    let currentUser = sessionStorage.getItem("currentUser");
    let tbody = document.querySelector("#records-body");
    tbody.innerHTML = "";

    if (topPlayers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty-row">עדיין אין שיאים - שחק/י כדי להיות הראשונה בטבלה! 🏆</td></tr>`;
        return;
    }

    topPlayers.forEach((entry, index) => {
        let row = document.createElement("tr");
        if (entry.playerName === currentUser) {
            row.classList.add("current-player");
        }
        row.innerHTML = `
            <td><strong>${index + 1}</strong></td>
            <td>${entry.playerName}</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>
        `;
        tbody.appendChild(row);
    });
}

function goToMenu() {
    window.location.href = "../Menu/Menu.html";
}

function goToProfile() {
    window.location.href = "../Personal-Area/personalArea.html";
}
}

function goToRecords() {
    window.location.href = "../Records/records.html";
}
