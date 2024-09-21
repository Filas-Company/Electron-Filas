const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
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
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    win.loadURL("http://localhost:3001");
}

let isShortcutActive = true;

app.whenReady().then(() => {
    createWindow();

    const registerScreenshotShortcut = () => {
        if (isShortcutActive) {
            globalShortcut.register('Z', async () => {
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
        
                    const resultObject = { codigo: textArray[0], ordem: 1, imageBase64 };
                    console.log(resultObject.codigo, resultObject.ordem);
        
                    // Envia os dados para o front-end via `ipcRenderer`
                    const win = BrowserWindow.getAllWindows()[0]; // Obtém a janela ativa
                    win.webContents.send('screenshot-captured', resultObject); // Envia os dados para o front-end
                    
                    await insertPrint(resultObject);

                } catch (error) {
                    console.error('Erro ao capturar a tela:', error);
                }
            });
        }
    };

    // Registra o atalho quando o app está pronto
    registerScreenshotShortcut();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    // Ouve eventos do front-end para ativar ou desativar o atalho
    ipcMain.on('toggle-shortcut', (event, isEnabled) => {
        if (isEnabled) {
            isShortcutActive = true;
            registerScreenshotShortcut(); // Ativa o atalho
        } else {
            isShortcutActive = false;
            globalShortcut.unregister('Z'); // Desativa o atalho
        }
    });
});

app.on('will-quit', () => {
    // Desregistra todos os atalhos globais quando a aplicação fecha
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
