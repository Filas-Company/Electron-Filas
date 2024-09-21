import { useState, useEffect } from 'react';
import Pronto from './components/prontosadm';
import './CSS/admin.css';
import { getData, insertDocument, updateDocument, updateFila, updateVoltar, deleteDocument, insertPrint } from './api.js';

// Adicione a importação do ipcRenderer
const { ipcRenderer } = window.require('electron');

function AdminPage() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Estado para o filtro
  const [dadosPrint, setDadosPrint] = useState(null); // Estado para armazenar o caminho da captura de tela
  const [shortcutEnabled, setShortcutEnabled] = useState(true); // Estado para controlar o atalho

  useEffect(() => {
    fetchData();

    // Escuta o evento de captura de tela vindo do main.js
    ipcRenderer.on('screenshot-captured', (event, resultObject) => {
      console.log('Screenshot capturada:', resultObject);
      setDadosPrint(resultObject); // Atualiza o estado com os dados da captura
      insertPrint(resultObject); // Insere no banco de dados

      fetchData();
    });

    // Remove o event listener quando o componente for desmontado
    return () => {
      ipcRenderer.removeAllListeners('screenshot-captured');
    };
  }, []);

  const fetchData = async () => {
    const data = await getData();
    setItens(data);
  };

  const toggleShortcut = () => {
    const newStatus = !shortcutEnabled;
    setShortcutEnabled(newStatus);
    ipcRenderer.send('toggle-shortcut', newStatus); // Envia para o processo main ativar/desativar
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
          <button className="btn-refresh" onClick={fetchData}>
            Atualizar
          </button>

          
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
        <div className="container-print">
          {dadosPrint && (
            <div>
              <p>Código: {dadosPrint.codigo}</p>
              <p>{dadosPrint.ordem}</p>
              <img src={dadosPrint.imageBase64} alt="Captura de tela" />
            </div>
          )}

          <button onClick={toggleShortcut} className="btn-toggle-shortcut">
            {shortcutEnabled ? 'Desativar Captura' : 'Ativar Captura'}
          </button>
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
