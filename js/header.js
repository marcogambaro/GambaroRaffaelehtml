function loadHeader() {
    const depth = (window.location.pathname.match(/\//g) || []).length - 2;
    const logoPath = '../'.repeat(depth) + 'immagini/logo.png';
    const problemiPath = '../'.repeat(depth) + 'problemi/index.html';
    const homePath = '../'.repeat(depth) + 'index.html';

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
    `;

    // login button (coming soon)
    /*
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
    */
}