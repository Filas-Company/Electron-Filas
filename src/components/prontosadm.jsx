import { useState } from "react";

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar, chamarFila, fetchData, updateDesce, updateSobe }) {
  const [tempText, setTempText] = useState(item.text);
  const [tempCod, setTempCod] = useState(item.codigo);

  return (
    <li className={`fila-adm ${item.status === 1 ? "status-1" : item.status === 2 ? "status-2" : "status-3"}`}>

      { item.status===1 ? (
        <div className="pos-adm"
        style={{ color: "white" }}>
          <p>{ item.posicao }º</p>
        </div>

      ) : item.status===3 ? (
        <div className="sobe-desce"
        style={{ color: "#BE0E19" }}>
          <button className="sobe"
            onClick={() => {
              updateSobe({...item}).then(fetchData);
            }}>
              <span class="material-symbols-outlined">keyboard_arrow_up</span>
          </button>

          <p>{ item.posicao }º</p>

          <button className="desce"
            onClick={() => {
              updateDesce({...item}).then(fetchData);
            }}>
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>

      ) : (
        <button
          className="btn-voltar-3"
          onClick={() => {
            updateVoltar({ ...item, status: 3 }).then(fetchData);
          }}
        >
          <span class="material-symbols-outlined">
            reply
          </span>
        </button>
      )}

      <input
        className="nome-adm"
        value={tempText}
        type="text"
        placeholder="Nome"
        onChange={(e) => setTempText(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, text: tempText }).then(fetchData);
        }}
      />
      <input
        className="senha-adm"
        value={tempCod}
        type="text"
        placeholder="Senha"
        onChange={(e) => setTempCod(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, codigo: tempCod }).then(fetchData);
        }}
      />

      <div className="btn-adm">
        {(item.status === 1) ? (
          <div>
          <button
            className="btn-adm-voltar"
            onClick={() => {
              updateVoltar({ ...item, status: 3 }).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
              reply
            </span>
          </button>

          <button 
            className="btn-adm-del"
            onClick={() => {
              deleteDocument(item).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
                delete
            </span>
          </button>
        </div>
        ) : (item.status === 2) ? (
          <div>

          <button
            className="btn-adm-chamar-old"
            onClick={() => {
              chamarFila(item).then(fetchData);
            }}          
          >
            <span class="material-symbols-outlined">
                check
            </span>
          </button>

          <button 
            className="btn-adm-del-old"
            onClick={() => {
              deleteDocument(item).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
                delete
            </span>
          </button>
          </div>
        ) : (
          <div>
            <button
              className="btn-adm-chamar-fila"
              onClick={() => {
                chamarFila(item).then(fetchData);
              }}          
            >
              <span class="material-symbols-outlined">
                  check
              </span>
            </button>

            <button 
              className="btn-adm-del-fila"
              onClick={() => {
                deleteDocument(item).then(fetchData);
              }}
            >
              <span class="material-symbols-outlined">
                  delete
              </span>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Item;
