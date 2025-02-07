
import { useState, useEffect } from 'react';
import Pronto from './components/prontosadm.jsx';
import './CSS/admin.css';
import { getData, insertDocument, updateDocument, updateVoltar, deleteDocument, insertPrint, chamarFila, updateDesce, updateSobe } from './api.js';

// Importação do ipcRenderer
const { ipcRenderer } = window.require('electron');

function AdminPage() {
  const [itens, setItens] = useState([]);
  const [dadosPrint, setDadosPrint] = useState(null);
  const [shortcutEnabled, setShortcutEnabled] = useState(false);
  const [verChamados, setVerChamados] = useState(false);
  
  useEffect(() => {
    fetchData();

    ipcRenderer.on('screenshot-captured', async (event, resultObject) => {
      await setDadosPrint(resultObject);
      await insertPrint(resultObject);
      await fetchData()
    });

    return () => ipcRenderer.removeAllListeners('screenshot-captured');
  }, []);

  const fetchData = async () => {
    const data = await getData();
    setItens(data);
  };

  const toggleChamados = () => {
    setVerChamados(!verChamados);
  };

  const toggleShortcut = () => {
    const newStatus = !shortcutEnabled;
    setShortcutEnabled(newStatus);
    ipcRenderer.send('toggle-shortcut', newStatus);
  };

  // Filtra os itens por status
  const itensStatus1 = itens.filter(item => item.status === 1);
  const itensStatus2 = itens.filter(item => item.status === 2);
  const itensStatus3 = itens.filter(item => item.status === 3);

  return (
    <div className="wrapper">
      <div className="container-proximos">
        <div className="container-header">
          <h1 className="titulo-adm">FILA ONLINE</h1>

          <div className="filtros">
            <button className="btn btn-novo" onClick={() => insertDocument().then(fetchData)}>
              <span class="material-symbols-outlined">add</span>
            </button>

            <button className="btn btn-novo" onClick={fetchData}>
              <span class="material-symbols-outlined">
              refresh
              </span>
            </button>

            <button 
              onClick={toggleShortcut} 
              className={`btn print ${shortcutEnabled ? 
                "ativado" : "desativado"}`}
            >
              {shortcutEnabled ? (
                <>
                  <span class="material-symbols-outlined">pause</span>
                </>
              ) : (
                <span class="material-symbols-outlined">play_arrow</span>
              )}
            </button>

          </div>
        </div>

        {dadosPrint && (
          <div className="container-print">
            <p>A senha <strong>{dadosPrint.codigo}</strong> foi adicionado!</p>
            <p>{dadosPrint.ordem}</p>
            <img src={dadosPrint.imageBase64} alt="Captura de tela" />
          </div>
        )}

        {/* Exibe os itens separados por status */}
        <div className="lista-itens">
          {itensStatus1.length > 0 && (
            <ul>
              <h2 className='h2-chamando'>
                Chamando:
              </h2>
              {itensStatus1.map(item => (
                <Pronto
                  key={item._id}
                  item={item}
                  updateDocument={updateDocument}
                  deleteDocument={deleteDocument}
                  updateVoltar={updateVoltar}
                  chamarFila={chamarFila}
                  fetchData={fetchData}
                />
              ))}
            </ul>
          )}
          
          {itensStatus2.length > 0 && (
            <div>
            <button onClick={toggleChamados} 
            className='btn btn-chamados'
            style={{ 
              color: verChamados ? '#6f6f6f' : '#9d9d9d', 
            }}
            >
              {verChamados ? 'Esconder chamados' : 'Ver chamados'}
              <span class="material-symbols-outlined"
              style={{ 
                fontSize: "13px", 
                verticalAlign: "middle",
                marginLeft: "2px",
                fontWeight: "500"}}
              >
               arrow_forward_ios
              </span>
            </button>
            {verChamados && (
              <ul>
                {itensStatus2
                  .sort((a, b) => {
                    // Ordena os itens pela hora
                    if (a.ordem_criacao > b.ordem_criacao) return -1; // a vem antes de b
                    if (a.ordem_criacao < b.ordem_criacao) return 1;  // a vem depois de b
                    return 0; // Se as horas forem iguais
                  })
                  .map(item => (
                    <Pronto
                      key={item._id}
                      item={item}
                      updateDocument={updateDocument}
                      deleteDocument={deleteDocument}
                      updateVoltar={updateVoltar}
                      chamarFila={chamarFila}
                      fetchData={fetchData}
                    />
                  ))}
              </ul>
            )}
          </div>
          )}

          {itensStatus3.length > 0 && (
            <ul>
              <h2 className='h2-proximo'>
                Próximos:
              </h2>
              {itensStatus3
              .sort((a, b) => {
                // Ordena os itens pela hora
                if (a.posicao < b.posicao) return -1; // a vem antes de b
                if (a.posicao > b.posicao) return 1;  // a vem depois de b
                return 0; // Se as horas forem iguais
              })
              .map(item => (
                <Pronto
                  key={item._id}
                  item={item}
                  updateDocument={updateDocument}
                  deleteDocument={deleteDocument}
                  updateVoltar={updateVoltar}
                  chamarFila={chamarFila}
                  fetchData={fetchData}
                  updateDesce={updateDesce}
                  updateSobe={updateSobe}
                />
              ))}
            </ul>
          )}
        </div>

        {itens.length === 0 && <p className="p-fila">Nenhum item encontrado</p>}
      </div>
    </div>
  );
}

export default AdminPage;
