const { ipcRenderer } = require('electron');

let shortcutEnabled = true; // Variável para armazenar o estado

// Função chamada ao clicar no botão
const toggleShortcut = () => {
    shortcutEnabled = !shortcutEnabled; // Alterna o estado
    ipcRenderer.send('toggle-shortcut', shortcutEnabled); // Envia o estado atual para o `main`
    const statusText = shortcutEnabled ? 'Ativado' : 'Desativado';
    document.getElementById('status').innerText = `Atalho Z: ${statusText}`; // Atualiza o texto do status
};

// Adiciona o listener no botão
document.getElementById('toggle-button').addEventListener('click', toggleShortcut);
