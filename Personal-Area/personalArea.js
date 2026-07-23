document.addEventListener("DOMContentLoaded", () => {
    loadUserProfile();
});

function loadUserProfile() {
    let currentUser = sessionStorage.getItem("currentUser");
    let allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    let user = allUsers.find(u => u.name === currentUser);

    let profileContainer = document.getElementById("profile-info");
    if (!profileContainer) return;

    if (!user) {
        profileContainer.innerHTML = `
            <div class="user-card">
                <h2>שלום אורח/ת!</h2>
                <p>כדי לצפות בסטטיסטיקות האישיות שלך, יש להתחבר למערכת.</p>
                <button onclick="goToMenu()">חזרה לתפריט</button>
            </div>
        `;
        return;
    }

    let stageWins = user.stageWins !== undefined ? user.stageWins : (user.wins || 0);
    let stageLosses = user.stageLosses !== undefined ? user.stageLosses : (user.losses || 0);
    let fullWins = user.fullWins || 0;
    let fullLosses = user.fullLosses || 0;

    // חישוב זמן משחק כולל בדקות ושניות
    let totalSeconds = user.totalPlayTime || 0;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let timeFormatted = `${minutes} דק' ו-${seconds} שנ'`;

    profileContainer.innerHTML = `
        <div class="user-card">
            <h2>שלום, ${user.name}! 👋</h2>
            
            <div class="stats-grid">
                <div class="stat-box full-games">
                    <h3>🏆 משחקים מלאים (5 שלבים)</h3>
                    <p>ניצחונות: <strong>${user.fullWins || 0}</strong></p>
                    <p>הפסדים: <strong>${user.fullLosses || 0}</strong></p>
                </div>

                <div class="stat-box single-stages">
                    <h3>⭐ שלבים בודדים</h3>
                    <p>שלבים שנפתרו: <strong>${user.stageWins || 0}</strong></p>
                    <p>ניסיונות שנכשלו: <strong>${user.stageLosses || 0}</strong></p>
                </div>

            </div>

            <button onclick="goToMenu()">חזרה לתפריט</button>
        </div>
    `;
}

function goToMenu() {
    window.location.href = "../Menu/Menu.html";
}
