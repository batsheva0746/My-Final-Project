document.addEventListener("DOMContentLoaded", () => {
    let currentUser = sessionStorage.getItem("currentUser");
    let allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    let user = allUsers.find(findUser => findUser.name === currentUser);
    let container = document.getElementById("stats-container");

    function calcAverageTime(user) {
        if (!user.games) return 0;
        return Math.round((user.totalPlayTime || 0) / user.games);
    }

    if (user) {
        let userWins = (user.wins || 0);
        let userGames = (user.games || 0);
        let losses = (user.losses !== undefined) ? user.losses : Math.max(0, userGames - userWins);
        let successRate = userGames > 0 ? Math.round((userWins / userGames) * 100) : 0;
        let bestTime = (user.bestTime || 0);
        let avgTime = calcAverageTime(user);

        container.innerHTML = `
            <h2 id="title">ההישגים של ${user.name} 🏆</h2>
            <div id="stats">            
                <p><span>מספר משחקים:</span> <span>${userGames}</span></p>
                <p><span>מספר ניצחונות:</span> <span>${userWins}</span></p>
                <p><span>מספר הפסדים:</span> <span>${losses}</span></p>
                <p><span>אחוז הצלחה:</span> <span>${successRate}%</span></p>
                <p><span>זמן ממוצע (שניות):</span> <span>${avgTime} ש'</span></p>
                <p><span>שיא אישי (זמן שנותר):</span> <span>${bestTime} ש'</span></p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <h2 id="title">אזור אישי</h2>
            <p class="guest-msg">אינך מחובר/ת כעת למערכת.</p>
            <button class="guest-btn" onclick="goToLogin()">להתחברות / הרשמה</button>
        `;
    }
});

function goToMenu() {
    window.location.href = "../Games-Menu/gamesMenu.html";
}

function goToLogin() {
    window.location.href = "../Login/index.html";
}
