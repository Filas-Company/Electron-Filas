const API_URL = 'http://localhost:3000/fila';
// http://localhost:3000/fila
// ou
// https://backend-filas-production.up.railway.app/fila

// Função para obter os dados
export async function getData() {
  const response = await fetch(`${API_URL}/list`, { method: 'GET' });
  return response.json();
}

// Função para inserir um novo documento
export async function insertDocument() {
  const ultimoResponse = await fetch(`${API_URL}/buscarUltimo`);
  const ultimo = await ultimoResponse.json();

  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: ultimo * 10 })
  });
  return response.json();
}

// Função para atualizar um documento
export async function updateDocument(item) {
  const response = await fetch(`${API_URL}/update`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}


// Função para atualizar o "voltar"
export async function updateVoltar(item) {
  const response = await fetch(`${API_URL}/voltar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateDesce(item) {
  const response = await fetch(`${API_URL}/updateDesce`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateSobe(item) {
  const response = await fetch(`${API_URL}/updateSobe`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function deleteDocument(item) {
  const response = await fetch(`${API_URL}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function chamarFila(item) {
  const response = await fetch(`${API_URL}/chamar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}


// Electron

export async function insertPrint(item) {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      codigo: item.codigo
    })
  });

  return response.json();
}