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
    window.location.href = "../Personal-Area/personalArea.html";
}

function goToRecords() {
    window.location.href = "../Records/records.html";
}
