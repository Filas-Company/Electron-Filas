const { app, BrowserWindow, ipcMain } = require('electron');
const screenshot = require('screenshot-desktop');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const vision = require('@google-cloud/vision');
const { API_KEY } = require('./config');

const client = new vision.ImageAnnotatorClient({
    apiKey: API_KEY
  });

function createWindow() {
    // Cria uma nova janela de navegação
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Permite usar Node.js no React
            contextIsolation: false, // Para garantir que ipcRenderer possa ser usado diretamente
        }
    });
    win.loadURL("http://localhost:3001");
}

app.whenReady().then(() => {
    createWindow();

    app.on("active", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
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

// IPC para capturar a tela e salvar a imagem
ipcMain.handle('capture-screenshot', async () => {
    try {

      const img = await screenshot({ format: 'png' });
      const image = await Jimp.read(img);

      const x = 780;
      const y = 480;
      const width = 370;
      const height = 200;

      image.crop(x, y, width, height);
      const croppedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

      const imageBase64 = `data:image/png;base64,${croppedBuffer.toString('base64')}`;

      const [result] = await client.textDetection({ image: { content: croppedBuffer } });
      const textArray = result.textAnnotations.map(annotation => annotation.description).filter(text => text.trim() !== '');

      const resultObject = { codigo: textArray[0], ordem: 0, imageBase64 };
      console.log(resultObject.codigo, resultObject.ordem);

      return resultObject;

    } catch (error) {
      console.error('Erro ao capturar a tela:', error);
      throw error;
    }
  });