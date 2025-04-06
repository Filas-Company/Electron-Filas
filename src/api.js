const { ipcRenderer } = window.require('electron');

const API_URL = 'http://localhost:3000/fila';
// http://localhost:3000/fila
// https://backend-filas.fly.dev/fila
// https://backend-filas-production.up.railway.app/fila


let COLLECTION = '';

async function loadEnv() { //carrega variavel de ambiente
  const env = await ipcRenderer.invoke('get-env');
  COLLECTION = env.COLLECTION;
}
await loadEnv();


// Função para obter os dados
export async function getData() {
  if (!COLLECTION) await loadEnv();
  const response = await fetch(`${API_URL}/list/${COLLECTION}`);
  return response.json();
}

// Função para inserir um novo documento
export async function insertDocument() {
  const ultimoResponse = await fetch(`${API_URL}/buscarUltimo/${COLLECTION}`);
  const ultimo = await ultimoResponse.json();

  const response = await fetch(`${API_URL}/add/${COLLECTION}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: ultimo })
  });
  return response.json();
}

// Função para atualizar um documento
export async function updateDocument(item) {
  const response = await fetch(`${API_URL}/update/${COLLECTION}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}


// Função para atualizar o "voltar"
export async function updateVoltar(item) {
  const response = await fetch(`${API_URL}/voltar/${COLLECTION}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateDesce(item) {
  const response = await fetch(`${API_URL}/updateDesce/${COLLECTION}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateSobe(item) {
  const response = await fetch(`${API_URL}/updateSobe/${COLLECTION}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function deleteDocument(item) {
  const response = await fetch(`${API_URL}/delete/${COLLECTION}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function chamarFila(item) {
  const response = await fetch(`${API_URL}/chamar/${COLLECTION}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function insertPrint(item) {
  const response = await fetch(`${API_URL}/add/${COLLECTION}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      codigo: item.codigo
    })
  });

  return response.json();
}