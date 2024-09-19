import { useState, useEffect } from 'react';
import Pronto from './components/prontosadm';
import './CSS/admin.css';
import { getData, insertDocument, updateDocument, updateFila, updateVoltar, deleteDocument } from './api.js';

function AdminPage() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Estado para o filtro

  useEffect(() => {
    fetchData();
  }, []);

  // Função para obter e atualizar a lista de itens
  const fetchData = async () => {
    const data = await getData();
    setItens(data);
  };

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
          <button className='btn-novo' onClick={() => insertDocument().then(fetchData)}>Inserir Novo</button>
          
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
