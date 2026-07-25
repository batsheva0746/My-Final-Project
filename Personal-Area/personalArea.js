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

    // שליפת נתונים
    let totalWins = user.fullWins || user.wins || 0;
    let totalLosses = user.fullLosses || user.losses || 0;
    let totalRuns = totalWins + totalLosses;
    let highPoints = user.topScore || user.highScore || 0;
    let stagesCompleted = user.stageWins || user.completedLevels || 0;

    // חישוב אחוז הצלחה
    let successRate = totalRuns > 0 ? Math.round((totalWins / totalRuns) * 100) : 0;

    profileContainer.innerHTML = `
        <div class="user-card">
            <h2>שלום, ${user.name}! 👋</h2>
            
            <div class="stats-grid">
                <div class="stat-card color-1">
                    <span class="stat-title">סה"כ הפעלות</span>
                    <span class="stat-value">${totalRuns}</span>
                </div>

                <div class="stat-card color-2">
                    <span class="stat-title">מספר ניצחונות</span>
                    <span class="stat-value">${totalWins}</span>
                </div>

                <div class="stat-card color-3">
                    <span class="stat-title">מספר הפסדים</span>
                    <span class="stat-value">${totalLosses}</span>
                </div>

                <div class="stat-card color-4">
                    <span class="stat-title">אחוז הצלחה</span>
                    <span class="stat-value">${successRate}%</span>
                </div>

                <div class="stat-card color-5">
                    <span class="stat-title">שיא אישי</span>
                    <span class="stat-value">${highPoints}</span>
                </div>

                <div class="stat-card color-6">
                    <span class="stat-title">שלבים שהושלמו</span>
                    <span class="stat-value">${stagesCompleted}</span>
                </div>
            </div>

            <button onclick="goToMenu()">חזרה לתפריט</button>
        </div>
    `;
}


function goToMenu() {
    window.location.href = "../Menu/Menu.html";
}
