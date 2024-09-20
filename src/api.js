const API_URL = 'http://localhost:3000/fila';

// Função para obter os dados
export async function getData() {
  const response = await fetch(`${API_URL}/list`, { method: 'GET' });
  return response.json();
}

// Função para obter o último item da fila
export async function getLastItem() {
  const response = await fetch(`${API_URL}/list`);
  const data = await response.json();
  const ordemItem = data.reduce((max, item) => (item.ordem > max ? item.ordem : max), 0);
  return ordemItem;
}

// Função para inserir um novo documento
export async function insertDocument() {
  const lastItem = await getLastItem();
  const newItem = lastItem + 1;
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '', active: true, codigo: newItem * 100, ordem: newItem })
  });
  return response.json();
}

export async function insertPrint(item) {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: item.text, codigo: item.codigo, ordem: item.ordem })
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

// Função para atualizar a fila
export async function updateFila(item) {
  const response = await fetch(`${API_URL}/updatefila`, {
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

// Função para deletar um documento
export async function deleteDocument(item) {
  const response = await fetch(`${API_URL}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}
