let allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];

function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    let phoneRegex = /^0\d{8,9}$/;
    return phoneRegex.test(phone);
}

function isValidPassword(password) {
    return password.length >= 4;
}

function createPlayer(name, password, phone, email) {
    return {
        name: name,
        password: password,
        phone: phone,
        email: email,
        games: 0,
        wins: 0,
        losses: 0,
        bestTime: null,
        totalPlayTime: 0
    };
}

function login() {
    let newName = document.querySelector("#nameCheck").value.trim();
    let newPassword = document.querySelector("#passwordCheck").value.trim();
    let errorBox = document.querySelector("#loginError");

    if (!newName || !newPassword) {
        errorBox.textContent = "יש למלא שם משתמש וסיסמה";
        return;
    }

    let foundUser = allUsers.find(user => user.name == newName && user.password == newPassword);

    if (foundUser) {
        sessionStorage.setItem("currentUser", newName);
        window.location.href = "../Games-Menu/gamesMenu.html";
    } else {
        document.querySelector("#details").innerHTML = `
            <h2 class="title">אינך רשום/ה למערכת</h2>
            <p class="info-msg">הינך עובר/ת באופן אוטומטי להרשמה...</p>
        `;

        setTimeout(() => {
            document.querySelector("#details").innerHTML = `
                <h2 class="title">הרשמה למערכת</h2>
                <input id="nameUser" type="text" placeholder="שם משתמש" required>
                
                <div class="password-wrapper">
                    <input id="passwordUser" type="password" placeholder="סיסמה" required>
                    <button type="button" class="toggle-btn-signup" onclick="togglePasswordVisibility('passwordUser', 'signupEyeIcon')" aria-label="הצג/הסתר סיסמה">
                        <svg id="signupEyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6c5ce7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    </button>
                </div>

                <input id="phoneUser" type="text" placeholder="טלפון" required>
                <input id="emailUser" type="text" placeholder="אימייל" required>
                <p id="signupError" class="error-msg"></p>
                <button id="start" onclick="signUp()">להרשמה</button>
            `;
        }, 1500);
    }
}

function signUp() {
    let name = document.querySelector("#nameUser").value.trim();
    let password = document.querySelector("#passwordUser").value.trim();
    let phone = document.querySelector("#phoneUser").value.trim();
    let email = document.querySelector("#emailUser").value.trim();
    let errorBox = document.querySelector("#signupError");

    if (name.length < 2) {
        errorBox.textContent = "שם המשתמש חייב להכיל לפחות 2 תווים";
        return;
    }
    if (!isValidPassword(password)) {
        errorBox.textContent = "הסיסמה חייבת להכיל לפחות 4 תווים";
        return;
    }
    if (!isValidPhone(phone)) {
        errorBox.textContent = "מספר טלפון לא תקין (9-10 ספרות, מתחיל ב-0)";
        return;
    }
    if (!isValidEmail(email)) {
        errorBox.textContent = "כתובת אימייל לא תקינה";
        return;
    }

    let nameTaken = allUsers.filter(user => user.name == name).length > 0;
    if (nameTaken) {
        errorBox.textContent = "שם המשתמש הזה כבר קיים, בחרי שם משתמש אחר";
        return;
    }
    errorBox.textContent = "";

    let newPlayer = createPlayer(name, password, phone, email);
    allUsers.push(newPlayer);
    localStorage.setItem("myUsers", JSON.stringify(allUsers));

    document.querySelector("#details").innerHTML = `<h2 class="title">נרשמת בהצלחה!!</h2>`;
    setTimeout(() => {
        sessionStorage.setItem("currentUser", name);
        window.location.href = "../Games-Menu/gamesMenu.html";
    }, 1000);
}

function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

    if (!passwordInput || !eyeIcon) return;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    }
}