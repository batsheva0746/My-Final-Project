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
        tbody.innerHTML = `<tr><td colspan="4" class="empty-row">עדיין אין שיאים - שחקי כדי להיות הראשונה בטבלה! 🏆</td></tr>`;
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