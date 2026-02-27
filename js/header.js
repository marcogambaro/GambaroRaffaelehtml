function loadHeader() {
    const base = window.location.origin + 
        (window.location.pathname.includes("GambaroRaffaelehtml") ? "/GambaroRaffaelehtml" : "");

    const logoPath = base + "/immagini/logo.png";
    const problemiPath = base + "/problemi/index.html";
    const badgePath = base + "/calcobadge/index.html";
    const homePath = base + "/index.html";
    const loginPath = base + "/login/index.html";

    document.getElementsByTagName("header")[0].innerHTML = `
        <nav class="nav-container">
            <div class="logo">
                <img src="${logoPath}" alt="Logo">
            </div>

            <ul class="nav-links sans">
                <li><a href="${homePath}">Home</a></li>
                <li><a href="${problemiPath}">Problemi</a></li>
                <li><a href="${badgePath}">CalcoBadge</a></li>
            </ul>
        </nav>

        <nav class="nav-container">
            <ul class="nav-links sans">
                <li><a href="${loginPath}">Accedi / Registrati</a></li>
            </ul>

            <a href="${loginPath}">
            <div class="logo logo--login">
                <img src="${base}/immagini/login.png" alt="Login">
            </div>
            </a>
        </nav>

        <!-- Hamburger -->
        <div class="hamburger" onclick="toggleMenu()">
            ☰
        </div>
        <div class="menu-wrapper" id="menuWrapper">
            <ul class="nav-links sans">
                <li><a href="${homePath}">Home</a></li>
            </ul>
            <ul class="nav-links sans login-links">
                <li><a href="${loginPath}">Accedi / Registrati</a></li>
            </ul>
            <ul class="nav-links sans">
                <li><a href="${problemiPath}">Problemi</a></li>
            </ul>
            <ul class="nav-links sans">
                <li><a href="${badgePath}">CalcoBadge</a></li>
            </ul>
        </div>
    `;
}

function toggleMenu() {
    document.getElementById("menuWrapper").classList.toggle("open");
}