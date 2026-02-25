function loadHeader() {
    const base = window.location.origin + 
        (window.location.pathname.includes("GambaroRaffaelehtml") ? "/nome-repo" : "");

    const logoPath = base + "/immagini/logo.png";
    const problemiPath = base + "/problemi/index.html";
    const homePath = base + "/index.html";

    document.getElementsByTagName("header")[0].innerHTML = `
        <nav class="nav-container">
        <div class="logo">
            <img src="${logoPath}" alt="Logo">
        </div>

        <ul class="nav-links sans">
            <li><a href="${homePath}">Home</a></li>
            <li><a href="${problemiPath}">Problemi</a></li>
        </ul>
        </nav>


        <nav class="nav-container">
        <ul class="nav-links sans">
            <a href="../login/index.html">
                <div class="logo logo--login">
                    <img src="../immagini/login.png" alt="Login">
                </div>
            </a>
        </ul>
        </nav>
    `;
}