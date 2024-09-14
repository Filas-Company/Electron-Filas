import { useState, useEffect } from 'react';
import Pronto from './prontosadm';

function AdminPage() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Estado para o filtro

  function getData() {
    fetch('http://localhost:3000/fila/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  async function getLastItem() {
    try {
      const response = await fetch('http://localhost:3000/fila/list');
      const data = await response.json();
      const ordemItem = data.reduce((max, item) => (item.ordem > max ? item.ordem : max), 0);
      return ordemItem;
    } catch (error) {
      console.error("Erro ao obter a lista de itens:", error);
      return 0;
    }
  }

  async function insertDocument() {
    const lastItem = await getLastItem();
    const newItem = lastItem + 1;
    fetch('http://localhost:3000/fila/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "text": "", "active": true, "codigo": (newItem * 100), "ordem": newItem })
    })
      .then(response => response.json())
      .then(() => getData());
  }

  function updateDocument(item) {
    fetch('http://localhost:3000/fila/update', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getData());
  }

  function updateFila(item) {
    fetch('http://localhost:3000/fila/updatefila', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getData());
  }

  function updateVoltar(item) {
    fetch('http://localhost:3000/fila/voltar', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getData());
  }

  async function deleteDocument(item) {
    fetch('http://localhost:3000/fila/delete', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getData());
  }

  useEffect(() => {
    getData();
  }, []);

  // Filtra os itens com base no filtro selecionado
  const itensFiltrados = itens.filter(item => {
    if (filtro === 'todos') return true;
    if (filtro === 'pronto') return item.ordem === -1 || item.ordem === 0;
    if (filtro === 'proximos') return item.ordem !== -1 && item.ordem !== 0;
    return false;
  });

  return (
    <div className="wrapper">
      <div className="container-proximos">
        <h1 className='titulo-adm'>FILA CATUAI</h1>

        <div className="filtros">
          <button className='btn-novo' onClick={insertDocument}>Inserir Novo</button>
          
          <label htmlFor="filtro"></label>
          <select
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pronto">Pronto</option>
            <option value="proximos">Próximos</option>
          </select>
        </div>

        {/* Lista de itens filtrados */}
        {itensFiltrados.length > 0 ? (
          <>
            {filtro === 'todos' || filtro === 'pronto' ? (
              <ul className="chamandoo">
                <p className='p-fila'>Chamados</p>
                {itensFiltrados.map(item => {
                  if (item.ordem === -1) {
                    return <Pronto key={item.codigo} item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar} />;
                  }
                  return null;
                })}
              </ul>
            ) : null}

            {filtro === 'todos' || filtro === 'pronto' ? (
              <ul className="pronto">
                <p className='p-fila'>Chamados</p>
                {itensFiltrados.map(item => {
                  if (item.ordem === 0) {
                    return <Pronto key={item.codigo} item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar} />;
                  }
                  return null;
                })}
              </ul>
            ) : null}

            {filtro === 'todos' || filtro === 'proximos' ? (
              <ul className="proximo">
                <p className='p-fila'>Próximos</p>
                {itensFiltrados.map(item => {
                  if (item.ordem !== 0 && item.ordem !== -1) {
                    return <Pronto key={item.codigo} item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar} />;
                  }
                  return null;
                })}
              </ul>
            ) : null}
          </>
        ) : (
          <p className='p-fila'>Nenhum item encontrado</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
