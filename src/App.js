import { useState, useEffect } from 'react';
import Pronto from './components/prontosadm';
import './CSS/admin.css';
import { getData, insertDocument, updateDocument, updateFila, updateVoltar, deleteDocument } from './api.js';

// Adicione a importação do ipcRenderer
const { ipcRenderer } = window.require('electron');

function AdminPage() {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Estado para o filtro
  const [dadosPrint, setDadosPrint] = useState(null); // Estado para armazenar o caminho da captura de tela

  useEffect(() => {
    fetchData();

    // Adiciona o event listener para a tecla 'Z'
    const handleKeyPress = (event) => {
      if (event.key === 'z' || event.key === 'Z') {
        captureScreenshot(); // Chama a função de captura quando a tecla "Z" for pressionada
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const fetchData = async () => {
    const data = await getData();
    setItens(data);
  };

  // Função para capturar a tela
  const captureScreenshot = async () => {
    try {

      const imgPath = await ipcRenderer.invoke('capture-screenshot');
      console.log('Result:', imgPath); 
      setDadosPrint(imgPath);

    } catch (err) {
      console.error('Erro ao capturar a tela:', err);
    }
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

        {dadosPrint && (
          <div>
            <p>Código: {dadosPrint.codigo}</p>
            <p>{dadosPrint.ordem}</p>
            <img src={dadosPrint.imageBase64} alt="Captura de tela" />
          </div>
        )}

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
