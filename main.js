const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Cria uma nova janela de navegação
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadURL("http://localhost:3000");

}

app.whenReady().then(() => {
    createWindow();

    app.on("active", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

// Fecha a aplicação quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Reabre a janela se o ícone da dock for clicado (somente no macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});