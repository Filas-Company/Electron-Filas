import React, { useState, useEffect } from 'react';
import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';
import '../CSS/admin.css';

import Alert from './Alert';
import Pronto from './prontos';
import Proximo from './proximos';
import Chamando from './Chamando';

function UserPage() {
  const [itens, setItens] = useState([]);
  function getData() {
    fetch('http://localhost:3000/fila/list', { method: 'GET' })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  useEffect(() => {
    getData()
    setIsAlertOpen(true)
  }, []);

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  }

  const [highlightedSenha, setHighlightedSenha] = useState(null);
  const handleConfirmAlert = (foundItem) => {
    setHighlightedSenha(foundItem.codigo);
    setIsAlertOpen(false);
  };

  const [mostrandoProntos, setMostrandoProntos] = useState(false);
  function VerChamados() {
    setMostrandoProntos(!mostrandoProntos);
  };

  const [verMais, setVerMais] = useState(true);
  const [mostrandoTodos, setMostrandoTodos] = useState(false);
  function VerTodos() {
    setVerMais(!verMais);
    setMostrandoTodos(!mostrandoTodos);
  };

  return (
    <div className="App">
      <div>
        <Alert
          isOpen={isAlertOpen}
          onClose={handleCloseAlert}
          onConfirm={handleConfirmAlert}
          lista={itens}
        />
      </div>

      <div className="container-principal">
        <header>
          <nav className="navigation">
            <div class="left-group">
            <a href="http://localhost:3001/user" className="logo-link">
              <img className="seta" src="./img/arrow.png" alt="voltar" />
              <h1 className="logo">FILA</h1>
            </a>
            </div>
            <a href='https://www.burgerking.com.br' className="rest" target='blank'>Restaurante</a>
          </nav>
        </header>
        <div className="container-prontos">
          <div>
            {itens.map(cadaItem => (
              (cadaItem.ordem === -1) ? (
                <Chamando
                  item={cadaItem}
                  highlighted={Number(highlightedSenha) === Number(cadaItem.codigo)}
                />
              ) : null
            ))}
          </div>

          <div className='naoveio'>
            <div className="prontos-scroll">
              {mostrandoProntos && (
                <ul className="prontos">
                  {itens.map(cadaItem => (
                    (cadaItem.ordem === 0 && cadaItem.codigo) ? (
                      <li key={cadaItem.codigo}>
                        <Pronto
                          item={cadaItem}
                          highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                        />
                      </li>
                    ) : null
                  ))}
                </ul>

              )}
            </div>
          </div>
        </div>
        {highlightedSenha ? (

          <ul className="proximo">
            <div className="container-proximos">

              <div className="senha-user">
                <button className="ver-tudo" onClick={VerTodos}>
                  <label>{verMais ? "Ver já chamados" : "Ver menos"}</label>
                </button>
                {!mostrandoTodos && (
                  <p>Sua senha</p>
                )}

              </div>

              {itens.map(cadaItem => (
                (cadaItem.codigo === highlightedSenha) && !mostrandoTodos ? (
                  <Proximo
                    item={cadaItem}
                    highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                    log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                  />
                ) : null
              ))}
            </div>

            <div className="container-proximos">
              {itens.map(cadaItem => (
                mostrandoTodos ? (
                  <Proximo
                    item={cadaItem}
                    highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                    log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                  />
                ) : null
              ))}
            </div>
          </ul>

        ) : (

          <div className="container-proximos">
            <button onClick={VerChamados}>
              Ver já chamados
            </button>
            <ul className="proximo">
              {itens.map(cadaItem => (
                cadaItem.ordem !== 0 && cadaItem.ordem !== -1 ? (
                  <Proximo
                    item={cadaItem}
                    highlighted={String(highlightedSenha) === String(cadaItem.codigo)}
                    log={() => console.log(`highlightedSenha: ${highlightedSenha}, cadaItem.codigo: ${cadaItem.codigo}`)}
                  />
                ) : null
              ))}
            </ul>
          </div>

        )}
      </div>
      <script src="/script.js"></script>
    </div>
  );
}

export default UserPage;
